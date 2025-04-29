using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres");
var postgresDb = postgres.AddDatabase("postgresDb");

var seq = builder.AddContainer("seq", "datalust/seq")
    .WithLifetime(ContainerLifetime.Persistent)
    .WithVolume("seq-data", "/data") // Persistence
    .WithEndpoint(
        name: "ingestion",
        targetPort: 5341, // Container port
        port: 5341,      // Host port (optional - will be auto-assigned if null)
        scheme: "http")
    .WithEndpoint(
        name: "ui",
        targetPort: 80,   // Seq web UI runs on port 80 in container
        port: 5380,       // Expose on 5380 on host
        scheme: "http")
    .WithEnvironment("ACCEPT_EULA", "Y");

// Add MinIO as a containerized service
var minio = builder.AddContainer("minio", "minio/minio")
    .WithEndpoint(
        name: "api",
        targetPort: 9000, // MinIO API port inside container
        port: 9000,      // Port exposed on host (optional if you want host:9000)
        scheme: "http"
    )
    .WithEndpoint(
        name: "console",
        targetPort: 9001, // MinIO console port inside container
        port: 9001,       // Port exposed on host
        scheme: "http"
    )
    .WithArgs("server", "/data", "--console-address", ":9001")
    .WithVolume("minio-data", "/data");

var webapi = builder.AddProject<Projects.EventManager_WebApi>("webapi")
    .WithReference(postgresDb)
    .WaitFor(seq)
    .WithExternalHttpEndpoints();

var frontend = builder.AddNpmApp("frontend", "../eventmanager.frontend")
    .WithReference(webapi)
    .WaitFor(webapi)
    .WithEnvironment("BROWSER", "none")
    .WithHttpEndpoint(env: "VITE_PORT")
    .WithExternalHttpEndpoints();

var app = builder.Build();

app.Run();
