import { DocDto } from "types/domain/questions/DocDto"
import { QuestionDto } from "types/domain/questions/QuestionDto"
import { pushOrReplace } from "utils/array/pushOrReplace"
import { create } from "zustand"

interface IDocsStore {
  docs: DocDto[]
  questions: QuestionDto[]
  hasFirstLoaded: boolean

  setDocs: (docs: DocDto[]) => void
  setQuestions: (questions: QuestionDto[]) => void

  pushOrReplaceDoc: (doc: DocDto) => void
  pushOrReplaceQuestion: (question: QuestionDto) => void

  isLoadingNewDoc: boolean
  setIsLoadingNewDoc: (isLoadingNewDoc: boolean) => void
}

const useDocsStore = create<IDocsStore>((set, get) => ({
  docs: [],
  questions: [],
  hasFirstLoaded: false,

  setDocs: (docs) => {
    set({ docs, hasFirstLoaded: true })
  },

  setQuestions: (question) => {
    set({ questions: question })
  },

  pushOrReplaceDoc: (doc) => {
    const { docs } = get()
    set({ docs: pushOrReplace(docs, doc, "id") })
  },

  pushOrReplaceQuestion: (question) => {
    const { questions } = get()
    set({ questions: pushOrReplace(questions, question, "id") })
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
