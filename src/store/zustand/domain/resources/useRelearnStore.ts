import { upsert } from "endoh-utils"
import { IMoveResource } from "types/domain/relearn/IMoveResource"
import { ResourceDto } from "types/domain/relearn/ResourceDto"
import { TagDto } from "types/domain/relearn/TagDto"
import myAxios from "utils/consts/myAxios"
import { urls } from "utils/urls"
import { create } from "zustand"

interface IStore {
  resources: ResourceDto[]
  hasFirstLoaded: boolean
  tags: TagDto[]

  editingTag: TagDto | null
  currentTagId: number | null
  setCurrentTagId: (tagId: number | null) => void

  setResources: (resources: ResourceDto[]) => void
  pushOrReplaceResource: (resource: ResourceDto) => void
  setTags: (tags: TagDto[]) => void
  removeResource: (id: number) => void
  removeTag: (id: number) => void

  setEditingTag: (tag: TagDto | null) => void
  moveResource: (data: IMoveResource) => void

  selectedResourceIds: number[]
  setSelectedResourceIds: (ids: number[]) => void
}

const useRelearnStore = create<IStore>((set, get) => ({
  resources: [],
  hasFirstLoaded: false,
  tags: [],
  editingTag: null,

  currentTagId: null,
  setCurrentTagId: (tagId) => set({ currentTagId: tagId }),

  setResources: (resources) => set({ resources, hasFirstLoaded: true }),
  pushOrReplaceResource: (resource) => {
    set((state) => {
      return {
        ...state,
        resources: upsert(
          state.resources,
          resource,
          (a) => a.id === resource.id
        ),
      }
    })
  },
  setTags: (tags) => set({ tags }),
  removeResource: (id) => {
    set((state) => ({
      resources: state.resources.filter((resource) => resource.id !== id),
    }))
  },
  removeTag: (tagId) => {
    set((state) => ({
      tags: state.tags.filter((tag) => tag.id !== tagId),
      resources: state.resources.filter(
        (resource) => resource.tag?.id !== tagId
      ),
    }))
  },

  setEditingTag: (tag) => set({ editingTag: tag }),

  moveResource: (params) => {
    const currentResources = get().resources
    const newResources = _moveResource(currentResources, params)
    set({ resources: newResources })
  },

  selectedResourceIds: [],
  setSelectedResourceIds: (ids) => set({ selectedResourceIds: ids }),
}))

const initialState = useRelearnStore.getState()
export const resetRelearnStore = () => {
  useRelearnStore.setState(initialState, true)
}

export default useRelearnStore

let throttle: NodeJS.Timeout | null = null

const _moveResource = (
  initialResources: ResourceDto[],
  params: IMoveResource
): ResourceDto[] => {
  let resources = initialResources
    .filter((resource) => {
      if (params.tagId === null && resource.tag === null) return true
      if (params.tagId === resource.tag?.id) return true
      return false
    })
    .filter((resource) => resource.completedAt.length === 0)

  // sort them by position
  resources = resources.sort(
    (resourceA, resourceB) =>
      Number(resourceA.position) - Number(resourceB.position)
  )

  // give each position its index
  resources = resources.map((resource, index) => {
    resource.position = index
    return resource
  })

  // do splices
  const dragged = resources[params.fromIndex]
  resources.splice(params.fromIndex, 1)
  resources.splice(params.toIndex, 0, dragged)

  // give each position its index
  resources = resources.map((resource, index) => {
    resource.position = index
    return resource
  })

  // Saving changes at database (1s throttle)
  if (throttle !== null) clearTimeout(throttle)
  throttle = setTimeout(() => {
    myAxios
      .post(urls.api.relearn.resource + "/resources", resources)
      .then((res) => {})
      .catch((err) => {
        alert("Error while saving new position.")
      })
  }, 1000)

  // concat to the other resources
  const resourcesIds = resources.map((resource) => resource.id)
  const otherResources = initialResources.filter(
    (resource) => !resourcesIds.includes(resource.id)
  )
  const allResources = otherResources.concat(resources)
  return allResources
}
