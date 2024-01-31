namespace SentinelOne.Authentication.Business.Interfaces;

public interface IAuthenticationService
{
    string Authenticate(string username, string password);
}
