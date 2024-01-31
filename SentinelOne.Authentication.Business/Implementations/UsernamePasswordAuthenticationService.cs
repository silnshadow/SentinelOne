using SentinelOne.Authentication.Business.Interfaces;
using SentinelOne.Authentication.DataAccess.DataSources;

namespace SentinelOne.Authentication.Business.Implementations;

public class UsernamePasswordAuthenticationService(ITokenProviderService tokenProviderService) : IAuthenticationService
{
    public string Authenticate(string username, string password)
    {
        // Validate credentials against the mock database
        var user = MockDatabase.Users.FirstOrDefault(u => u.Username == username && u.PasswordHash == HashPassword(password));

        if (user != null)
        {
            // Return a JWT token (you'll need a JWT library for this)
            string token = GenerateJwtToken(username);
            return token;
        }

        // Authentication failed
        return string.Empty;
    }

    private string HashPassword(string password)
    {
        // In a real application, use a secure hashing algorithm like bcrypt
        // This is a simplified example, not suitable for production
        return password.GetHashCode().ToString();
    }

    private string GenerateJwtToken(string username)
    {
        var fetchedToken = tokenProviderService.GenerateJwtToken(username);
        return $"Bearer {fetchedToken}";
    }
}
