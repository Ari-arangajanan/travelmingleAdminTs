export interface PaymentDetailsResponse {
    content: PaymentRecord[]; // List of payment records
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: SortInfo;
    numberOfElements: number;
    empty: boolean;
  }
  
  export interface PaymentRecord {
    id: number;
    booking: BookingDetails;
    amount: number;
    paymentMethod: string;
    paymentGateway: string;
    paymentOrderId: string;
    paymentStatus: number;
    createdAt: string; // ISO timestamp
  }
  
  export interface BookingDetails {
    id: number;
    status: number;
    createdAt: string;
    updatedAt: string;
    bookingDateFrom: string;
    bookingDateTo: string;
    price: number;
    rejectReason?: string | null;
    orderId: string;
    user_name: string;
    user_id: number;
    service_provider_name: string;
    service_id: number;
    serviceProvider_id: number;
    service_name: string;
  }
  
  export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: SortInfo;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  }
  
  export interface SortInfo {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  }


  export interface PaymentDetailsRequest {
    page?: number;
    limit?: number;
    id?: number;
    bookingId?: number;
    serviceProviderId?: number;
    paymentStatus?: number;
    paymentMethod?: string;
    orderId?: string;
    userId?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    currency?: string;
    phone?: string;
  }

  export interface ValidatePaymentApproveRequest {
    id: number;
    status: "APPROVED" | "REJECTED"; // Enum-like type for status
    reason?: string; // Reason for approval or rejection
  }

    export interface ValidatePaymentApproveResponse {
        id?: number;
        status?: number;
        message?: string;
    }
  
  