using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SentinelOne.ApiGateway.Business.Interfaces;
using SentinelOne.ApiGateway.Business.Model;
using SentinelOne.ApiGateway.Model;

namespace SentinelOne.ApiGateway.Controllers
{
    [ApiController]
    //[Authorize]
    [Route("api/[controller]")]
    public class WeatherForecastController(ILogger<WeatherForecastController> logger, IUnitOfWork unitOfWork) : ControllerBase
    {
        private static readonly string[] Summaries =
        [
            "Freezing",
            "Boom Bam",
            "Bracing",
            "Chilly",
            "Cool",
            "Mild",
            "Warm",
            "Balmy",
            "Hot",
            "Sweltering",
            "Scorching"
        ];

        [HttpGet(Name = "GetWeatherForecast")]
        public async Task<IEnumerable<WeatherForecast>> Get()
        {
            var result = await unitOfWork.WeatherForecast.GetWeatherForecasts();

            return await Task.FromResult(result);
        }
        [HttpPost("")]
        public async Task<int> Add(WeatherForecast weatherForecast)
        {
            var result = await unitOfWork.WeatherForecast.CreateAsync(weatherForecast);

            return await Task.FromResult(result);
        }
    }
}
