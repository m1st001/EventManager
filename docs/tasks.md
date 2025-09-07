# EventManager Improvement Tasks Checklist

Note: Each item is actionable and ordered to minimize risk and maximize leverage. Check off items as they are completed.

1. [ ] Establish configuration hygiene and options binding
   - [ ] Introduce strongly-typed options classes (e.g., FrontendOptions, DatabaseOptions, CookieOptions, MinioOptions, ObservabilityOptions) and bind them via services.Configure<T>(Configuration.GetSection(...)).
   - [ ] Replace direct Configuration[] lookups with IOptions/ValidateOnStart and add missing config keys to appsettings.Development.json and production configs.
   - [ ] Remove hardcoded MinIO credentials/URL from DiExtensions.AddMinio and read from configuration/secrets. Use user-secrets for local dev.
   - [ ] Validate CORS origin(s) from config; disallow "*" when AllowCredentials is true; support multiple origins.
   - [ ] Externalize cookie lifetimes/flags to configuration and validate per environment.

2. [ ] Adopt proper database lifecycle management
   - [ ] Remove Database.EnsureDeleted/EnsureCreated from AppDbContext constructor; use EF Core migrations instead.
   - [ ] Add migrations folder and create initial migration if missing; document update workflow (dotnet ef database update).
   - [ ] Move data seeding out of OnModelCreating/constructor into an IHostedService or application startup seed that runs conditionally in Development.
   - [ ] Ensure SeedAdminUser checks for existing admin user before creating; gate by environment.

3. [ ] Strengthen domain and data modeling
   - [ ] Review Event/User relationships; configure many-to-many join entity explicitly if additional metadata or constraints will be needed.
   - [ ] Add concurrency tokens (e.g., rowversion) to entities where concurrent updates are expected; handle DbUpdateConcurrencyException.
   - [ ] Ensure DateTime is stored/returned in UTC; configure JsonOptions to serialize DateTime as UTC.
   - [ ] Add validation attributes to entity/request models where applicable (MaxLength, Range, Required).

4. [ ] Introduce input validation layer
   - [ ] Add FluentValidation and validators for request DTOs (CreateEventRequest, SubscribeEventRequest, LoginRequest, RegisterRequest, etc.).
   - [ ] Integrate validation into minimal API endpoints (e.g., endpoint filters or manual validation) returning ProblemDetails for invalid inputs.

5. [ ] Implement global error handling and ProblemDetails
   - [ ] Add ExceptionHandling middleware producing RFC7807 ProblemDetails with correlation/trace id.
   - [ ] Normalize 404 vs 204: return NotFound when a single resource is missing; use NoContent only for successful empty responses.
   - [ ] Map domain/service errors to appropriate HTTP codes with typed results.

6. [ ] Refine authentication/authorization configuration
   - [ ] Confirm cookie auth scheme and SameSite behavior for SPA; conditionally set CookieSecurePolicy/SameSite based on environment and FrontendUrl.
   - [ ] Add authorization policies/requirements for protected endpoints (e.g., only creator can edit/delete events).
   - [ ] Ensure authentication endpoints set security metadata in Swagger; add cookie auth doc in OpenAPI.
   - [ ] Fix AuthenticationService.Logout to log at Information level on success.

7. [ ] Fix service logic issues and align contracts
   - [ ] EventService.UpdateEventAsync: fetch existing entity by id, map fields, SaveChangesAsync; return NotFound if missing.
   - [ ] EventService.GetEventsHistoryByUserIdAsync: align method signature with endpoints (remove unused "count" or implement pagination) and add CancellationToken parameters across service methods.
   - [ ] Use AsNoTracking for read-only queries; add Include/ThenInclude where needed to avoid lazy-loading pitfalls.
   - [ ] SubscriptionService.UnsubscribeAsync: ensure user is loaded with SubscribedToEvents before removal to avoid attach issues; check for existence before remove.
   - [ ] Ensure all service methods validate inputs and log with structured properties; adjust log levels (Information/Warning/Error) appropriately.

8. [ ] Enhance endpoints design and consistency
   - [ ] Use API versioning (e.g., AspNetCore.Mvc.Versioning) and add versioned route groups.
   - [ ] Standardize routes and verbs: avoid ambiguous routes like users/{name} vs users/{id:int}; disambiguate with clear templates (e.g., by-name/{name}).
   - [ ] Ensure Create endpoints return 201 Created with Location header (pointing to GET by id) and response DTO.
   - [ ] Derive userId from ClaimsPrincipal for user-specific operations instead of accepting arbitrary userId in query/body where security-sensitive.
   - [ ] Add pagination, sorting, and filtering to list endpoints (events), with validated query parameters and default limits.
   - [ ] Require authorization on endpoints that should be protected; verify minimal necessary exposure on identity endpoints.

