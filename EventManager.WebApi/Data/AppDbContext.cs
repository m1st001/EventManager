using EventManager.WebApi.Data.Helpers;
using EventManager.WebApi.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EventManager.WebApi.Data;

public sealed class AppDbContext : IdentityDbContext<User, IdentityRole<int>, int>
{
    private readonly IWebHostEnvironment _env;
    
    public AppDbContext(DbContextOptions<AppDbContext> options, IWebHostEnvironment env) : base(options)
    {
        _env = env;
        if (_env.IsDevelopment())
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }
    }
    
    public DbSet<Event> Events { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Event>()
            .HasMany(e => e.Participants)
            .WithMany(u => u.SubscribedToEvents);
        if (_env.IsDevelopment())
        {
            SeedData.SeedContext(modelBuilder);
        }
    }
}