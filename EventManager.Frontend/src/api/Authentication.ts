/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { LoginRequest, RegisterRequest, User, Void } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Authentication<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags EventManager.WebApi
   * @name LoginCreate
   * @request POST:/authentication/login
   */
  loginCreate = (
    query: {
      rememberMe: boolean;
    },
    data: LoginRequest,
    params: RequestParams = {},
  ) =>
    this.request<User, any>({
      path: `/authentication/login`,
      method: "POST",
      query: query,
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags EventManager.WebApi
   * @name RegisterCreate
   * @request POST:/authentication/register
   */
  registerCreate = (data: RegisterRequest, params: RequestParams = {}) =>
    this.request<User, any>({
      path: `/authentication/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags EventManager.WebApi
   * @name LogoutCreate
   * @request POST:/authentication/logout
   */
  logoutCreate = (params: RequestParams = {}) =>
    this.request<Void, any>({
      path: `/authentication/logout`,
      method: "POST",
      ...params,
    });
}
