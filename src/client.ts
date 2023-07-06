import BaseAnalytics from "analytics-node";
import { AxiosInstance, AxiosRequestConfig } from "axios";

export type AnalyticsOptions = {
  flushAt?: number | undefined;
  flushInterval?: number | undefined;
  enable?: boolean | undefined;
  timeout?: number | string | undefined;
  flushed?: boolean | undefined;
  errorHandler?: (err: Error) => void;
  axiosInstance?: AxiosInstance;
  axiosConfig?: AxiosRequestConfig;
};

type BaseAnalyticsOptions = AnalyticsOptions & {
  host: string;
  path: string;
};

export class Analytics extends BaseAnalytics {
  constructor(writeKey: string, opts?: AnalyticsOptions) {
    const options = opts ?? {};
    const mergedOptions: BaseAnalyticsOptions = {
      ...options,
      host: "https://api.june.so",
      path: "/sdk/batch",
    };

    super(writeKey, mergedOptions);
  }
}
