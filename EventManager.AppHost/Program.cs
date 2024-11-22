var builder = DistributedApplication.CreateBuilder(args);

var webapi = builder.AddProject<Projects.EventManager_WebApi>("webapi")
    .WithExternalHttpEndpoints();

var frontend = builder.AddNpmApp("frontend", "../eventmanager.frontend")
    .WithHttpEndpoint(env: "PORT")
    .WithReference(webapi)
    .WithExternalHttpEndpoints();

builder.Build().Run();
