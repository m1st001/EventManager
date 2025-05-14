import { EventAvailability, EventStatus } from "../../api/data-contracts.ts";

// Format date to a more readable format
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return date.toLocaleString("ru-RU", options);
}

// Map EventStatus enum to human-readable strings
export function getStatusText(status?: EventStatus): string {
  switch (status) {
    case EventStatus.Value0:
      return "Draft";
    case EventStatus.Value1:
      return "Published";
    case EventStatus.Value2:
      return "Cancelled";
    default:
      return "Unknown";
  }
}

// Map EventStatus enum to colors
export function getStatusColor(status?: EventStatus): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" {
  switch (status) {
    case EventStatus.Value0:
      return "info";
    case EventStatus.Value1:
      return "success";
    case EventStatus.Value2:
      return "error";
    default:
      return "default";
  }
}

// Map EventAvailability enum to human-readable strings
export function getAvailabilityText(availability?: EventAvailability): string {
  switch (availability) {
    case EventAvailability.Value0:
      return "Available";
    case EventAvailability.Value1:
      return "Full";
    default:
      return "Unknown";
  }
}

// Map EventAvailability enum to colors
export function getAvailabilityColor(availability?: EventAvailability): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" {
  switch (availability) {
    case EventAvailability.Value0:
      return "success";
    case EventAvailability.Value1:
      return "warning";
    default:
      return "default";
  }
}