export interface getSysUserRoleReq {
    page: number;
    limit: number;
  }

export interface getSysUserRoleRes {
    content: Array<{
        id: number;
        role: string;
        status: number;
        description: string;
        permissions: any | null;
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
    totalElements: number;
    totalPages: number;
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
}
