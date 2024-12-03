export interface UserListRequest {
    page: number;
    limit: number;
    id?: number;
    telegramId?: string;
    userName?: string;
  }
  

export interface UserListResponse {
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
  