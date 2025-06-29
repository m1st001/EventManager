import { injectable } from "inversify";
import {
  LoginRequest,
  RegisterRequest,
  User,
} from "../../api/data-contracts.ts";

export interface IAuthService {
  login(loginCredentials: LoginRequest): Promise<boolean>;
  register(registerCredentials: RegisterRequest): Promise<boolean>;
  me(): Promise<boolean>;
  logout(): void;
  isAuthenticated(): boolean;
  currentUser(): User | undefined;
}

@injectable()
export class AuthService implements IAuthService {
  private _isAuthenticated = false;
  private _currentUser: User | undefined = undefined;

  currentUser(): User | undefined {
    return undefined;
  }

  me(): Promise<boolean> {
    return Promise.resolve(false);
  }

  login(loginCredentials: LoginRequest): Promise<boolean> {
    return Promise.resolve(false);
  }

  register(registerCredentials: RegisterRequest): Promise<boolean> {
    return Promise.resolve(false);
  }

  logout(): void {}

  isAuthenticated(): boolean {}
}
