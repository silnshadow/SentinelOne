using SentinelOne.Authentication.DataAccess.Model;

namespace SentinelOne.Authentication.DataAccess.DataSources;

public static class MockDatabase
{
    public static List<User> Users { get; } = new List<User>
    {
        new User { Username = "user1", PasswordHash = "hashedPassword1" },
        new User { Username = "user2", PasswordHash = "hashedPassword2" },
    };
}
