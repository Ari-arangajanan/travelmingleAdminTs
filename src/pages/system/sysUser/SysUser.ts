export interface GetSysUserReq {
  page: number;
  limit: number;
  userName?: string;
}

export interface GetSysUserRes {
  dropdownData: Array<{
      role: string;
      id: number;
  }>;
  totalPages: number;
  totalElements: number;
  content: {
      content: Array<{
          id: number;
          username: string;
          password: string;
          status: number;
          email: string;
          phone: string;
          avatar: string;
          create_time: string;
          update_time: string;
          authorities: {
              id: number;
              userName: string;
              role: string;
          };
      }>;
      pageable: {
          pageNumber: number;
          pageSize: number;
          sort: {
              empty: boolean;
              sorted: boolean;
              unsorted: boolean;
          };
          offset: number;
          paged: boolean;
          unpaged: boolean;
      };
      last: boolean;
      totalPages: number;
      totalElements: number;
      first: boolean;
      size: number;
      number: number;
      sort: {
          empty: boolean;
          sorted: boolean;
          unsorted: boolean;
      };
      numberOfElements: number;
      empty: boolean;
  };
}
