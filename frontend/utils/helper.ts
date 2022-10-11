import { IncomingMessage } from "http";
import cookie from "cookie";

export const fetchData = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(endpoint, options);

  if (!response.ok) {
    if (response.status === 403 || response.status === 401) {
      return Promise.reject(response);
    }
    return Promise.reject(response);
  }

  return response.json();
};

export const zeroPad = (num: number | string, size: number): string => {
  num = String(num);

  while (num.length < size) num = "0" + num;

  return num;
};

export const parseCookie = (req: IncomingMessage): Record<string, string> => {
  return cookie.parse(req.headers.cookie ?? "");
};
