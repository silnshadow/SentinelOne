using Microsoft.AspNetCore.Authentication;
using System.ComponentModel.DataAnnotations;
namespace SentinelOne.Authentication.Models;

public class LoginViewModel
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    [Display(Name = "Remember Me")]
    public bool RememberMe { get; set; }

    public string? ReturnUrl { get; set; }

    // AuthenticationScheme is in Microsoft.AspNetCore.Authentication namespace
    public IList<AuthenticationScheme>? ExternalLogins { get; set; }
}