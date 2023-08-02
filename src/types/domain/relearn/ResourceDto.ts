import { TagDto } from "./TagDto"

export interface ResourceDto {
  id: number | null
  userId: number | null
  title: string
  url: string
  thumbnail: string
  estimatedTime: string
  dueDate: string
  rating: number | null
  completedAt: string
  position: number | null
  publicReview: string
  privateNote: string

  fromResourceId: number | null

  createdAt: string
  updatedAt: string
  tag: TagDto | null
}

export const buildResourceDto = (
  partial?: Partial<ResourceDto>
): ResourceDto => ({
  id: null,
  userId: null,
  title: "",
  url: "",
  thumbnail: "",
  estimatedTime: "00:00h",
  dueDate: "",
  rating: null,
  completedAt: "",
  position: null,
  publicReview: "",
  privateNote: "",

  fromResourceId: null,

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  tag: null,

  ...partial,
})
