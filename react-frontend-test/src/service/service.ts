import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosRequestConfig,
} from "axios";
import { isEmpty } from "lodash-es";

interface BaseResponseData<T> {
  status: string;
  message?: string;
  data: T;
}

export interface BaseRequestConfig {
  /** 基础请求地址 */
  baseURL: string;
  /** 登录失效接口响应状态码 */
  loginExpiredCode?: string[];
  /** 请求成功接口响应状态码 */
  successCode?: string[];
  /** 设置请求头 */
  getHeaders?: () => Record<string, string | number | boolean>;
  /** 登录状态失效回调 */
  onLoginExpired?: () => void;
  /** 接口异常回调 */
  onRequestError?: (error: AxiosError) => void;
}

export class BaseRequest {
  public $instance: AxiosInstance;
  private timeout = 1000 * 60;
  private config: BaseRequestConfig;

  constructor(config: BaseRequestConfig) {
    this.config = config;

    this.$instance = axios.create({
      timeout: this.timeout,
      baseURL: this.config.baseURL,
    });

    // 请求拦截
    this.$instance.interceptors.request.use(this.$requestInterceptor);

    // 响应拦截
    this.$instance.interceptors.response.use(
      this.$responseInterceptor,
      this.$responseErrorInterceptor
    );
  }

  /**
   * 请求拦截器
   * @param config
   */
  private $requestInterceptor = (config: InternalAxiosRequestConfig) => {
    const customHeaders = this.config.getHeaders?.();

    if (config.headers) {
      if (!config.headers["Content-Type"])
        config.headers["Content-Type"] = "application/json;charset=UTF-8";
      if (customHeaders) {
        Object.keys(customHeaders).forEach((key) => {
          config.headers[key] = customHeaders[key];
        });
      }
    }

    return config;
  };

  /**
   * 响应拦截器
   * @param response
   */
  private $responseInterceptor = <T>(
    response: AxiosResponse<BaseResponseData<T>>
  ): Promise<T> => {
    const { status, message, data, ...rest } = response.data;
    const { loginExpiredCode, successCode, onLoginExpired, onRequestError } =
      this.config;
    const result = isEmpty(data) ? rest : data;
    // 登录失效
    if (loginExpiredCode?.includes(status)) {
      onLoginExpired?.();
      return Promise.reject({
        status,
        message,
        data: result,
      });
    }

    // status不在successCode中
    if (!successCode?.includes(status)) {
      const customError: AxiosError = {
        message: message,
        response: response,
        isAxiosError: true,
        name: "CustomError",
        config: response.config,
        toJSON: () => ({
          status: status,
          message: message,
          data: result,
        }),
      } as AxiosError;

      onRequestError?.(customError);
      return Promise.reject({ status, message, data: result });
    }

    // 成功时只返回data
    return Promise.resolve(result as T);
  };

  /**
   * 响应失败拦截器
   * @param response
   */
  private $responseErrorInterceptor = (error: AxiosError) => {
    const { onRequestError } = this.config;
    onRequestError?.(error);
    return Promise.reject(error);
  };

  /**
   * get请求
   * @param {url} string
   * @param {config} AxiosRequestConfig
   */
  public $get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.$instance.get(url, config);
  }

  /**
   * delete请求
   * @param {url} string
   * @param {config} AxiosRequestConfig
   */
  public $delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.$instance.delete(url, config);
  }

  /**
   * post请求
   * @param {url} string
   * @param {data} any
   * @param {config} AxiosRequestConfig
   */
  public $post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.$instance.post(url, data, config);
  }

  /**
   * put请求
   * @param {url} string
   * @param {data} any
   * @param {config} AxiosRequestConfig
   */
  public $put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.$instance.put(url, data, config);
  }
}
