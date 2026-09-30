using Microsoft.EntityFrameworkCore;
using MediVault.Server.Data;
using MediVault.Server.Repositories;
using MediVault.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Add Controllers & RFC 7807 Problem Details
builder.Services.AddControllers();
builder.Services.AddProblemDetails();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 2. Configure PostgreSQL with Entity Framework Core
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<MediVaultDbContext>(options =>
    options.UseNpgsql(connectionString));

// 3. Configure Redis Distributed Caching
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = builder.Configuration.GetConnectionString("Redis");
    options.InstanceName = "MediVault_";
});

// 4. Register Health Checks (PostgreSQL and System Liveness)
builder.Services.AddHealthChecks()
    .AddDbContextCheck<MediVaultDbContext>("PostgreSQL");

// 5. Register RabbitMQ Messaging Service
builder.Services.AddSingleton<IRabbitMqService, RabbitMqService>();

// 6. Repositories (Data Access Layer)
builder.Services.AddScoped<IMedicationRepository, MedicationRepository>();
builder.Services.AddScoped<IDoseRepository, DoseRepository>();
builder.Services.AddScoped<IPrescriptionRepository, PrescriptionRepository>();
builder.Services.AddScoped<IFamilyRepository, FamilyRepository>();

// 7. Services (Business Logic Layer)
builder.Services.AddScoped<IMedicationService, MedicationService>();
builder.Services.AddScoped<IDoseService, DoseService>();

// 8. Configure Dynamic CORS
var configuredOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() 
                        ?? new[] { "http://localhost:5173", "http://localhost:5174" };
var envOrigins = Environment.GetEnvironmentVariable("ASPNETCORE_CORS_ORIGINS");
if (!string.IsNullOrEmpty(envOrigins))
{
    configuredOrigins = envOrigins.Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(configuredOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// 9. Seed Initial Database Data
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<MediVaultDbContext>();
    DbInitializer.Seed(dbContext);
}

// 10. Global Exception Handling
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler();
}

// 11. Security Headers Middleware
app.Use(async (context, next) =>
{
    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Append("X-Frame-Options", "DENY");
    context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");
    await next();
});

// 12. Middleware Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");

// 13. Health Check Probes
app.MapHealthChecks("/health");
app.MapHealthChecks("/health/ready");

app.UseAuthorization();
app.MapControllers();

app.Run();
