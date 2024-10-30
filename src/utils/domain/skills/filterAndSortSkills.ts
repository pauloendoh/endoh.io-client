import { calculateSkillExperience } from "components/Skillbase/SkillTable/calculateSkillExperience/calculateSkillExperience"
import multiwordSearch from "endoh-utils/dist/text/multiwordSearch"
import { TagDto } from "../../../types/domain/relearn/TagDto"
import { ISortSkillBy } from "../../../types/domain/skillbase/ISortSkillBy"
import { SkillDto } from "../../../types/domain/skillbase/SkillDto"
import skillIsIncompleted from "./skillIsIncompleted"

// PE 2/3 - remove default
export default function filterAndSortSkills(
  allSkills: SkillDto[],
  sortBy: ISortSkillBy,
  tag: TagDto | "Untagged", // PE 1/3 - remove this parameter + use object parameter
  hidingDone: boolean,
  labelIds: number[],
  byText: string,
  onlyWithCurrentGoal: boolean
) {
  let skills = allSkills

  if (sortBy) {
    const property = sortBy.property
    const order = sortBy.order

    if (property === "isPriority") {
      if (order === "asc") {
        skills = skills.sort((a, b) => {
          if (a.isPriority === b.isPriority) return 0
          if (b.isPriority) return -1
          return 1
        })
      } else {
        skills = skills.sort((a, b) => {
          if (a.isPriority === b.isPriority) return 0
          if (a.isPriority) return -1 // only difference
          return 1
        })
      }
    } else if (property === "name") {
      if (order === "asc") {
        skills = skills.sort((a, b) => a.name.localeCompare(b.name))
      } else {
        skills = skills.sort((a, b) => b.name.localeCompare(a.name))
      }
    } else if (property === "currentLevel" || property === "goalLevel") {
      if (order === "asc") {
        skills = skills.sort((a, b) => (a[property] || 0) - (b[property] || 0))
      } else {
        skills = skills.sort((a, b) => (b[property] || 0) - (a[property] || 0))
      }
    } else if (property === "priority") {
      if (order === "asc") {
        skills = skills.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
      } else {
        skills = skills.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
      }
    } else if (property === "dependencies") {
      if (order === "asc") {
        skills = skills.sort(
          (a, b) => a.dependencies.length - b.dependencies.length
        )
      } else {
        skills = skills.sort(
          (a, b) => b.dependencies.length - a.dependencies.length
        )
      }
    } else if (property === "tagId") {
      if (order === "asc") {
        skills = skills.sort((a, b) => (a.tagId || 0) - (b.tagId || 0))
      } else {
        skills = skills.sort((a, b) => (b.tagId || 0) - (a.tagId || 0))
      }
    } else if (property === "expectations") {
      if (order === "asc")
        skills = skills.sort(
          (a, b) => a.expectations.length - b.expectations.length
        )
      else
        skills = skills.sort(
          (a, b) => b.expectations.length - a.expectations.length
        )
    } else if (property === "skillExperience") {
      if (order === "asc") {
        skills = skills.sort(
          (a, b) => calculateSkillExperience(a) - calculateSkillExperience(b)
        )
      } else {
        skills = skills.sort(
          (a, b) => calculateSkillExperience(b) - calculateSkillExperience(a)
        )
      }
    }
  }

  if (byText.length > 0) {
    return skills.filter((skill) => multiwordSearch(skill.name, byText))
  }

  if (hidingDone)
    // show only incompleted skills
    skills = skills.filter(skillIsIncompleted)

  if (labelIds.length > 0)
    skills = skills.filter((skill) => {
      const skillLabelIds = skill.labels?.map((l) => l.id) || []
      return labelIds.every((labelId) => skillLabelIds.includes(labelId))
    })

  if (onlyWithCurrentGoal)
    skills = skills.filter((skill) =>
      skill.expectations.some((e) => e.isCurrentGoal)
    )

  return skills
}
