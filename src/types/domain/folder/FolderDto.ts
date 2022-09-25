import FileDto from "./FileDto";

export default interface FolderDto {
  id: number;
  userId: number;
  name: string;
  parentFolderId: number;
  files?: FileDto[];
}

export const newFolderDto = (parentFolderId: number = null): FolderDto => ({
  id: null,
  userId: null,
  name: "",
  parentFolderId: parentFolderId,
});

export const partialFolderDto = (partial: Partial<FolderDto>): FolderDto => ({
  id: partial.id || null,
  userId: partial.userId || null,
  name: partial.name || "",
  parentFolderId: partial.parentFolderId || null,
});
