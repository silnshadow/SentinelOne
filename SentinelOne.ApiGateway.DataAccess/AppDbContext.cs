using Microsoft.EntityFrameworkCore;
using SentinelOne.Api;
using System.Collections.Generic;

namespace SentinelOne.ApiGateway.DataAccess;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<WeatherForecast> WeatherForecasts { get; set; }  // Add DbSet for WeatherForecast
}
