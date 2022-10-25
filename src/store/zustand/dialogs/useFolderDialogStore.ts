import FolderDto, { buildFolderDto } from "types/domain/folder/FolderDto"
import create from "zustand"

interface IDialogStore {
  isOpen: boolean
  initialValue: FolderDto
  openDialog: (initialValue: FolderDto) => void
  closeDialog: () => void
}

const useFolderDialogStore = create<IDialogStore>((set, get) => ({
  isOpen: false,
  initialValue: buildFolderDto(),
  openDialog: (options) =>
    set({
      isOpen: true,
      initialValue: options,
    }),
  closeDialog: () => {
    set({ isOpen: false })
  },
}))

export default useFolderDialogStore
