import { DocDto } from "./DocDto"

export interface NoteDto {
  id: number
  userId: number
  docId: number
  doc?: DocDto

  index: number
  description: string
  question: string
  weight: number
  toRefine: boolean

  createdAt: string
  updatedAt: string
}

export const newNoteDto = (
  index: number,
  docId: number,
  userId: number
): NoteDto => ({
  id: null,
  docId: docId,
  userId: userId,

  index: index,
  description: "",
  question: "",
  weight: 1,
  toRefine: false,

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

export const buildNoteDto = (p?: Partial<NoteDto>): NoteDto => ({
  id: null,
  description: "",
  index: 0,
  question: "",
  docId: 0,
  userId: 0,
  weight: 1,
  toRefine: false,

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...p,
})
