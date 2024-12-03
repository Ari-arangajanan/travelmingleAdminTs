import { getUserloginReq, getUserloginRes } from "../../pages/login/UserLogin";
import {
  ServiceProviderListRequest,
  ServiceProviderListResponse,
} from "../../pages/serviceCategory/ServiceProviderList";
import { UserListRequest, UserListResponse } from "../../pages/user/User";
import ApiCalls from "./ApiCalls";

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

  const getSysUser = (params: UserListRequest): Promise<UserListResponse> => {
    const { userName = "" } = params;
    const payload = {
      userName,
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

  return { ServiceProviderListRequest, getUserloginReq, getSysUser };
};

export default UseNetworkCalls;
