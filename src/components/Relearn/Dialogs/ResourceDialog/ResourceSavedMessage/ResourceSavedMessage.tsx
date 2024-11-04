import { Link as RouterLink } from "react-router-dom"

import { Link, Typography } from "@mui/material"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import useResourceDialogStore from "store/zustand/domain/resources/useResourceDialogStore"
import { ResourceDto } from "types/domain/relearn/ResourceDto"
import { urls } from "utils/urls"

type Props = {
  resource: ResourceDto
}

const ResourceSavedMessage = (props: Props) => {
  const { setInitialValue: setEditingResource } = useResourceDialogStore()
  const { currentTagId } = useRelearnStore()

  return (
    <Typography>
      Resource saved! Open{" "}
      <Link
        onClick={() => {
          setEditingResource(props.resource)
        }}
        color="inherit"
        sx={{
          cursor: "pointer",
        }}
      >
        resource
      </Link>
      {props.resource.tag?.id &&
        currentTagId &&
        props.resource.tag.id !== currentTagId && (
          <>
            {" "}
            or{" "}
            <Link
              component={RouterLink}
              color="inherit"
              to={urls.pages.resources.tagId(props.resource.tag!.id!)}
              onClick={() => {
                console.log({
                  currentTagId,
                  tagId: props.resource.tag?.id,
                })
              }}
            >
              tag
            </Link>
          </>
        )}
    </Typography>
  )
}

export default ResourceSavedMessage
