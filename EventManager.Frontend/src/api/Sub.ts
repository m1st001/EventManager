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

export class Sub<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Subscriptions
   * @name SubscribeCreate
   * @request POST:/sub/subscribe
   */
  subscribeCreate = (data: SubscribeEventRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/sub/subscribe`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Subscriptions
   * @name UnsubscribeCreate
   * @request POST:/sub/unsubscribe
   */
  unsubscribeCreate = (data: SubscribeEventRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/sub/unsubscribe`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
