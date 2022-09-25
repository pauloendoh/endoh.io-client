export default interface FileDto {
  id: number;
  userId: number;
  parentFolderId: number;

  name: string;
}

export const newFileDto = (parentFolderId: number): FileDto => ({
  id: null,
  userId: null,
  parentFolderId,
  name: "",
});
