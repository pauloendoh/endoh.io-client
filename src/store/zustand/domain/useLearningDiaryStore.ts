import { DateTime } from "luxon";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface ILearningDiaryStore {
  selectedDate: string;
  setSelectedDate: (newValue: string) => void;
}

const useLearningDiaryStore = create<ILearningDiaryStore>(
  devtools((set, get) => ({
    selectedDate: DateTime.now().toISODate(),
    setSelectedDate: (newValue) => {
      set({ selectedDate: newValue });
    },
  }))
);

export default useLearningDiaryStore;
