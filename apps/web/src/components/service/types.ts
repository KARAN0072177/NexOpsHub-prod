export interface CreateServiceRequest {
  name: string;
  description?: string;
}

export interface CreateServiceResponse {
  id: string;
  name: string;
  slug: string;
}