9. [ ] DTOs, mapping, and surface area
   - [ ] Introduce response DTOs to avoid leaking entity internals (e.g., User without PasswordHash).
   - [ ] Add a mapper (Mapster or AutoMapper) profile(s) and use them in services/endpoints.

10. [ ] Observability and diagnostics
    - [ ] Replace bare AddOpenTelemetry logging config with full OTEL setup: resource, log/trace exporters, add ASP.NET Core and EF Core instrumentation.
    - [ ] Ensure the OTLP endpoint (SeqUrl or OTLPUrl) is correct; prefer OTLP/HTTP exporter naming; add options binding and environment overrides.
    - [ ] Enrich logs with correlation/trace ids; include request logging middleware.
    - [ ] Add health checks (readiness/liveness) for DB and MinIO; expose /health endpoints.

11. [ ] Performance and caching
    - [ ] Introduce response caching or server-side caching for frequently requested lists (e.g., events planned) with cache invalidation on write.
    - [ ] Add database indexes where beneficial (e.g., Event.Status, Event.StartDate).
    - [ ] Review N+1 query risks in services; prefer projection queries to slim payloads.

12. [ ] Storage and MinIO integration
    - [ ] Abstract MinIO interactions behind an IFileStorageService; do not inject IAmazonS3 directly into endpoints.
    - [ ] Add bucket existence check/creation on startup; configure IAM-style credentials via secrets/env vars.
    - [ ] Add MinIO health check and retry policies (Polly) for transient errors.

13. [ ] Security hardening
    - [ ] Add rate limiting middleware for auth and write endpoints.
    - [ ] Scrub error messages to avoid leaking sensitive details (e.g., auth failures return generic messages).
    - [ ] Validate CORS preflight and restrict headers/methods to necessary ones.
    - [ ] Add antiforgery protections or CSRF guidance for cookie-based SPA auth (consider SameSite=Lax/Strict and XSRF tokens if needed).

14. [ ] Testing strategy
    - [ ] Add unit tests for services (EventService, SubscriptionService, AuthenticationService, UserService) with in-memory DB or SQLite in-memory.
    - [ ] Add integration tests for endpoints using WebApplicationFactory; use Testcontainers for Postgres/MinIO (or wire to Aspire resources).
    - [ ] Add authentication test helpers to issue cookies/claims.
    - [ ] Add basic performance tests for hot endpoints.

15. [ ] Continuous Integration / Dev Experience
    - [ ] Add GitHub Actions/Azure DevOps pipeline: restore, build, run tests, publish code coverage, run dotnet format/analyzers.
    - [ ] Enable nullable reference types and add code analyzers (Microsoft.CodeAnalysis.NetAnalyzers, StyleCop or similar); fix warnings.
    - [ ] Add editorconfig and dotnet-format to enforce code style.
    - [ ] Add launchSettings and environment docs for local dev; ensure Aspire AppHost config is documented.

16. [ ] API documentation
    - [ ] Enrich Swagger/OpenAPI with XML comments, summaries, and response types; include security scheme for cookie auth.
    - [ ] Group endpoints with tags and descriptions consistently; hide internal endpoints.

17. [ ] Data retention and lifecycle (optional/forward-looking)
    - [ ] Consider soft-delete for events and audit fields (CreatedAt/UpdatedAt) via EF Core interceptors.
    - [ ] Implement outbox/inbox pattern if domain grows to integration events.

18. [ ] Cleanup and consistency
    - [ ] Normalize logging messages and parameters; avoid logging at Error for successful operations.
    - [ ] Ensure consistent use of Results.NotFound vs Results.NoContent; unify across endpoints.
    - [ ] Rename ambiguous parameter names; ensure cancellation tokens flow from controllers to services.
    - [ ] Consolidate DI registration in one place; remove duplicates (ConfigureApplicationCookie is called twice currently).

19. [ ] Release readiness
    - [ ] Add appsettings.Production.json template and guidance on secrets; verify all required config values have defaults or validations.
    - [ ] Add structured release notes template and migration checklist (DB migrations, config keys, health checks).
