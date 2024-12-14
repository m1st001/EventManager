using System.Text.Json.Serialization;

namespace EventManager.WebApi.Data.Models.Requests.Auth;

/// <summary>
/// Request for login endpoint
/// </summary>
public record LoginRequest
{
    /// <summary>
    /// Username
    /// </summary>
    public required string Username { get; set; }

    /// <summary>
    /// User password
    /// </summary>
    public required string Password { get; set; }

    /// <summary>
    /// Remember me flag
    /// </summary>
    [JsonIgnore]
    public bool RememberMe { get; set; } = false;
}