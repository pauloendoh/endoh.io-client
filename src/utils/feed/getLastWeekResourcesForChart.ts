import { DateTime } from "luxon";
import { ResourceDto } from "../../types/domain/relearn/ResourceDto";
import { TagDto } from "../../types/domain/relearn/TagDto";

export const getLastWeekResourcesForChart = (resources: ResourceDto[]) => {
  // only recent resources
  const fromDate = DateTime.local()
    .plus({ days: -7 })
    .set({ hour: 0, minute: 0 });
  const toDate = DateTime.local()
    .plus({ days: 0 })
    .set({ hour: 23, minute: 59 });
  const recentResources = resources.filter((r) => {
    const date = DateTime.fromISO(r.completedAt);
    return date > fromDate && date < toDate;
  });

  // get list ids
  const lists: TagDto[] = [];
  const listIds: number[] = [];
  for (const resource of recentResources) {
    if (resource.tag && !listIds.includes(resource.tag.id)) {
      listIds.push(resource.tag.id);
      lists.push(resource.tag);
    }
  }
  lists.concat(lists);

  // select the days
  const days: DateTime[] = [];
  for (let i = 7; i >= 0; i--) {
    const day = DateTime.local()
      .plus({ days: i * -1 })
      .set({ hour: 0, minute: 0 });
    days.push(day);
  }

  // fill the data of each day { name: "Tue", tagId1: 6, tagId3: 4, tagId5: 0 }
  const data = [];
  for (const day of days) {
    const obj: any = {
      name: day.toFormat("ccc"),
    };
    for (const list of lists) {
      obj[list.name] = 0;
    }
    const resourcesFromDay = recentResources.filter((r) => {
      const completedAt = DateTime.fromISO(r.completedAt);
      return completedAt.day === day.day;
    });
    for (const resource of resourcesFromDay) {
      if (resource.tag) {
        obj[resource.tag.name]++;
      }
    }
    data.push(obj);
  }
  return { data: data, lists: lists };
};
