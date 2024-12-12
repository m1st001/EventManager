namespace EventManager.WebApi.Data.Models.Requests;

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
    public bool RememberMe { get; set; } = false;
}