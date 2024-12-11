export interface GetCategoryReq {
    page: number;
    limit: number;
    categoryName?: string;
  }
  
  export interface GetCategoryRes {
    content: Array<{
      id: number;
      categoryName: string;
      description: string;
      status: number;
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
    size: number;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  }
  
  export interface AddCategoryReq {
    categoryName: string;
    description: string;
    status: number;
  }
  
  export interface AddCategoryRes {
    success: boolean;
    message: string;
  }

  export interface SearchCategoryReq {
    categoryName: string;
  }
  
  export interface DeleteCategoryReq {
    id: number;
  }
  
  export interface DeleteCategoryRes {
    success: boolean;
    message: string;
  }
  