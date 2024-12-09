import { getUserloginReq, getUserloginRes } from "../../pages/login/UserLogin";
import {
  ServiceProviderListRequest,
  ServiceProviderListResponse,
} from "../../pages/serviceProvider/ServiceProviderInterface";
import {
  getSysUserRoleReq,
  getSysUserRoleRes,
} from "../../pages/system/sysRole/SysRoleInterface";
import {
  AddSysUserReq,
  AddSysUserRes,
  GetSysUserReq,
  GetSysUserRes,
} from "../../pages/system/sysUser/SysUser";
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

  const getSysUser = (params: GetSysUserReq): Promise<GetSysUserRes> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<GetSysUserRes>({
      endpoint: "/admin/systemUser/index",
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const addSysUser = (data: AddSysUserReq): Promise<AddSysUserRes> => {
    return ApiCalls<AddSysUserRes>({
      endpoint: "/admin/systemUser/register",
      method: "POST",
      data: data, // Directly pass the object
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getSysRole = (
    params: getSysUserRoleReq
  ): Promise<getSysUserRoleRes> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<getSysUserRoleRes>({
      endpoint: "/admin/systemUser/index",
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
    getSysUser,
    getSysRole,
    addSysUser,
  };
};

export default UseNetworkCalls;
