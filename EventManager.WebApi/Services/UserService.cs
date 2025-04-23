using EventManager.WebApi.Data;
using EventManager.WebApi.Data.Models;
using EventManager.WebApi.Data.Models.Abstractions;
using EventManager.WebApi.Services.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace EventManager.WebApi.Services;

public class UserService(AppDbContext context, ILogger<UserService> logger) : IUserService
{
    private readonly ILogger _logger = logger;
    public async Task<User?> GetUserByIdAsync(int id)
    {
        var user = await context.Users.FindAsync(id);
        
        if (user is null)
        {
            _logger.LogError("User with id: {userId} not found", id);
            return null;
        }
        
        _logger.LogInformation("User with id: {userId} was found", id);

        return user;
    }

    public async Task<User?> GetUserByNameAsync(string name)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.UserName == name);
        
        if (user is null)
        {
            _logger.LogError("User with userName: {userName} not found", name);
            return null;
        }
        
        _logger.LogInformation("User with userName: {userName} was found", name);

        return user;
    }

    public async Task<IUserProfile?> GetUserProfileById(int userId)
    {
        throw new NotImplementedException();
    }
}