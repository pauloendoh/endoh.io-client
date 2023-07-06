import { DocDto } from "types/domain/questions/DocDto"
import { NoteDto } from "types/domain/questions/NoteDto"
import { pushOrReplace } from "utils/array/pushOrReplace"
import { create } from "zustand"

interface IDocsStore {
  docs: DocDto[]
  notes: NoteDto[]
  hasFirstLoaded: boolean

  setDocs: (docs: DocDto[]) => void
  setNotes: (notes: NoteDto[]) => void

  pushOrReplaceDoc: (doc: DocDto) => void
  pushOrReplaceNote: (note: NoteDto) => void

  isLoadingNewDoc: boolean
  setIsLoadingNewDoc: (isLoadingNewDoc: boolean) => void
}

const useDocsStore = create<IDocsStore>((set, get) => ({
  docs: [],
  notes: [],
  hasFirstLoaded: false,

  setDocs: (docs) => {
    set({ docs, hasFirstLoaded: true })
  },

  setNotes: (notes) => {
    set({ notes })
  },

  pushOrReplaceDoc: (doc) => {
    const { docs } = get()
    set({ docs: pushOrReplace(docs, doc, "id") })
  },

  pushOrReplaceNote: (note) => {
    const { notes } = get()
    set({ notes: pushOrReplace(notes, note, "id") })
  },

  isLoadingNewDoc: false,
  setIsLoadingNewDoc: (isLoadingNewDoc) => {
    set({ isLoadingNewDoc })
  },
}))

const initialState = useDocsStore.getState()
export const resetDocsStore = () => {
  useDocsStore.setState(initialState, true)
}

export default useDocsStore
