import FileDto from "./FileDto"

export default interface FolderDto {
  id: number
  userId: number
  name: string
  parentFolderId: number
  files?: FileDto[]
}

export const newFolderDto = (parentFolderId: number = null): FolderDto => ({
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
