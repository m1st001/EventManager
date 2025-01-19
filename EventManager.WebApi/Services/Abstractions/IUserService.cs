using EventManager.WebApi.Data.Models;

namespace EventManager.WebApi.Services.Abstractions;

/// <summary>
/// Service for interacting with Users.
/// </summary>
public interface IUserService
{
    /// <summary>
    /// Get an event by id.
    /// </summary>
    /// <param name="id">User.Id</param>
    /// <returns>User instance with given id, null if not found.</returns>
    Task<User?> GetUserByIdAsync(int id);
    
    /// <summary>
    /// Get an event by id.
    /// </summary>
    /// <param name="name">User.Name</param>
    /// <returns>User instance with give name, null if not found.</returns>
    Task<User?> GetUserByNameAsync(string name);
}