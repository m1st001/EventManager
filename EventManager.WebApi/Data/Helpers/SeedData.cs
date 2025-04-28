using Bogus;
using EventManager.WebApi.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EventManager.WebApi.Data.Helpers;

public static class SeedData
{
    public static void SeedContext(ModelBuilder modelBuilder)
    {
        var hasher = new PasswordHasher<User>();
        var id = 1;
        var testUsers = new Faker<User>()
            .RuleFor(u => u.Id, f => id++)
            .RuleFor(u => u.UserName, f => f.Name.FirstName())
            .RuleFor(u => u.Email, f => f.Internet.Email())
            .RuleFor(u => u.PasswordHash, hasher.HashPassword(null,"password"));

        var users = testUsers.Generate(20);
        modelBuilder.Entity<User>().HasData(users);
        
        var eventId = 1;
        var testEvents = new Faker<Event>()
            .RuleFor(e => e.Id, f => eventId++)
            .RuleFor(e => e.Name, f => f.Commerce.ProductAdjective() + "Event")
            .RuleFor(e => e.Description, f => f.Lorem.Sentence(4, 5))
            .RuleFor(e => e.StartDate, f => f.Date.Future(1).ToUniversalTime())
            .RuleFor(e => e.CreatorId, f => f.PickRandom(1, 20))
            .RuleFor(e => e.Tags, f => f.Lorem.Words(f.Random.Int(1, 4)));
        var events = testEvents.Generate(20);
        modelBuilder.Entity<Event>().HasData(events);
    }

    public static async Task SeedAdminUser(UserManager<User> userManager)
    {
        var adminUser = new User
        {
            UserName = "admin",
            Email = "admin@admin.com",
        };
        
        var result = await userManager.CreateAsync(adminUser, "_admIn123");
    }
}