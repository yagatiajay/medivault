# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project file and restore dependencies
COPY ["MediVault.Server.csproj", "./"]
RUN dotnet restore "./MediVault.Server.csproj"

# Copy source and publish release build
COPY . .
RUN dotnet publish "./MediVault.Server.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime Stage (Slim Alpine Image)
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS final
WORKDIR /app
EXPOSE 5049

ENV ASPNETCORE_URLS=http://+:5049
ENV ASPNETCORE_ENVIRONMENT=Production

# Install curl for container health check
RUN apk --no-cache add curl

COPY --from=build /app/publish .

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:5049/health || exit 1

ENTRYPOINT ["dotnet", "MediVault.Server.dll"]
