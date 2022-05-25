import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {
  camelCase,
  snakeCase,
} from 'change-case';
import {
  getSession,
  signOut,
} from 'next-auth/react';

import { UnrestrictedEnpoints } from '@/core/constants/constants';

import { caseConverter } from '@/utils/case-converter';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAuthHeader = (token: string) => `Bearer ${token}`;

export class Request {
  private instance!: AxiosInstance;

  private isRefreshingTriggered = false;

  constructor() {
    this.initConfig();
  }

  setAuthorizationToken(token: string) {
    this.instance.defaults.headers.common.Authorization = getAuthHeader(token);
  }

  isAuthorizationTokenSet() {
    return !!this.instance.defaults.headers.common.Authorization;
  }

  removeTokens() {
    delete this.instance.defaults.headers.common.Authorization;
  }

  setIsRefresh(status: boolean) {
    this.isRefreshingTriggered = status;
  }

  startRefresh() {
    this.setIsRefresh(true);
  }

  finishRefresh() {
    this.setIsRefresh(false);
  }

  isRefreshing() {
    return this.isRefreshingTriggered;
  }

  initConfig() {
    this.instance = axios.create({
      baseURL: (
        BACKEND_URL && (BACKEND_URL as string).endsWith('/')
      ) ?
        `${BACKEND_URL}api/` :
        `${BACKEND_URL}/api/`,
    });

    this.instance.interceptors.request.use(async config => ({
      ...config,
      data: config.data ? caseConverter(config.data, snakeCase) : config.data,
      params: config.params ? caseConverter(config.params, snakeCase) : config.params,
    }));

    this.instance.interceptors.response.use(response => ({
      ...response,
      data: caseConverter(response.data, camelCase),
    }), async error => {
      if (!error.response) {
        return Promise.reject(new Error('Error do not have a response.'));
      }

      // Return any error which is not due to authentication back to the calling service
      if (error.response.status !== 401 ||
        Object.values(UnrestrictedEnpoints).includes(error.config.url)) {
        return Promise.reject(this.parseError(error));
      }

      // refreshes the token after 401 and retries failed request
      if (
        !this.isRefreshing() &&
        error.response.status === 401 &&
        this.isAuthorizationTokenSet()
      ) {
        this.startRefresh();

        // Try to refresh the token by calling jwt from api/nextauth
        try {
          const data = await getSession();

          if (data?.accessToken && !data?.error) {
            this.setAuthorizationToken(data.accessToken);
          } else {
            if (typeof window !== 'undefined') {
              signOut({ redirect: false });
            }

            throw new Error('Access token not present');
          }
        } catch (e) {
          return Promise.reject(this.parseError(error));
        } finally {
          this.finishRefresh();
        }
      } else {
        return Promise.reject(this.parseError(error));
      }

      // extracting config from the failed request
      const { config } = error;

      // delete to rely on the default Authorization token set in instance
      delete config.headers.Authorization;

      return this.instance(config)
        .then(res => Promise.resolve({
          ...res,
          data: caseConverter(res.data, camelCase),
        }))
        .catch(err => {
          if (typeof window !== 'undefined') {
            signOut({ redirect: false });
          }

          return Promise.reject(this.parseError(err));
        });
    });
  }

  parseError(error: AxiosError): AxiosError {
    const { response } = error;

    const convertedData = caseConverter(response?.data || {}, camelCase);
    let data: unknown;

    if (typeof convertedData === 'string' || typeof convertedData === 'number' || typeof convertedData === 'boolean' || typeof convertedData === 'undefined') {
      data = convertedData;
    } else {
      const nonFieldErorrs: Array<string> = response?.data?.non_field_errors || [];

      data = {
        ...convertedData,
        _error: nonFieldErorrs,
      };
    }

    return {
      ...error,
      response: {
        ...response,
        data,
      } as AxiosResponse,
    };
  }

  get<P, QP = unknown>(
    url: string,
    config?: AxiosRequestConfig & { params?: QP }
  ): AxiosPromise<P> {
    return this.instance.get(url, config);
  }

  post<P>(url: string, data?: unknown, config?: AxiosRequestConfig): AxiosPromise<P> {
    return this.instance.post(url, data, config);
  }

  options<P>(url: string, config?: AxiosRequestConfig): AxiosPromise<P> {
    return this.instance.options(url, config);
  }

  patch<P>(url: string, data?: unknown, config?: AxiosRequestConfig): AxiosPromise<P> {
    return this.instance.patch(url, data, config);
  }

  put<P>(url: string, data?: unknown, config?: AxiosRequestConfig): AxiosPromise<P> {
    return this.instance.put(url, data, config);
  }

  delete<P>(url: string, config?: AxiosRequestConfig): AxiosPromise<P> {
    return this.instance.delete(url, config);
  }
}

export const request = new Request();
