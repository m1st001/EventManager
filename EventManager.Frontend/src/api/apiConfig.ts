import { HttpClient } from "./http-client";
import { Events } from "./Events";
import { Authentication } from "./Authentication";
import { Sub } from "./Sub";

// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Creates a pre-configured API client with the correct baseUrl
 * @param ClientClass The API client class to instantiate
 * @returns A new instance of the API client with the baseUrl set
 */
export function createApiClient<T extends HttpClient, Args extends any[]>(
  ClientClass: new (...args: Args) => T,
  ...args: Args
): T {
  const client = new ClientClass(...args);
  client.baseUrl = API_URL;
  return client;
}

// Export pre-configured instances of commonly used API clients
export const eventsClient = createApiClient(Events);
export const authClient = createApiClient(Authentication);
export const subClient = createApiClient(Sub);
