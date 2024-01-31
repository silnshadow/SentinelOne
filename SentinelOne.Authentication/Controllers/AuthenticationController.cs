using Microsoft.AspNetCore.Mvc;
using ISentinelAuthenticator = SentinelOne.Authentication.Business.Interfaces.IAuthenticationService;
using SentinelModel = SentinelOne.Authentication.Models;

namespace SentinelOne.Authentication.Controllers;

[ApiController]
[Route("auth")]
public class AuthenticationController : ControllerBase
{
    private readonly ISentinelAuthenticator _authenticationService;
    public AuthenticationController(ISentinelAuthenticator authenticationService)
    {
        _authenticationService = authenticationService;
    }

    [HttpPost("login")]
    public ActionResult<string> Login([FromBody] SentinelModel.LoginRequest request)
    {
        string token = _authenticationService.Authenticate(request.Username, request.Password);

        if (token != null)
        {
            return Ok(new { Token = token });
        }

        return Unauthorized();
    }
}
