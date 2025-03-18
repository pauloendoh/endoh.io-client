import { List } from "@mui/material"
import { useEffect, useState } from "react"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import { TagDto } from "../../../types/domain/relearn/TagDto"
import MySidebar from "../../_UI/MySidebar/MySidebar"
import RelearnSidebarTags from "./RelearnSidebarTags/RelearnSidebarTags"

function RelearnSidebar() {
  const { tags } = useRelearnStore()

  const [publicTags, setPublicTags] = useState<TagDto[]>([])
  const [privateTags, setPrivateTags] = useState<TagDto[]>([])

  useEffect(() => {
    setPublicTags(tags.filter((t) => t.isPrivate === false))
    setPrivateTags(tags.filter((t) => t.isPrivate === true))
  }, [tags])

  return (
    <MySidebar>
      <List disablePadding>
        <RelearnSidebarTags type="public" tags={publicTags} />
        <RelearnSidebarTags type="private" tags={privateTags} />
      </List>
    </MySidebar>
  )
}

export default RelearnSidebar
