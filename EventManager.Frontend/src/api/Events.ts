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

import { CreateEventRequest, Event, Void } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Events<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags EventManager.WebApi
   * @name EventsList
   * @request GET:/events
   */
  eventsList = (params: RequestParams = {}) =>
    this.request<Event[], any>({
      path: `/events`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags EventManager.WebApi
   * @name EventsCreate
   * @request POST:/events
   */
  eventsCreate = (data: CreateEventRequest, params: RequestParams = {}) =>
    this.request<Void, any>({
      path: `/events`,
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
   * @name EventsDetail
   * @request GET:/events/{id}
   */
  eventsDetail = (id: number, params: RequestParams = {}) =>
    this.request<Void, any>({
      path: `/events/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags EventManager.WebApi
   * @name EventsUpdate
   * @request PUT:/events/{id}
   */
  eventsUpdate = (id: number, data: CreateEventRequest, params: RequestParams = {}) =>
    this.request<Void, any>({
      path: `/events/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags EventManager.WebApi
   * @name EventsDelete
   * @request DELETE:/events/{id}
   */
  eventsDelete = (id: number, params: RequestParams = {}) =>
    this.request<Void, any>({
      path: `/events/${id}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
}
