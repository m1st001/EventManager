using EventManager.WebApi.Data.Models;
using EventManager.WebApi.Services.Abstractions;
using Microsoft.AspNetCore.Identity;

namespace EventManager.WebApi.Services;

/// <inheritdoc cref="IAuthenticationService"/>
public class AuthenticationService(
    UserManager<User> userManager,
    SignInManager<User> signInManager,
    ILogger<AuthenticationService> logger) : IAuthenticationService
{
    private readonly ILogger _logger = logger;

    /// <inheritdoc cref="IAuthenticationService.Register"/>
    public async Task<IdentityResult> Register(string username, string? email, string password)
    {
        var existingUser = await userManager.FindByNameAsync(username);
        if (existingUser is not null)
        {
            _logger.LogError("User {username} already exists", username);
            return IdentityResult.Failed(new IdentityError 
            { 
                Code = "DuplicateUser", 
                Description = "Username already exists" 
            });
        }

        if (!(string.IsNullOrEmpty(email)))
        {
            var emailUser = await userManager.FindByEmailAsync(email);
            if (emailUser is not null)
            {
                _logger.LogError("Email {email} is already in use", email);
                return IdentityResult.Failed(new IdentityError 
                { 
                    Code = "DuplicateEmail", 
                    Description = "Email already in use" 
                });
            }
        }

        var user = new User
        {
            UserName = username,
            Email = email
        };

        var result = await userManager.CreateAsync(user, password);
    
        if (result.Succeeded)
        {
            _logger.LogInformation("{username} successfully registered", username);
        }
        else
        {
            _logger.LogError("Failed to register user {username}: {errors}", 
                username, string.Join(", ", result.Errors));
        }

        return result;
    }

    /// <inheritdoc cref="IAuthenticationService.Login"/>
    public async Task<User?> Login(string username, string password, bool useCookies)
    {
        var user = await userManager.FindByNameAsync(username);
        if (user is null)
        {
            _logger.LogError("User {username} was not found", username);
            return null;
        }

        var result = await signInManager.PasswordSignInAsync(user, password, useCookies, false);
        _logger.LogInformation("{username} has successfully logged in", username);

        return result.Succeeded ? user : null;
    }

    /// <inheritdoc cref="IAuthenticationService.Logout"/>
    public async Task Logout()
    {
        await signInManager.SignOutAsync();
        _logger.LogError("User successfully logged out");
    }
}