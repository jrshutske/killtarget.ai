import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * Default axios request configuration
 * Can be customized per project needs
 */
export const defaultConfig: AxiosRequestConfig = {
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
};

/**
 * Create an axios instance with default config
 */
const axiosInstance = axios.create(defaultConfig);

/**
 * Generic GET request
 * @param url - The endpoint URL
 * @returns Promise with the response data
 */
export async function get<T>(url: string): Promise<T> {
  const response: AxiosResponse<T> = await axiosInstance.get(url);
  return response.data;
}

/**
 * Generic POST request
 * @param url - The endpoint URL
 * @param data - The data to send in the request body
 * @returns Promise with the response data
 */
export async function post<T, D>(url: string, data?: D): Promise<T> {
  const response: AxiosResponse<T> = await axiosInstance.post(url, data);
  return response.data;
}

/**
 * Generic PUT request
 * @param url - The endpoint URL
 * @param data - The data to send in the request body
 * @returns Promise with the response data
 */
export async function put<T, D>(url: string, data?: D): Promise<T> {
  const response: AxiosResponse<T> = await axiosInstance.put(url, data);
  return response.data;
}

/**
 * Generic DELETE request
 * @param url - The endpoint URL
 * @returns Promise with the response data
 */
export async function del<T>(url: string): Promise<T> {
  const response: AxiosResponse<T> = await axiosInstance.delete(url);
  return response.data;
}

/**
 * Generic PATCH request
 * @param url - The endpoint URL
 * @param data - The data to send in the request body
 * @returns Promise with the response data
 */
export async function patch<T, D>(url: string, data?: D): Promise<T> {
  const response: AxiosResponse<T> = await axiosInstance.patch(url, data);
  return response.data;
}
