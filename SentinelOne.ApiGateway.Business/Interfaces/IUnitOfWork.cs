namespace SentinelOne.ApiGateway.Business.Interfaces;

public interface IUnitOfWork : IBaseUnitOfWork
{
    IWeatherForecastRepository WeatherForecast { get; }

}
