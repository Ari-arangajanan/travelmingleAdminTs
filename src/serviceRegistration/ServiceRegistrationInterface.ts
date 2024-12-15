export interface GetServiceRegistrationReq {
    page: number;
    limit: number;
    serviceName?: string;
    description?: string;
    categoryId?: number;
    serviceProviderId?: number;
    basePrice?: number;
    latitude?: number;
    longitude?: number;
  }
  
  export interface GetServiceRegistrationRes {
    content: Array<{
      id: number;
      registeredBy: {
        id: number;
        telegramId: number;
        userName: string;
        firstName: string;
        lastName: string | null;
        email: string | null;
        phone: string | null;
        updateTime: string | null;
        registrationDate: string;
        preferredLanguage: string;
        status: number;
        type: number;
        category: string | null;
        location: string | null;
      };
      status: number;
      registrationDate: string;
      approvalDate: string;
      latitude: number;
      longitude: number;
      categoryId: number;
      serviceName: string;
      description: string;
      basePrice: number;
      rejectReason: string | null;
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
  
  export interface AddServiceRegistrationReq {
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
  
  export interface AddServiceRegistrationRes {
    success: boolean;
    message: string;
  }
  
  export interface SearchServiceRegistrationReq { 
    serviceName?: string;
    categoryId?: number,
    serviceProviderId?: number,
  }
  
  export interface DeleteServiceRegistrationReq {
    id: number;
  }
  
  export interface DeleteServiceRegistrationRes {
    success: boolean;
    message: string;
  }
  