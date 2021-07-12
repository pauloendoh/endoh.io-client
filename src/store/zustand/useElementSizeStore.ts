import create, { GetState, SetState } from "zustand"

interface IElementSize {
  count: number
  increment: () => void
}

const useElementSizeStore = create<IElementSize>(
  (set: SetState<IElementSize>, get: GetState<IElementSize>) => ({
    count: 0,
    increment: () => {
      const { count } = get()
      set({ count: count + 1 })
    },
  })
)

export default useElementSizeStore

//const {count} = useElementSizeStore()
