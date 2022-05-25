import { AxiosRequestConfig } from 'axios';

import { Nullable } from '@/core/interfaces/common';

import {
  getAuthHeader,
  request,
} from '@/utils/request';

export enum RequestMethods {
  delete = 'delete',
  get = 'get',
  options = 'options',
  patch = 'patch',
  post = 'post',
  put = 'put',
}

/*
  The purpose of this function is to provide an easy way of making requests that require
  authentication on the server side.
  The function expects the access token and returns a proxied version of our request instance,
  which adds the Authorization header with the provided token to every request.
  Since the proxy only affects HTTP requests methods, all the other logic remains unchanged.

  Proxy API: https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Proxy
  Reflect API: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
*/
export const makeServerSideRequest = (token?: string, instance = request) => new Proxy(instance, {
  // get the accessed property - if it's not a method that makes an HTTP request, leave it as is
  get: (target, prop: RequestMethods, receiver) => {
    if (!Object.values(RequestMethods).includes(prop) || !token) {
      return Reflect.get(target, prop, receiver);
    }

    /* add another trap for the accessed function,
     which will run every time said function is called */
    const proxiedFn = new Proxy(target[prop], {
      apply: (fn, context, argumentsList) => {
        // the request config is always the last argument
        const configPos = fn.length - 1;
        /* create the new config with Authorization header,
         merge it with the provided config (if present) */
        const config: Nullable<AxiosRequestConfig> = argumentsList[configPos];
        const newConfig: AxiosRequestConfig = {
          ...config ?? {},
          headers: {
            ...config?.headers ?? {},
            Authorization: getAuthHeader(token),
          },
        };

        // create the new arguments list and insert the new config as the last argument
        const newArgumentsList = [...argumentsList];

        newArgumentsList[configPos] = newConfig;

        // call the function with new arguments
        return Reflect.apply(fn, context, newArgumentsList);
      },
    });

    // return the proxied function instead of the original one
    return proxiedFn;
  },
});
