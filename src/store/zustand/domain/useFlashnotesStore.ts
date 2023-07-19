import { DocDto } from "types/domain/questions/DocDto"
import { create } from "zustand"

interface IStore {
  fileDialogParentFolderId: number | null
  setFileDialogParentFolderId: (parentFolderId: number | null) => void

  selectedDoc: DocDto | null
  setSelectedDoc: (file: DocDto) => void

  expandedNodes: string[]
  toggleNode: (nodeId: string) => void
  setExpandedNodes: (nodeIds: string[]) => void
}

const useFlashnotesStore = create<IStore>((set, get) => ({
  fileDialogParentFolderId: null,
  setFileDialogParentFolderId: (parentFolderId) => {
    set({ fileDialogParentFolderId: parentFolderId })
  },

  selectedDoc: null,
  setSelectedDoc: (selectedDoc) => {
    set({ selectedDoc })
  },

  expandedNodes: [],
  toggleNode: (nodeId) => {
    const { expandedNodes } = get()
    if (expandedNodes.includes(nodeId))
      // remove
      set({
        expandedNodes: expandedNodes.filter(
          (expandedNodeId) => expandedNodeId !== nodeId
        ),
      })
    else {
      // add
      set({ expandedNodes: [...expandedNodes, nodeId] })
    }
  },
  setExpandedNodes: (nodeIds: string[]) => {
    set({ expandedNodes: nodeIds })
  },
}))

export default useFlashnotesStore
