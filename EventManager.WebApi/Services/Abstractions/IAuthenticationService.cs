﻿using System.Security.Claims;
using EventManager.WebApi.Data.Models;
using Microsoft.AspNetCore.Identity;

namespace EventManager.WebApi.Services.Abstractions;

public interface IAuthenticationService
{
    /// <summary>
    /// register in system
    /// </summary>
    /// <param name="username">Username profile</param>
    /// <param name="email">Email profile</param>
    /// <param name="password">Password profile</param>
    /// <returns>User model</returns>
    Task<IdentityResult> Register(string username, string? email, string password);

    /// <summary>
    /// Login in system
    /// </summary>
    /// <param name="username">Username</param>
    /// <param name="password">User password</param>
    /// <param name="useCookies">Flag for cookies</param>
    /// <returns></returns>
    Task<User?> Login(string username, string password, bool useCookies);

    /// <summary>
    /// Logout from system
    /// </summary>
    /// <returns></returns>
    Task Logout();
    
    /// <summary>
    /// Gets info on current user.
    /// </summary>
    /// <param name="principal"></param>
    /// <returns></returns>
    Task<User?> GetMe(ClaimsPrincipal principal);
}