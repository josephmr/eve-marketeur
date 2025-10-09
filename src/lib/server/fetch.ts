import {
  fetch as uFetch,
  Agent,
  interceptors,
  type RequestInfo,
  type RequestInit,
} from "undici";

// Create a client with cache interceptor
const client = new Agent().compose(interceptors.cache());

const fetch = (input: RequestInfo, init?: RequestInit) => {
  return uFetch(input, { ...init, dispatcher: client });
};

export default fetch;
