using EventManager.WebApi.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EventManager.WebApi.Data;

public sealed class AppDbContext : IdentityDbContext<User, IdentityRole<int>, int>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    
    public DbSet<Event> Events { get; set; }
    public DbSet<Community> Communities { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Event>()
            .HasMany(e => e.Participants)
            .WithMany(u => u.Events);

        modelBuilder.Entity<Event>()
            .HasOne(e => e.Community)
            .WithMany(c => c.Events)
            .HasForeignKey(e => e.CommunityId)
            .IsRequired();

        modelBuilder.Entity<User>()
            .HasMany(u => u.Communities)
            .WithMany(c => c.Members);
    }
}