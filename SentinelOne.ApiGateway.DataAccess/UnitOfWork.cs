using Microsoft.Extensions.DependencyInjection;
using SentinelOne.ApiGateway.Business.Interfaces;

namespace SentinelOne.ApiGateway.DataAccess
{
    public class UnitOfWork : BaseUnitOfWork, IUnitOfWork
    {
        private readonly IServiceProvider _serviceProvider;

        public UnitOfWork(IDbManager dbManager, IServiceProvider serviceProvider) : base(dbManager)
            => _serviceProvider = serviceProvider;

        public IWeatherForecastRepository WeatherForecast => _serviceProvider.GetRequiredService<IWeatherForecastRepository>();

    }
}
