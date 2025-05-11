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

import { User, Void } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Users<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Users
   * @name UsersDetail
   * @request GET:/users/{id}
   */
  usersDetail = (id: number, params: RequestParams = {}) =>
    this.request<User, any>({
      path: `/users/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersDetail2
   * @request GET:/users/{name}
   * @originalName usersDetail
   * @duplicate
   */
  usersDetail2 = (name: string, params: RequestParams = {}) =>
    this.request<Void, any>({
      path: `/users/${name}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name ProfileDetail
   * @request GET:/users/profile/{userId}
   */
  profileDetail = (userId: number, params: RequestParams = {}) =>
    this.request<Void, any>({
      path: `/users/profile/${userId}`,
      method: "GET",
      format: "json",
      ...params,
    });
}
