import { DocDto } from "types/domain/define/DocDto"
import create from "zustand"
import { devtools, NamedSet } from "zustand/middleware"

interface IFlashnotesStore {
  fileDialogParentFolderId: number
  setFileDialogParentFolderId: (parentFolderId: number) => void

  selectedDoc: DocDto
  setSelectedDoc: (file: DocDto) => void

  expandedNodes: string[]
  toggleNode: (nodeId: string) => void
  setExpandedNodes: (nodeIds: string[]) => void
}

const useFlashnotesStore = create<IFlashnotesStore>(
  devtools(
    (set: NamedSet<IFlashnotesStore>, get) => ({
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
    }),
    "@FileSystemStore"
  )
)

export default useFlashnotesStore
