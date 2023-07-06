import { ISortSkillBy } from "types/domain/skillbase/ISortSkillBy"
import { SkillDto } from "types/domain/skillbase/SkillDto"
import { SkillExpectationDto } from "types/domain/skillbase/SkillExpectationDto"
import { pushOrRemove } from "utils/array/pushOrRemove"
import { create } from "zustand"

interface ISkillbaseStore {
  skills: SkillDto[]
  hasFirstLoaded: boolean
  sortBy: ISortSkillBy
  editingSkill: SkillDto

  setSkills: (skills: SkillDto[]) => void
  setEditingSkill: (skill: SkillDto) => void
  sortSkill: (sortBy: ISortSkillBy) => void
  removeSkills: (ids: number[]) => void

  isEditingRoadmapItem: boolean
  setIsEditingRoadmapItem: (value: boolean) => void

  // filter
  filter: {
    byText: string
    labelIds: number[]
    hidingDone: boolean
    currentGoal: boolean
  }

  getFilterCount: () => number
  filterLabelIds: (ids: number[]) => void
  toggleFilterLabelId: (id: number) => void
  labelIdIsInFilter: (id: number) => boolean

  setFilterByText: (text: string) => void
  toggleHidingDone: () => void
  toggleFilterCurrentGoal: () => void

  // drag and drop
  draggingExpectation: SkillExpectationDto
  setDraggingExpectation: (expectation: SkillExpectationDto) => void
}

const useSkillbaseStore = create<ISkillbaseStore>((set, get) => ({
  skills: [],
  hasFirstLoaded: false,
  sortBy: { property: "goalLevel", order: "desc" },
  editingSkill: null,

  sidebarIsOpen: false,
  setSkills: (skills) => {
    set({ skills, hasFirstLoaded: true })
  },
  setEditingSkill: (skill) => {
    set({ editingSkill: skill })
  },
  sortSkill: (sortBy) => {
    set({ sortBy })
  },

  isEditingRoadmapItem: false,
  setIsEditingRoadmapItem: (value) => {
    set({ isEditingRoadmapItem: value })
  },
  // --------------- FILTER
  filter: {
    hidingDone: false,
    byText: "",
    labelIds: [],
    currentGoal: false,
  },
  removeSkills: (idsToRemove) => {
    const skillsToKeep = [...get().skills].filter(
      (skill) => !idsToRemove.includes(skill.id)
    )
    set({ skills: skillsToKeep })
  },

  getFilterCount: () => {
    const { labelIds, hidingDone, currentGoal } = get().filter
    let count = labelIds.length
    if (hidingDone) count++
    if (currentGoal) count++

    return count
  },
  filterLabelIds: (ids) => {
    set((prev) => ({
      ...prev,
      filter: {
        ...prev.filter,
        labelIds: ids,
      },
    }))
  },
  toggleFilterLabelId: (id) => {
    const { filter } = get()
    const newLabelIds = pushOrRemove(filter.labelIds, id)

    set({
      filter: {
        ...filter,
        labelIds: newLabelIds,
      },
    })
  },

  labelIdIsInFilter: (id) => {
    return get().filter.labelIds.includes(id)
  },

  setFilterByText: (text) => {
    set((prev) => ({
      ...prev,
      filter: {
        ...prev.filter,
        byText: text,
      },
    }))
  },
  toggleHidingDone: () => {
    const { filter } = get()

    set({
      filter: {
        ...filter,
        hidingDone: !filter.hidingDone,
      },
    })
  },
  toggleFilterCurrentGoal: () => {
    const { filter } = get()

    set({
      filter: {
        ...filter,
        currentGoal: !filter.currentGoal,
      },
    })
  },

  draggingExpectation: null,
  setDraggingExpectation: (expectation) => {
    set({
      draggingExpectation: expectation,
    })
  },
}))

const initialState = useSkillbaseStore.getState()
export const resetSkillbaseStore = () => {
  useSkillbaseStore.setState(initialState, true)
}

export default useSkillbaseStore
