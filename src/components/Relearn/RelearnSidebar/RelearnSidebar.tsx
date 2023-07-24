import { List } from "@mui/material"
import { useEffect, useState } from "react"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import { TagDto } from "../../../types/domain/relearn/TagDto"
import MySidebar from "../../_UI/MySidebar/MySidebar"
import RelearnSidebarTagList from "./RelearnSidebarTagList/RelearnSidebarTagList"

function RelearnSidebar() {
  const { tags } = useRelearnStore()

  const [publicLists, setPublicLists] = useState<TagDto[]>([])
  const [privateLists, setPrivateLists] = useState<TagDto[]>([])
  useEffect(() => {
    setPublicLists(tags.filter((t) => t.isPrivate === false))
    setPrivateLists(tags.filter((t) => t.isPrivate === true))
  }, [tags])

  return (
    <MySidebar>
      <List disablePadding>
        <RelearnSidebarTagList type="public" tags={publicLists} />
        <RelearnSidebarTagList type="private" tags={privateLists} />
      </List>
    </MySidebar>
  )
}

export default RelearnSidebar
