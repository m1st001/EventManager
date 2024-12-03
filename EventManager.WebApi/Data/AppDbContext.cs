using EventManager.WebApi.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace EventManager.WebApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        Database.EnsureDeleted();
        Database.EnsureCreated();
    }
    
    public DbSet<Event> Events { get; set; }
    public DbSet<User> Users { get; set; }
}