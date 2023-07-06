import { create } from "zustand"

export type FollowersDialogValue = {
  tab: "followers" | "following"
  userId: number
}

interface IStore {
  isOpen: boolean
  initialValue: FollowersDialogValue
  openDialog: (initialValue: FollowersDialogValue) => void
  closeDialog: () => void
}

const useFollowersDialogStore = create<IStore>((set, get) => ({
  isOpen: false,
  initialValue: {
    tab: "followers",
    userId: 0,
  },
  openDialog: (initialValue) =>
    set({
      isOpen: true,
      initialValue,
    }),
  closeDialog: () => {
    set({ isOpen: false })
  },
}))

export default useFollowersDialogStore
