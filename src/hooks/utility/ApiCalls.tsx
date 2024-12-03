import axios, { Method } from "axios";

interface ApiCallsParams {
  endpoint: string; // API endpoint
  method?: Method; // HTTP method
  data?: any; // Request payload
  headers?: Record<string, string>; // Custom headers
  withCredentials?: false;
}

const ApiCalls = async <T,>({
  endpoint,
  method = "GET",
  data = null,
  headers = {},
}: ApiCallsParams): Promise<T> => {
  const baseURL = import.meta.env.VITE_BASE_URL; // Define your base URL in environment variables
  const url = `${baseURL}${endpoint}`;

  try {
    const response = await axios({
      url,
      method,
      data,
      headers,
      withCredentials: true, // Ensure cookies are sent with requests
    });
    return response.data as T;
  } catch (error: unknown) {
    console.error("API call error:", error);
    throw error;
  }
};

export default ApiCalls;
