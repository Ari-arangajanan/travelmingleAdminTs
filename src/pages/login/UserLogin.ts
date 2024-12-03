export interface getUserloginReq {
    userName: string;
    password: string;
    rememberMe: boolean;
  }
  
  export interface getUserloginRes {
    userName: string;
    refreshToken: string;
  }
  