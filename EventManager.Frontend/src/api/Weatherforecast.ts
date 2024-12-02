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

import { WeatherForecast } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Weatherforecast<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags EventManager.WebApi
   * @name GetWeatherForecast
   * @request GET:/weatherforecast
   */
  getWeatherForecast = (params: RequestParams = {}) =>
    this.request<WeatherForecast[], any>({
      path: `/weatherforecast`,
      method: "GET",
      format: "json",
      ...params,
    });
}
