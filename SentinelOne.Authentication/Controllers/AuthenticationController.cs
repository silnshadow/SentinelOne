using Microsoft.AspNetCore.Mvc;
using ISentinelAuthenticator = SentinelOne.Authentication.Business.Interfaces.IAuthenticationService;
using SentinelModel = SentinelOne.Authentication.Models;

namespace SentinelOne.Authentication.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthenticationController(ISentinelAuthenticator authenticationService) : ControllerBase
{
    [HttpPost("login")]
    public ActionResult<string> Login([FromBody] SentinelModel.LoginRequest request)
    {
        string token = authenticationService.Authenticate(request.Username, request.Password);

        if (string.IsNullOrWhiteSpace(token))
        {
            return Unauthorized();
        }

        return Ok(new { Token = token });
    }
}
