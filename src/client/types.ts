import type { Cache, Logger } from '@/typings/index.js';
import type { AxiosInstance } from 'axios';

export interface RequestOptions {
  params?: Record<string, string>;
  data?: Record<string, string | number | boolean | null>;
  headers?: Record<string, string>;
  path?: Record<string, string>;
}

export interface Payload {
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
  headers?: Record<string, string>;
  path?: Record<string, string>;
}

export interface ApiResponse<T = unknown> {
  code: number;
  msg?: string;
  data?: T;
}

export class ApiError extends Error {
  code: number;
  msg: string;

  constructor(code: number, msg: string) {
    super(msg);
    this.name = 'ApiError';
    this.code = code;
    this.msg = msg;
  }
}

export interface TokenManagerParams {
  appId: string;
  appSecret: string;
  cache: Cache;
  logger: Logger;
  httpInstance: AxiosInstance;
}

export interface TokenResponse {
  tenant_access_token: string;
  expire: number;
  code?: number;
  msg?: string;
}

export interface ApiClientConfig {
  appId: string;
  appSecret: string;
  apiEndpoint?: string;
  logger?: Logger;
  cache?: Cache;
  disableTokenCache?: boolean;
  httpInstance?: AxiosInstance;
}

export interface PaginationOptions {
  pageSize?: number;
  pageToken?: string;
}

export interface ListResponseData<T> {
  items: T[];
  page_token?: string;
  has_more: boolean;
  total: number;
}
