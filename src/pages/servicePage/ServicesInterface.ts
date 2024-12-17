export interface GetServiceReq {
    page: number;
    limit: number;
    serviceName?: string;
    description?: string;
    categoryId?: number;
    providerId?: number;
    basePrice?: number;
    status?: number;
    latitude?: number;
    longitude?: number;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface GetServiceRes {
    content: Array<{
      id: number;
      serviceName: string;
      description: string;
      basePrice: number;
      status: number;
      latitude: number;
      longitude: number;
      createdAt: string;
      updatedAt: string | null;
      attributes?: Array<{
        id: number;
        attributeName: string;
        attributeValue: string;
      }>;
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
  }
  
  export interface AddServiceReq {
    serviceName: string;
    description: string;
    basePrice: number;
    status: number;
    latitude: number;
    longitude: number;
    attributes?: Array<{
      attributeName: string;
      attributeValue: string;
    }>;
  }
  
  export interface AddServiceRes {
    success: boolean;
    message: string;
  }
  
  export interface SearchServiceReq {
    serviceName?: string;
    categoryId?: number,
    serviceProviderId?: number,
  }
  
  export interface DeleteServiceReq {
    id: number;
  }
  
  export interface DeleteServiceRes {
    success: boolean;
    message: string;
  }