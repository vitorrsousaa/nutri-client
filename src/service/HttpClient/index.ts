import { AxiosRequestConfig, AxiosResponse } from 'axios';

import APIError from '../../errors/APIErrors';

const { VITE_API_BASE_URL, DEV: IS_DEVELOPMENT } = import.meta.env;

import delay from '@godiet-utils/delay';

import api from './../api';

class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = VITE_API_BASE_URL + baseURL;
  }

  get<T>(path: string) {
    return this.makeRequest<T>({
      method: 'get',
      url: `${this.baseURL}${path}`,
    });
  }

  delete<T, K>(path: string, data: K) {
    return this.makeRequest<T>({
      method: 'delete',
      url: `${this.baseURL}${path}`,
      data,
    });
  }

  /**
   * This function, 'post', is a generic method with two type parameters, T for specifying the expected response type and K for representing the payload data type in the HTTP POST request.
   * @param path  The path parameter specifies the endpoint URL
   * @param data The data parameter of type K represents the payload to be sent with the request
   * @returns
   */
  post<T, K>(path: string, data: K) {
    return this.makeRequest<T>({
      method: 'post',
      url: `${this.baseURL}${path}`,
      data,
    });
  }

  put<T, K>(path: string, data: K) {
    return this.makeRequest<T>({
      method: 'put',
      url: `${this.baseURL}${path}`,
      data,
    });
  }

  patch<T, K>(path: string, data: K) {
    return this.makeRequest<T>({
      method: 'patch',
      url: `${this.baseURL}${path}`,
      data,
    });
  }

  private async makeRequest<T>(options: AxiosRequestConfig): Promise<T> {
    if (IS_DEVELOPMENT) {
      await delay(3000);
    }

    const response: AxiosResponse = await api({
      ...options,
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      },
    });

    if (response.status >= 200 && response.status < 400) {
      return response.data as T;
    }

    throw new APIError(response);
  }
}

export default HttpClient;
