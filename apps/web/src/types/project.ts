export interface Project {
  id: string;

  organizationId: string;

  name: string;

  slug: string;

  description: string | null;

  createdAt: string;

  updatedAt: string;
}

export interface CreateProjectRequest {
  organizationId: string;

  name: string;

  description?: string;
}

export interface CreateProjectResponse {
  success: boolean;

  message: string;

  project: Project;
}