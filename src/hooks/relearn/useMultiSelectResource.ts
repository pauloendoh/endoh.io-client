import useRelearnStore from "store/zustand/domain/useRelearnStore";

const useMultiSelectResource = () => {
  const { selectedResourceIds, setSelectedResourceIds } = useRelearnStore();

  const onCtrlClick = (resourceId: number) => {
    const ids = [...selectedResourceIds];

    // remove
    if (selectedResourceIds.includes(resourceId))
      setSelectedResourceIds(ids.filter((id) => id !== resourceId));
    // add
    else setSelectedResourceIds([...ids, resourceId]);
  };

  const idIsSelected = (resourceId: number) =>
    selectedResourceIds.includes(resourceId);

  const clearSelectedIds = () => setSelectedResourceIds([]);

  const onShiftClick = (resourceIds: number[], selectedId: number) => {
    if (selectedResourceIds.length === 0) {
      setSelectedResourceIds([selectedId]);
      return;
    }

    if (
      selectedResourceIds.length === 1 &&
      selectedResourceIds[0] === selectedId
    ) {
      setSelectedResourceIds([]);
      return;
    }

    if (selectedResourceIds.includes(selectedId)) {
      setSelectedResourceIds([selectedId]);
      return;
    }

    const firstSelectedIdx = resourceIds.findIndex((id) =>
      selectedResourceIds.includes(id)
    );
    const lastSelectedId = [...resourceIds]
      .reverse()
      .find((id) => selectedResourceIds.includes(id));
    const lastSelectedIdx = [...resourceIds].findIndex(
      (id) => id === lastSelectedId
    );

    const clickedIdx = [...resourceIds].findIndex((id) => id === selectedId);

    const finalIds = resourceIds.filter((_, idx) => {
      if (firstSelectedIdx < clickedIdx)
        return idx >= firstSelectedIdx && idx <= clickedIdx;

      return idx >= clickedIdx && idx <= lastSelectedIdx;
    });

    setSelectedResourceIds(finalIds);
  };

  return { onCtrlClick, onShiftClick, idIsSelected, clearSelectedIds };
};

export default useMultiSelectResource;
