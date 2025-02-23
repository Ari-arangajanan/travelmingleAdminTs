export interface GetBookingReq {
    page: number;
    limit: number;
    status?: number;
    userId?: number;
    serviceId?: number;
    serviceProviderId?: number;
    bookingDateFrom?: string;
    bookingDateTo?: string;
  }
  
  export interface Booking {
    id: number;
    status: number;
    createdAt: string;
    updatedAt: string;
    bookingDateFrom: string;
    bookingDateTo: string;
    price: number;
    rejectReason: string | null;
    user_name: string;
    user_id: number;
    service_id: number;
    service_provider_name: string;
    serviceProvider_id: number;
    service_name: string;
  }
  
  export interface GetBookingRes {
    content: Booking[];
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

  export interface Column {
    id: string;
    label: string;
    numeric: boolean;
  }

  export interface SearchBookingReq {
    bookingId?: number;
    serviceTypeId?: number;
    userTelegramIdId?: number;
    userId?: number;
    serviceProvider?: number;
    serviceId?: number;
    bookingDateFrom?: string;
    bookingDateTo?: string;
    status?: string;
    rejectReason?: string;
  }