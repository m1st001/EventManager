﻿using System.ComponentModel.DataAnnotations;

namespace EventManager.WebApi.Data.Models.Requests.Events;

/// <summary>
/// 
/// </summary>
public record CreateEventRequest
{
    [MinLength(3)]
    [MaxLength(20)]
    public required string Name { get; set; }
    
    [Required]
    public DateTime StartDate { get; set; }
    
    public int CreatorId { get; set; }
    
    public string[] Tags { get; set; }
};