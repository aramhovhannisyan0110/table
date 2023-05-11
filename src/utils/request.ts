import axios, { Method } from "axios";

const port = 8000;
const baseURL = `http://localhost:${port}/`;

// eslint-disable-next-line
export const request = (method: Method, url: string, data?: any) => {
  const config = {
    method,
    url: "",
    data: {},
  };
  config.url = baseURL + url;
  if (method === "get" && data && typeof data === "object") {
    config.url =
      url +
      "?" +
      Object.keys(data)
        .reduce(
          (accumulator, value) => accumulator + value + "=" + data[value] + "&",
          ""
        )
        .slice(0, -1);
  } else {
    config.data = data;
  }
  return {
    axios,
    ...config,
  };
};
