export interface DocDto {
  id: number;
  folderId: number | null;

  title: string;
  createdAt: string;
  updatedAt: string;
  lastOpenedAt: string;
}
