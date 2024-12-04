import { getUserloginReq, getUserloginRes } from "../../pages/login/UserLogin";
import {
  ServiceProviderListRequest,
  ServiceProviderListResponse,
} from "../../pages/serviceProvider/ServiceProvider";
import { UserListRequest, UserListResponse } from "../../pages/user/User";
import ApiCalls from "./ApiCalls";

const UseNetworkCalls = () => {
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

  const getSnUser = (params: UserListRequest): Promise<UserListResponse> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
      telegramId: params.telegramId ? Number(params.telegramId) : undefined,
      id: params.id ? Number(params.id) : undefined,
    };
    return ApiCalls<UserListResponse>({
      endpoint: "/admin/systemUser/userList",
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getSnServiceProvider = (
    params: ServiceProviderListRequest
  ): Promise<ServiceProviderListResponse> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
      telegramId: params.telegramId ? Number(params.telegramId) : undefined,
      id: params.id ? Number(params.id) : undefined,
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

  return {
    getUserloginReq,
    getSnUser,
    getSnServiceProvider,
  };
};

export default UseNetworkCalls;
