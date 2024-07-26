import axios, { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

/**
 * @description 全局設定 AJAX Request 攔截器 (interceptor)
*/
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

/**
 * @description 全局設定 AJAX Response 攔截器 (interceptor)
*/

axios.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);