import { DateTime } from "luxon"
import create from "zustand"
import { devtools } from "zustand/middleware"

interface ILearningDiaryStore {
  selectedDate: string
  setSelectedDate: (newValue: string) => void

  topPercentage: number
  setTopPercentage: (newValue: number) => void
}

const useLearningDiaryStore = create<ILearningDiaryStore>(
  devtools((set, get) => ({
    selectedDate: DateTime.now().toISODate(),
    setSelectedDate: (newValue) => {
      set({ selectedDate: newValue })
    },
    topPercentage: 50,
    setTopPercentage: (newValue) => {
      set({ topPercentage: newValue })
    },
  }))
)

export default useLearningDiaryStore
