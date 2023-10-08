import { AxiosRequestConfig, AxiosResponse } from 'axios';

import delay from '../../utils/delay';

import api from './../api';
import APIError from '../../errors/APIErrors';

class HttpClient {
  private baseURL: string;

  constructor(baseURL = 'http://localhost:3001/api') {
    this.baseURL = baseURL;
  }

  get<T>(path: string) {
    return this.makeRequest<T>({
      method: 'get',
      url: `${this.baseURL}${path}`,
    });
  }

  delete<T>(path: string) {
    return this.makeRequest<T>({
      method: 'delete',
      url: `${this.baseURL}${path}`,
    });
  }

  post<T, K>(path: string, data: K) {
    return this.makeRequest<T>({
      method: 'post',
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
    await delay(1500);

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
