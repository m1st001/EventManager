// src/ioc/container.ts
import { Container } from "inversify";
import { AuthService, IAuthService } from "./services/authService.ts";

const container = new Container();

// Bind services
container.bind<IAuthService>("IAuthService").to(AuthService).inSingletonScope();

export { container };
