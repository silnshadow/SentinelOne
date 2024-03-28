using SentinelOne.ApiGateway.Business.Model;
using SentinelOne.ApiGateway.Business.Interfaces;
using System.Data;
using Dapper;

namespace SentinelOne.ApiGateway.DataAccess.Repository;

public class WeatherForecastRepository : BaseDbRepository, IWeatherForecastRepository
{
    public WeatherForecastRepository(IDbManager dbManager) : base(dbManager) { }

    public async Task<IEnumerable<WeatherForecast>> GetWeatherForecasts()
    {
        return await Connection.QueryAsync<WeatherForecast>("GetWeatherForecasts", commandType: CommandType.StoredProcedure, transaction: Transaction);
    }

    public async Task<int> CreateAsync(WeatherForecast weatherForecast)
    => await Connection.QueryFirstOrDefaultAsync<int>("InsertWeatherForecast", new
    {
        weatherForecast.TemperatureC,
        weatherForecast.Summary,
    }, commandType: CommandType.StoredProcedure, transaction: Transaction);
}
