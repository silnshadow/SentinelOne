using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using SentinelOne.ApiGateway.Business.Interfaces;
using SentinelOne.ApiGateway.Business.Services;
using SentinelOne.ApiGateway.DataAccess;
using SentinelOne.ApiGateway.DataAccess.Repository;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace SentinelOne.ApiGateway.Config
{
    public static class DependencyInjection
    {
        public static void ConfigureCommonDependencyInjection(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddHttpContextAccessor();
            services.Configure<DatabaseSettings>(configuration.GetSection(nameof(DatabaseSettings)));

            /* Database */
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IDbManager, DbManager>();

            /* Repositories */
            services.AddTransient<IWeatherForecastRepository, WeatherForecastRepository>();
        }
    }
}
