import { Typography } from "@mui/material"
import useRelearnStore from "store/zustand/domain/useRelearnStore"
import { ResourceDto } from "types/domain/relearn/ResourceDto"

type Props = {
  allResources: ResourceDto[]
}

const ResourceSavedMessage = (props: Props) => {
  const { setEditingResource } = useRelearnStore()
  return (
    <Typography>
      Resource saved!{" "}
      <b
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          const newestResource = props.allResources.sort((a, b) =>
            b.createdAt.localeCompare(a.createdAt)
          )[0]
          setEditingResource(
            props.allResources.find((r) => r.id === newestResource.id)
          )
        }}
      >
        Open it?
      </b>
    </Typography>
  )
}

export default ResourceSavedMessage