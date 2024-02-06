using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using SentinelOne.Authentication.Models;
using System.Text;

namespace SentinelOne.Authentication.Config
{
    public static class ConfigureAuthenticationMechanism
    {
        public static void ConfigureAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = configuration["Jwt:Issuer"],
                    ValidAudience = configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"])),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true
                };
            });

        }

        public static void ConfigureGoogleAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication()
                .AddGoogle(options =>
                {
                    options.ClientId = "YOUR_CLIENT_ID";
                    options.ClientSecret = "YOUR_CLIENT_SECRET";
                    options.SignInScheme = "Google";
                });
        }
    }
}
