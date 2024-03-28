using SentinelOne.ApiGateway.Business.Model;

namespace SentinelOne.ApiGateway.Business.Interfaces;

public interface IWeatherForecastRepository
{
    Task<IEnumerable<WeatherForecast>> GetWeatherForecasts();
    Task<int> CreateAsync(WeatherForecast weatherForecast);
}
