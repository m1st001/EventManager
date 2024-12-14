namespace EventManager.WebApi.Data.Models.Requests.Auth;

/// <summary>
/// Request for registration endpoint
/// </summary>
public record RegisterRequest
{
    /// <summary>
    /// Username
    /// </summary>
    public required string Username { get; set; }

    /// <summary>
    /// User Email
    /// </summary>
    public string? Email { get; set; }

    /// <summary>
    /// User Password
    /// </summary>
    public required string Password { get; set; }
}