import { DateTime } from "luxon"
import { FeedResourceDto } from "types/domain/feed/FeedResourceDto"
import { TagDto } from "../../types/domain/relearn/TagDto"

export const getLastYearResourcesForChart = (resources: FeedResourceDto[]) => {
  // only recent resources
  const fromDate = DateTime.local()
    .plus({ days: -365 })
    .set({ hour: 0, minute: 0 })
  const recentResources = resources.filter((r) => {
    const date = DateTime.fromISO(r.completedAt)
    return date > fromDate
  })

  const tags: TagDto[] = []
  const tagIds: number[] = []
  for (const resource of recentResources) {
    if (resource.tag && !tagIds.includes(resource.tag.id)) {
      tagIds.push(resource.tag.id)
      tags.push(resource.tag)
    }
  }
  tags.concat(tags)

  // select the months
  const months: DateTime[] = []
  for (let i = 12; i >= 0; i--) {
    const month = DateTime.local().plus({ month: i * -1 })
    months.push(month)
  }

  // fill the data of each month { name: "Feb/21", tagId1: 6, tagId3: 4, tagId5: 0 }
  const data = []
  for (const month of months) {
    const obj: any = {
      name: month.toFormat("LLL/yy"),
    }
    for (const tag of tags) {
      obj[tag.name] = 0
    }
    const resourcesFromMonth = recentResources.filter((r) => {
      const completedAt = DateTime.fromISO(r.completedAt)
      return (
        completedAt.month === month.month && completedAt.year === month.year
      )
    })
    for (const resource of resourcesFromMonth) {
      if (resource.tag) {
        obj[resource.tag.name]++
      }
    }
    data.push(obj)
  }

  return { data: data, tags: tags }
}
