using Microsoft.EntityFrameworkCore;
using MediVault.Server.Data;
using MediVault.Server.Repositories;
using MediVault.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Add Controllers
builder.Services.AddControllers();
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

// 4. Register RabbitMQ Messaging Service
builder.Services.AddSingleton<IRabbitMqService, RabbitMqService>();

// 5. Repositories (Data Access Layer)
builder.Services.AddScoped<IMedicationRepository, MedicationRepository>();
builder.Services.AddScoped<IDoseRepository, DoseRepository>();
builder.Services.AddScoped<IPrescriptionRepository, PrescriptionRepository>();
builder.Services.AddScoped<IFamilyRepository, FamilyRepository>();

// 6. Services (Business Logic Layer)
builder.Services.AddScoped<IMedicationService, MedicationService>();
builder.Services.AddScoped<IDoseService, DoseService>();

// 7. Configure CORS for React Vite frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:5174")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// 8. Seed Initial Database Data
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<MediVaultDbContext>();
    DbInitializer.Seed(dbContext);
}

// 9. Middleware Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run();
