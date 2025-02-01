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
    private readonly UserManager<User> _userManager = userManager;
    private readonly SignInManager<User> _signInManager = signInManager;
    private readonly ILogger _logger = logger;

    /// <inheritdoc cref="IAuthenticationService.Register"/>
    public async Task<User> Register(string username, string? email, string password)
    {
        var existedUser = await _userManager.FindByNameAsync(username);
        if (existedUser is not null)
        {
            _logger.LogError("User {username} already exists", username);
            return existedUser;
        }

        var user = new User
        {
            UserName = username,
            Email = email
        };

        await _userManager.CreateAsync(user, password);
        _logger.LogInformation("{username} successfully registered", username);

        return user;
    }

    /// <inheritdoc cref="IAuthenticationService.Login"/>
    public async Task<User?> Login(string username, string password, bool useCookies)
    {
        var user = await _userManager.FindByNameAsync(username);
        if (user is null)
        {
            _logger.LogError("User {username} not found", username);
            return null;
        }

        var result = await _signInManager.PasswordSignInAsync(user, password, useCookies, false);
        _logger.LogInformation("{username} successfully logged", username);

        return result.Succeeded ? user : null;
    }

    /// <inheritdoc cref="IAuthenticationService.Logout"/>
    public async Task Logout()
    {
        await _signInManager.SignOutAsync();
        _logger.LogError("User successfully logged out");
    }
}