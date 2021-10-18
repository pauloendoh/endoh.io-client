import { SkillDto } from "../../../types/domain/skillbase/SkillDto";
import { TagDto } from "./../../../interfaces/dtos/relearn/TagDto";
import { SortSkill } from "./../../../store/skillbase/skillbaseTypes";

export default function filterAndSortSkills(
  allSkills: SkillDto[],
  sortBy: SortSkill,
  tag: TagDto | "Untagged"
) {
  let skills = allSkills;

  if (sortBy) {
    const property = sortBy.property;
    const order = sortBy.order;

    if (property === "isPriority") {
      if (order === "asc") {
        skills = skills.sort((a, b) => {
          if (a.isPriority === b.isPriority) return 0;
          if (b.isPriority) return -1;
          return 1;
        });
      } else {
        skills = skills.sort((a, b) => {
          if (a.isPriority === b.isPriority) return 0;
          if (a.isPriority) return -1; // only difference
          return 1;
        });
      }
    } else if (property === "name") {
      if (order === "asc") {
        skills = skills.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        skills = skills.sort((a, b) => b.name.localeCompare(a.name));
      }
    } else if (property === "currentLevel" || property === "goalLevel") {
      if (order === "asc") {
        skills = skills.sort((a, b) => a[property] - b[property]);
      } else {
        skills = skills.sort((a, b) => b[property] - a[property]);
      }
    } else if (property === "dependencies") {
      if (order === "asc") {
        skills = skills.sort(
          (a, b) => a.dependencies.length - b.dependencies.length
        );
      } else {
        skills = skills.sort(
          (a, b) => b.dependencies.length - a.dependencies.length
        );
      }
    } else if (property === "tagId") {
      if (order === "asc") {
        skills = skills.sort((a, b) => a.tagId - b.tagId);
      } else {
        skills = skills.sort((a, b) => b.tagId - a.tagId);
      }
    } else if (property === "expectations") {
      if (order === "asc")
        skills = skills.sort(
          (a, b) => a.expectations.length - b.expectations.length
        );
      else
        skills = skills.sort(
          (a, b) => b.expectations.length - a.expectations.length
        );
    }
  }

  if (tag === "Untagged") {
    skills = skills.filter((s) => s.tagId === null);
  } else if (tag?.id) {
    const tagId = tag.id;
    skills = skills.filter((s) => s.tagId === tagId);
  }

  return skills;
}
