import { Typography } from "@mui/material"
import useResourceDialogStore from "store/zustand/domain/resources/useResourceDialogStore"
import { ResourceDto } from "types/domain/relearn/ResourceDto"

type Props = {
  allResources: ResourceDto[]
}

const ResourceSavedMessage = (props: Props) => {
  const { setInitialValue: setEditingResource } = useResourceDialogStore()
  return (
    <Typography>
      Resource saved!{" "}
      <span
        style={{
          cursor: "pointer",
          fontWeight: 500,
        }}
        onClick={() => {
          const newestResource = props.allResources.sort((a, b) =>
            b.updatedAt.localeCompare(a.updatedAt)
          )[0]
          setEditingResource(
            props.allResources.find((r) => r.id === newestResource.id) || null
          )
        }}
      >
        Open
      </span>
    </Typography>
  )
}

export default ResourceSavedMessage
