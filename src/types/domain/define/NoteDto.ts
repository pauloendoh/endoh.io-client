export interface NoteDto {
  id: number
  userId: number
  docId: number

  index: number
  description: string
  question: string
  weight: number

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

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})
