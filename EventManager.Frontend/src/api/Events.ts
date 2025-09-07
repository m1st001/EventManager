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

import { CreateEventRequest, IEvent, Void } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Events<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Events
   * @name EventsList
   * @request GET:/events
   */
  eventsList = (params: RequestParams = {}) =>
    this.request<IEvent[], any>({
      path: `/events`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Events
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
   * @tags Events
   * @name RegisteredList
   * @request GET:/events/registered
   */
  registeredList = (
    query: {
      /** @format int32 */
      userId: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<Void, any>({
      path: `/events/registered`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Events
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
   * @tags Events
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
   * @tags Events
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
  /**
   * No description
   *
   * @tags Events
   * @name PlannedList
   * @request GET:/events/planned
   */
  plannedList = (params: RequestParams = {}) =>
    this.request<IEvent[], any>({
      path: `/events/planned`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Events
   * @name HistoryDetail
   * @request GET:/events/{userId}/history
   */
  historyDetail = (userId: number, params: RequestParams = {}) =>
    this.request<IEvent[], any>({
      path: `/events/${userId}/history`,
      method: "GET",
      format: "json",
      ...params,
    });
}
