export interface ServiceProviderListRequest {
    page: number;
    limit: number;
    id?: number;
    telegramId?: number;
    userName?: string;
  }
  

export interface ServiceProviderListResponse {
    content: Array<{
      id: number;
      telegramId: number;
      userName: string;
      firstName: string;
      lastName: string | null;
      email: string | null;
      phone: string | null;
      updateTime: string | null;
      registrationDate: string; // ISO date-time string
      preferredLanguage: string;
      status: number;
      type: number;
      category:number;
      location:string;
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
      unpaged: boolean;
      paged: boolean;
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
  