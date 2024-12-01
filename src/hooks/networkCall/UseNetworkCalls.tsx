import ApiCalls from "./ApiCalls";

interface ServiceProviderListResponse {
  providers: Array<{
    id: number;
    name: string;
    services: string[];
  }>;
  total: number;
}

interface ServiceProviderListRequest {
  page?: number;
  limit?: number;
  userName?: string;
}

interface getUserloginReq {
  userName: string;
  password: string;
  rememberMe: boolean;
}

interface getUserloginRes {
  userName: string;
  refreshToken: string;
}

const UseNetworkCalls = () => {
  const ServiceProviderListRequest = (
    params: ServiceProviderListRequest
  ): Promise<ServiceProviderListResponse> => {
    const { page = 0, limit = 10, userName = "" } = params;
    const payload = {
      page,
      limit,
      ...(userName && { userName }),
    };
    return ApiCalls<ServiceProviderListResponse>({
      endpoint: "/admin/systemUser/serviceProviderList",
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getUserloginReq = (
    params: getUserloginReq
  ): Promise<getUserloginRes> => {
    const { userName = "", password = "", rememberMe = false } = params;
    const payload = {
      userName,
      password,
      rememberMe,
    };
    return ApiCalls<getUserloginRes>({
      endpoint: "/admin/systemUser/login",
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return { ServiceProviderListRequest, getUserloginReq };
};

export default UseNetworkCalls;
