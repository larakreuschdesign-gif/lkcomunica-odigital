export interface Project {
  id: string
  userId: string
  name: string
  description?: string
  logo?: string
  brandColor?: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateProjectInput {
  name: string
  description?: string
  logo?: string
  brandColor?: string
}

export interface UpdateProjectInput {
  name?: string
  description?: string
  logo?: string
  brandColor?: string
}
