import { DateTime } from "luxon";
import { ResourceDto } from "../../types/domain/relearn/ResourceDto";
import { TagDto } from "../../types/domain/relearn/TagDto";

export const getLastYearResourcesForChart = (resources: ResourceDto[]) => {
  // only recent resources
  const fromDate = DateTime.local()
    .plus({ days: -365 })
    .set({ hour: 0, minute: 0 });
  const recentResources = resources.filter((r) => {
    const date = DateTime.fromISO(r.completedAt);
    return date > fromDate;
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

  // select the months
  const months: DateTime[] = [];
  for (let i = 12; i >= 0; i--) {
    const month = DateTime.local().plus({ month: i * -1 });
    months.push(month);
  }

  // fill the data of each month { name: "Feb/21", tagId1: 6, tagId3: 4, tagId5: 0 }
  const data = [];
  for (const month of months) {
    const obj: any = {
      name: month.toFormat("LLL/yy"),
    };
    for (const list of lists) {
      obj[list.name] = 0;
    }
    const resourcesFromMonth = recentResources.filter((r) => {
      const completedAt = DateTime.fromISO(r.completedAt);
      return (
        completedAt.month === month.month && completedAt.year === month.year
      );
    });
    for (const resource of resourcesFromMonth) {
      if (resource.tag) {
        obj[resource.tag.name]++;
      }
    }
    data.push(obj);
  }
  return { data: data, lists: lists };
};
