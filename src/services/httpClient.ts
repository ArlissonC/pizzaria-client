import axios, { AxiosResponse } from "axios";
import nookies, { parseCookies } from "nookies";

const baseURL = "http://localhost:3333";

const token = parseCookies()["@nextauth.token"];

const http = axios.create({
  baseURL,
  headers: { Authorization: token && `Bearer ${token}` },
});

const get = <T>(url: string, params?: object): Promise<AxiosResponse<T>> =>
  http.get(url, { params });

const post = <T>(url: string, data?: object): Promise<AxiosResponse<T>> =>
  http.post(url, data);

const put = <T>(url: string, data?: object): Promise<AxiosResponse<T>> =>
  http.put(url, data);

const del = <T>(url: string): Promise<AxiosResponse<T>> => http.delete(url);

export const httpClient = {
  get,
  post,
  put,
  del,
};