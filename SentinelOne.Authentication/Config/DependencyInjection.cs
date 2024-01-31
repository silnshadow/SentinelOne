using SentinelOne.Authentication.Business.Implementations;
using SentinelOne.Authentication.Business.Interfaces;
using ISentinelAuthenticator = SentinelOne.Authentication.Business.Interfaces.IAuthenticationService;

namespace SentinelOne.Authentication.Config
{
    public static class DependencyInjection
    {
        public static void ConfigureCommonDependencyInjection(this IServiceCollection services, IConfiguration configuration)
        {
            //Services
            services.AddTransient<ISentinelAuthenticator, UsernamePasswordAuthenticationService>();
            services.AddTransient<ITokenProviderService, TokenProviderService>();
        }
    }
}
