using EventManager.WebApi.Data;
using EventManager.WebApi.Data.Models;
using EventManager.WebApi.Data.Models.Requests.Communities;
using EventManager.WebApi.Services.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace EventManager.WebApi.Services;

public class CommunityService(AppDbContext context, ILogger<CommunityService> logger) : ICommunityService
{
    private readonly ILogger _logger = logger;

    public async Task<List<Community>> GetAllAsync()
    {
        return await context.Communities.ToListAsync();
    }

    public async Task<Community?> GetByIdAsync(int id)
    {
        return await context.Communities.FindAsync(id);
    }

    public async Task<int> CreateAsync(CreateCommunityRequest request)
    {
        var created = context.Communities.Add(new Community
        {
            Name = request.Name,
            Description = request.Description,
            CreatorId = request.CreatorId,
        });
        await context.SaveChangesAsync();
        _logger.LogInformation("Community {id} was created", created.Entity.Id);
        return created.Entity.Id;
    }

    public async Task<Community?> UpdateAsync(int id, CreateCommunityRequest request)
    {
        var exists = await context.Communities.FindAsync(id);
        if (exists is null) return null;
        exists.Name = request.Name;
        exists.Description = request.Description;
        await context.SaveChangesAsync();
        _logger.LogInformation("Community {id} was updated", id);
        return exists;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var entity = await context.Communities.FindAsync(id);
        if (entity is null) return false;
        context.Communities.Remove(entity);
        await context.SaveChangesAsync();
        _logger.LogInformation("Community {id} was deleted", id);
        return true;
    }
}