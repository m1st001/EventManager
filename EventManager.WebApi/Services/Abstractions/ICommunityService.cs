using EventManager.WebApi.Data.Models;
using EventManager.WebApi.Data.Models.Requests.Communities;

namespace EventManager.WebApi.Services.Abstractions;

public interface ICommunityService
{
    Task<List<Community>> GetAllAsync();
    Task<Community?> GetByIdAsync(int id);
    Task<int> CreateAsync(CreateCommunityRequest request);
    Task<Community?> UpdateAsync(int id, CreateCommunityRequest request);
    Task<bool> DeleteAsync(int id);
}