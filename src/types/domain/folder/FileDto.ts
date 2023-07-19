export default interface FileDto {
  id: number | null
  userId: number | null
  parentFolderId: number

  name: string
}

export const newFileDto = (parentFolderId: number): FileDto => ({
  id: null,
  userId: null,
  parentFolderId,
  name: "",
})
