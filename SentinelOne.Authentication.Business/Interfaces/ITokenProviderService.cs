namespace SentinelOne.Authentication.Business.Interfaces;

public interface ITokenProviderService
{
    public string GenerateJwtToken(string token);
}
