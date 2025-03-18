import { Tab, Tabs } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { useMemo } from "react"
import { FeedResourceDto } from "types/domain/feed/FeedResourceDto"

type Props = {
  value: "completed" | "bookmarked"
  onChange: (value: "completed" | "bookmarked") => void
  resources?: FeedResourceDto[]
  completedLabel?: string
}

const CompletedBookmarkedTabs = ({ ...props }: Props) => {
  const tabIndex = useMemo(() => {
    return props.value === "completed" ? 0 : 1
  }, [props.value])

  const completedCount = useMemo(() => {
    return props.resources?.filter((r) => !!r.rating).length ?? null
  }, [props.resources])

  const bookmarkedCount = useMemo(() => {
    return props.resources?.filter((r) => !r.rating).length ?? null
  }, [props.resources])

  return (
    <FlexVCenter>
      <Tabs
        value={tabIndex}
        onChange={(_, newValue: number) => {
          props.onChange(newValue === 0 ? "completed" : "bookmarked")
        }}
      >
        <Tab
          label={`${completedCount ?? ""} ${
            props.completedLabel ?? "Completed"
          }`}
        />
        <Tab label={`${bookmarkedCount ?? ""} Bookmarked`} />
      </Tabs>
    </FlexVCenter>
  )
}

export default CompletedBookmarkedTabs
