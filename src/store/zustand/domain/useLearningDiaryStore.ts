import { DateTime } from "luxon"
import { create } from "zustand"

interface IStore {
  selectedDate: string
  setSelectedDate: (newValue: string) => void

  topPercentage: number
  setTopPercentage: (newValue: number) => void
}

const useLearningDiaryStore = create<IStore>((set, get) => ({
  selectedDate: DateTime.now().toISODate(),
  setSelectedDate: (newValue) => {
    set({ selectedDate: newValue })
  },
  topPercentage: 50,
  setTopPercentage: (newValue) => {
    set({ topPercentage: newValue })
  },
}))

export default useLearningDiaryStore
