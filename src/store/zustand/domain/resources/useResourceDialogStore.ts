import { ResourceDto } from "types/domain/relearn/ResourceDto"
import { create } from "zustand"

interface IStore {
  initialValue: ResourceDto | null
  checkUrlOnOpen: boolean
  setInitialValue: (
    resource: ResourceDto | null,
    options?: {
      checkUrlOnOpen?: boolean
    }
  ) => void
}

const useResourceDialogStore = create<IStore>((set, get) => ({
  initialValue: null,
  checkUrlOnOpen: false,
  setInitialValue: (resource, options) => {
    set({ initialValue: resource })

    if (options) {
      set({ checkUrlOnOpen: options.checkUrlOnOpen })
      return
    }

    set({ checkUrlOnOpen: false })
  },
}))

export default useResourceDialogStore
