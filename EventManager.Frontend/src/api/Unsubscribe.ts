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

import { SubscribeEventRequest } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Unsubscribe<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags EventManager.WebApi
   * @name UnsubscribeCreate
   * @request POST:/unsubscribe
   */
  unsubscribeCreate = (data: SubscribeEventRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/unsubscribe`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}