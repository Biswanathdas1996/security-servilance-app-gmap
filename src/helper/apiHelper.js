import { BASE_URL, USE_MOCK } from "../config";
import { mockResponse } from "../utils/mockMapper";

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    Cookie: document.cookie,
  },
  redirect: "follow",
  credentials: "include",
  withCredentials: true,
};

export const get = async (url, params) => {
  if (USE_MOCK) {
    const mockFile = mockResponse(url, "GET");
    const mockData = await import(`../apiConfig/Mock/${mockFile}`);
    return mockData?.default;
  } else {
    try {
      const requestValues = {
        ...requestOptions,
        method: "GET",
        params,
      };
      const response = await fetch(`${BASE_URL}${url}`, requestValues)
        .then((response) => {
          console.log(response.headers.get("set-cookie"));
          return response.json();
        })
        .then((result) => result)
        .catch((error) => console.log("error", error));
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export const post = async (url, data) => {
  if (USE_MOCK) {
    const mockFile = mockResponse(url, "POST");
    const mockData = await import(`../apiConfig/Mock/${mockFile}`);
    return mockData?.default;
  } else {
    try {
      const requestValues = {
        ...requestOptions,
        method: "POST",
        body: JSON.stringify(data),
      };
      const response = await fetch(`${BASE_URL}${url}`, requestValues)
        .then((response) => response.json())
        .then((result) => result)
        .catch((error) => console.log("error", error));
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export const put = async (url, data) => {
  if (USE_MOCK) {
    const mockFile = mockResponse(url, "PUT");
    const mockData = await import(`../apiConfig/Mock/${mockFile}`);
    return mockData?.default;
  } else {
    try {
      const requestValues = {
        ...requestOptions,
        method: "PUT",
        body: JSON.stringify(data),
      };
      const response = await fetch(`${BASE_URL}${url}`, requestValues)
        .then((response) => response.json())
        .then((result) => result)
        .catch((error) => console.log("error", error));
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export const del = async (url) => {
  if (USE_MOCK) {
    const mockFile = mockResponse(url, "DELETE");
    const mockData = await import(`../apiConfig/Mock/${mockFile}`);
    return mockData?.default;
  } else {
    try {
      const requestValues = {
        ...requestOptions,
        method: "DELETE",
      };
      const response = await fetch(`${BASE_URL}${url}`, requestValues)
        .then((response) => response.json())
        .then((result) => result)
        .catch((error) => console.log("error", error));
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
