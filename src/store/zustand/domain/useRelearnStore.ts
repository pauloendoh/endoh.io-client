import create, { GetState } from "zustand";
import { devtools, NamedSet } from "zustand/middleware";

interface IRelearnStore {
  selectedResourceIds: number[];
  setSelectedResourceIds: (ids: number[]) => void;
}

const useRelearnStore = create<IRelearnStore>(
  devtools((set: NamedSet<IRelearnStore>, get: GetState<IRelearnStore>) => ({
    selectedResourceIds: [],
    setSelectedResourceIds: (ids) => set({ selectedResourceIds: ids }),
  }))
);

const initialState = useRelearnStore.getState();
export const resetRelearnStore = () => {
  useRelearnStore.setState(initialState, true);
};

export default useRelearnStore;
