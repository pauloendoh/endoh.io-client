import { useTheme } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import MyImage from "components/_UI/images/MyImage"
import Txt from "components/_UI/Text/Txt"
import { DateTime } from "luxon"
import { useMemo } from "react"
import { useLocation } from "react-router-dom"
import { ResourceDto } from "types/domain/relearn/ResourceDto"
import { useGetColorByRating } from "utils/relearn/getColorByRating"
import Icons from "utils/styles/Icons"
import { urls } from "utils/urls"

type Props = {
  resource: ResourceDto
  handleClick: () => void
  htmlProps: React.HTMLAttributes<HTMLLIElement>
}

const ResourcesSearchBarOption = ({
  resource,
  handleClick,
  htmlProps,
}: Props) => {
  const theme = useTheme()

  const location = useLocation()

  const daysAgoStr = useMemo(() => {
    if (resource?.completedAt.length === 0) return ""
    const completed = DateTime.fromISO(resource.completedAt)
    const now = DateTime.now()
    const diff = now.diff(completed, ["days"])
    const days = Math.floor(diff.days)
    if (days === 0) return "today"
    return `${days}d ago`
  }, [resource.completedAt])

  const color = useGetColorByRating(resource.rating)

  return (
    <li
      {...htmlProps}
      style={{
        justifyContent: "space-between",
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
      onClick={handleClick}
      onMouseDown={(e) => {
        if (e.button === 1)
          window
            .open(
              urls.pages.openResourceId(resource.id, location.pathname),
              "_blank"
            )
            .focus()
      }}
    >
      {resource.thumbnail?.length ? (
        <MyImage
          src={resource.thumbnail}
          style={{ width: 50 }}
          alt={`search-preview-thumbnail: ${resource.title}`}
        />
      ) : (
        <div style={{ minWidth: 50 }} />
      )}
      <Txt noWrap style={{ width: 350, marginLeft: 8 }} title={resource.title}>
        {resource.title}
      </Txt>
      <FlexVCenter style={{ gap: theme.spacing(2) }}>
        {resource.rating > 0 ? (
          <FlexVCenter style={{ width: 125, gap: theme.spacing(2) }}>
            <FlexVCenter style={{ gap: theme.spacing(0.5) }}>
              <Icons.Star style={{ color }} />
              <Txt>{resource.rating}</Txt>
            </FlexVCenter>

            <Txt
              noWrap
              title={DateTime.fromISO(resource.completedAt).toLocaleString()}
            >
              {daysAgoStr}
            </Txt>
          </FlexVCenter>
        ) : (
          <div style={{ width: 125 }} />
        )}

        {resource.tag && (
          <FlexVCenter style={{ gap: theme.spacing(0.5) }}>
            <Icons.Label style={{ color: resource.tag.color }} />
            <Txt noWrap style={{ width: 125 }}>
              {resource.tag.name}
            </Txt>
          </FlexVCenter>
        )}
      </FlexVCenter>
    </li>
  )
}

export default ResourcesSearchBarOption
