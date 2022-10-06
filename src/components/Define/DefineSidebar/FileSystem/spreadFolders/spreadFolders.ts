import FolderWithSubfoldersDto from "types/domain/folder/FolderWithSubfoldersDto";

export const spreadFolders = (folders: FolderWithSubfoldersDto[]) => {
  let subfolders: FolderWithSubfoldersDto[] = [];

  for (const folder of folders) {
    subfolders = [...subfolders, ...spreadFolders(folder.subfolders)];
  }

  const foldersWithoutSubfolders = folders.map(
    (f) => ({ ...f, subfolders: [] } as FolderWithSubfoldersDto)
  );
  console.log({
    foldersWithoutSubfolders,
  });
  return [...foldersWithoutSubfolders, ...subfolders];
};
