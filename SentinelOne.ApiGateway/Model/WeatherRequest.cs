namespace SentinelOne.ApiGateway.Model
{
    public class WeatherRequest
    {
        public string WeatherType { get; set; } = string.Empty;
        public int Temperature { get; set; }
    }
}
