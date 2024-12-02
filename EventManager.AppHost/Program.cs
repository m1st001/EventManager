using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres");
var postgresDb = postgres.AddDatabase("postgresDb");

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
