export interface ServiceProviderListResponse {
    providers: Array<{
      id: number;
      name: string;
      services: string[];
    }>;
    total: number;
  }
  
  export interface ServiceProviderListRequest {
    page?: number;
    limit?: number;
    userName?: string;
  }
  