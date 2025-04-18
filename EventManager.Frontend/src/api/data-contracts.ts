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

export interface CreateEventRequest {
  /**
   * @minLength 3
   * @maxLength 20
   */
  name?: string | null;
  /** @maxLength 80 */
  description?: string | null;
  /** @format date-time */
  startDate: string;
  /** @format int32 */
  creatorId?: number;
  tags?: string[] | null;
  /**
   * @format int32
   * @min 2
   * @max 2147483647
   */
  maxParticipants: number;
}

export interface Event {
  /** @format int32 */
  id?: number;
  /**
   * @minLength 3
   * @maxLength 20
   */
  name?: string | null;
  /** @maxLength 80 */
  description?: string | null;
  /** @format date-time */
  startDate: string;
  /** @format date-time */
  createdDate: string;
  participants?: User[] | null;
  /** @format int32 */
  maxParticipants?: number;
  /** @format int32 */
  creatorId?: number;
  tags?: string[] | null;
}

export interface LoginRequest {
  username?: string | null;
  password?: string | null;
}

export interface RegisterRequest {
  username?: string | null;
  email?: string | null;
  password?: string | null;
}

export interface SubscribeEventRequest {
  /** @format int32 */
  userId?: number;
  /** @format int32 */
  eventId?: number;
}

export interface User {
  /** @format int32 */
  id?: number;
  userName?: string | null;
  normalizedUserName?: string | null;
  email?: string | null;
  normalizedEmail?: string | null;
  emailConfirmed?: boolean;
  passwordHash?: string | null;
  securityStamp?: string | null;
  concurrencyStamp?: string | null;
  phoneNumber?: string | null;
  phoneNumberConfirmed?: boolean;
  twoFactorEnabled?: boolean;
  /** @format date-time */
  lockoutEnd?: string | null;
  lockoutEnabled?: boolean;
  /** @format int32 */
  accessFailedCount?: number;
  subscribedToEvents?: Event[] | null;
  participatedInEventsIds?: number[] | null;
}

export type Void = object;
