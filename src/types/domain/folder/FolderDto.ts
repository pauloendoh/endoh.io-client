import FileDto from "./FileDto"

export default interface FolderDto {
  id: number | null
  userId: number | null
  name: string
  parentFolderId: number | null
  files?: FileDto[]
}

export const newFolderDto = (
  parentFolderId: number | null = null
): FolderDto => ({
  id: null,
  userId: null,
  name: "",
  parentFolderId: parentFolderId,
})

export const buildFolderDto = (p?: Partial<FolderDto>): FolderDto => ({
  id: null,
  userId: null,
  name: "",
  parentFolderId: null,

  ...p,
})
