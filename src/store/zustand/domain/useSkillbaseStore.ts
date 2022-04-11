import { pushOrRemove } from "utils/array/pushOrRemove";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface ISkillbaseStore {
  filter: {
    labelIds: number[];
  };
  filterLabelIds: (ids: number[]) => void;
  toggleFilterLabelId: (id: number) => void;
  labelIdIsInFilter: (id: number) => boolean;
  toggleAllLabelIds: (availableLabelIds: number[]) => void;
  allLabelsAreInFilter: (availableLabelIds: number[]) => boolean;
}

const useSkillbaseStore = create<ISkillbaseStore>(
  devtools((set, get) => ({
    filter: {
      labelIds: [],
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
    toggleAllLabelIds: (availableLabelIds) => {
      const { filter, allLabelsAreInFilter } = get();

      const newLabelIds = allLabelsAreInFilter(availableLabelIds)
        ? []
        : availableLabelIds;

      set({
        filter: {
          ...filter,
          labelIds: newLabelIds,
        },
      });
    },
    allLabelsAreInFilter: (availableLabelIds) => {
      const { filter } = get();

      return availableLabelIds.every((id) => filter.labelIds.includes(id));
    },
  }))
);

const initialState = useSkillbaseStore.getState();
export const resetSkillbaseStore = () => {
  useSkillbaseStore.setState(initialState, true);
};

export default useSkillbaseStore;