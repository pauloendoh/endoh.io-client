import { DocDto } from "../define/DocDto";
import FileDto from "./FileDto";

export default interface FolderWithSubfoldersDto {
  id: number;

  userId: number;

  name: string;

  subfolders: FolderWithSubfoldersDto[];

  parentFolder: FolderWithSubfoldersDto;
  parentFolderId: number | null;

  files: FileDto[];
  docs: DocDto[];
}
