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

export interface Environment {
  id: string;

  projectId: string;

  name: string;

  slug: string;

  type: string;

  createdAt: string;

  updatedAt: string;
}

export interface CreateProjectResponse {
  success: boolean;

  message: string;

  project: {
    project: Project;

    environment: Environment;
  };
}