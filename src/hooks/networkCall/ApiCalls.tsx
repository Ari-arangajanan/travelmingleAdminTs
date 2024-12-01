import axios, { Method } from "axios";

interface ApiCallsParam {
  endpoint: string; // The API endpoint to which the request will be sent.
  method?: Method; // Optional HTTP method, defaults to "GET" if not specified.
  data?: any; // Optional request body (e.g., for POST or PUT requests).
  headers?: Record<string, string>; // Optional headers for the request (e.g., "Authorization").
}

const ApiCalls = async <T,>({
  endpoint,
  method = "GET",
  data = null,
  headers = {},
}: ApiCallsParam): Promise<T> => {
  try {
    // Add the base URL from the environment variable
    const baseURL = import.meta.env.VITE_BASE_URL; // Load the base URL from environment variables
    if (!baseURL) {
      throw new Error("Base URL is not defined in environment variables.");
    }
    const fullURL = `${baseURL}${endpoint}`; // Construct the full URL

    const response = await axios({
      url: fullURL,
      method,
      data,
      headers,
    });
    return response.data; // Return only the response data
  } catch (error) {
    console.error("API call error:", error);
    throw error; // Rethrow error for handling in the calling function
  }
};

export default ApiCalls;
