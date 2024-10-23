import { Typography } from "@mui/material"
import useResourceDialogStore from "store/zustand/domain/resources/useResourceDialogStore"
import { ResourceDto } from "types/domain/relearn/ResourceDto"

type Props = {
  resource: ResourceDto
}

const ResourceSavedMessage = (props: Props) => {
  const { setInitialValue: setEditingResource } = useResourceDialogStore()
  return (
    <Typography>
      Resource saved!{" "}
      <span
        role="button"
        style={{
          cursor: "pointer",
          fontWeight: 500,
        }}
        onClick={() => {
          setEditingResource(props.resource)
        }}
      >
        Open
      </span>
    </Typography>
  )
}

export default ResourceSavedMessage
