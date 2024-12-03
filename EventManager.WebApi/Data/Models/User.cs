using EventManager.WebApi.Data.Models.Abstractions;
using Microsoft.AspNetCore.Identity;

namespace EventManager.WebApi.Data.Models;

public class User : IdentityUser<int>, IUser
{
    
}