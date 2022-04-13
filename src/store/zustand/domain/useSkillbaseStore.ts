import { pushOrRemove } from "utils/array/pushOrRemove";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface ISkillbaseStore {
  filter: {
    byText: string;
    labelIds: number[];
    hidingDone: boolean;
    currentGoal: boolean;
  };

  getFilterCount: () => number;
  filterLabelIds: (ids: number[]) => void;
  toggleFilterLabelId: (id: number) => void;
  labelIdIsInFilter: (id: number) => boolean;

  setFilterByText: (text: string) => void;
  toggleHidingDone: () => void;
  toggleFilterCurrentGoal: () => void;
}

const useSkillbaseStore = create<ISkillbaseStore>(
  devtools((set, get) => ({
    filter: {
      hidingDone: false,
      byText: "",
      labelIds: [],
      currentGoal: false,
    },

    getFilterCount: () => {
      const { labelIds, hidingDone } = get().filter;
      let count = labelIds.length;
      if (hidingDone) count++;
      return count;
    },
    filterLabelIds: (ids) => {
      set((prev) => ({
        ...prev,
        filter: {
          ...prev.filter,
          labelIds: ids,
        },
      }));
    },
    toggleFilterLabelId: (id) => {
      const { filter } = get();
      const newLabelIds = pushOrRemove(filter.labelIds, id);

      set({
        filter: {
          ...filter,
          labelIds: newLabelIds,
        },
      });
    },

    labelIdIsInFilter: (id) => {
      return get().filter.labelIds.includes(id);
    },

    setFilterByText: (text) => {
      set((prev) => ({
        ...prev,
        filter: {
          ...prev.filter,
          byText: text,
        },
      }));
    },
    toggleHidingDone: () => {
      const { filter } = get();

      set({
        filter: {
          ...filter,
          hidingDone: !filter.hidingDone,
        },
      });
    },
    toggleFilterCurrentGoal: () => {
      const { filter } = get();

      set({
        filter: {
          ...filter,
          currentGoal: !filter.currentGoal,
        },
      });
    },
  }))
);

const initialState = useSkillbaseStore.getState();
export const resetSkillbaseStore = () => {
  useSkillbaseStore.setState(initialState, true);
};

export default useSkillbaseStore;
