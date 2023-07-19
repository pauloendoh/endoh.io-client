import { DocDto } from "./DocDto"

export interface NoteDto {
  id: number | null
  userId: number
  docId: number
  doc?: DocDto

  index: number
  description: string
  question: string
  weight: number
  toRefine: boolean

  testedTimes: number

  createdAt: string
  updatedAt: string
}

export const buildNoteDto = (p?: Partial<NoteDto>): NoteDto => ({
  id: null,
  description: "",
  index: 0,
  question: "",
  docId: 0,
  userId: 0,
  weight: 1,
  toRefine: false,

  testedTimes: 0,

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...p,
})
