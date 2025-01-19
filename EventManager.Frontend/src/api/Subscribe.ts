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

export class Subscribe<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags EventManager.WebApi
   * @name SubscribeCreate
   * @request POST:/subscribe
   */
  subscribeCreate = (data: SubscribeEventRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/subscribe`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
