using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres");
var postgresDb = postgres.AddDatabase("postgresDb");

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
    .WithExternalHttpEndpoints();

var frontend = builder.AddNpmApp("frontend", "../eventmanager.frontend")
    .WithReference(webapi)
    .WaitFor(webapi)
    .WithEnvironment("BROWSER", "none")
    .WithHttpEndpoint(env: "VITE_PORT")
    .WithExternalHttpEndpoints();

var app = builder.Build();

app.Run();
