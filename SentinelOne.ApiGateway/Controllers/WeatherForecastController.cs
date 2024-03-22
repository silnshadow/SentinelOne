using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SentinelOne.ApiGateway.Model;

namespace SentinelOne.ApiGateway.Controllers
{
    [ApiController]
    //[Authorize]
    [Route("api/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries =
        [
            "Freezing", "Boom Bam", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        ];

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public async Task<IEnumerable<WeatherForecast>> Get()
        {
            var rng = new Random();
            var startDate = DateTime.Now.Date;

            var test = Enumerable.Range(1, 20).Select(index =>
            {
                var randomDate = startDate.AddDays(index);
                return new WeatherForecast
                {
                    Date = DateOnly.FromDateTime(randomDate),
                    TemperatureC = rng.Next(-20, 55),
                    Summary = Summaries[rng.Next(Summaries.Length)]
                };
            });

            return await Task.FromResult(test);
        }

        //[HttpGet("GetWeatherForecast")]
        //public async Task<IEnumerable<WeatherForecast>> GetChoosedWeather(string weatherType)
        //{
        //    var rng = new Random();
        //    var startDate = DateTime.Now.Date;

        //    var test = Enumerable.Range(1, 10).Select(index =>
        //    {
        //        var randomDate = startDate.AddDays(index);
        //        return new WeatherForecast
        //        {
        //            Date = DateOnly.FromDateTime(randomDate),
        //            TemperatureC = rng.Next(-20, 55),
        //            Summary = Summaries[rng.Next(Summaries.Length)]
        //        };
        //    });

        //    return await Task.FromResult(test);
        //}


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWeather(int id, WeatherRequest weatherRequest)
        {
            var rng = new Random();
            var startDate = DateTime.Now.Date;

            var test = Enumerable.Range(1, 10).Select(index =>
            {
                var randomDate = startDate.AddDays(index);
                return new WeatherForecast
                {
                    Date = DateOnly.FromDateTime(randomDate),
                    TemperatureC = rng.Next(-20, 55),
                    Summary = Summaries[rng.Next(Summaries.Length)]
                };
            });

            return Ok(test);
        }

    }
}
