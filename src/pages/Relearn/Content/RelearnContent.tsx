import { Box, Container } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { ResourceDto } from "../../../dtos/relearn/ResourceDto"
import { ApplicationState } from "../../../store/store"
import ResourceList from "./ResourceList/ResourceList"
import ContentHeader from "./ContentHeader"

function RelearnContent(props: Props) {
  const [tabIndex, setTabIndex] = useState(0)

  const [todoResources, setTodoResources] = useState<ResourceDto[]>([])
  const [completedResources, setCompletedResources] = useState<ResourceDto[]>(
    []
  )

  useEffect(() => {
    const todo = props.resources.filter(
      (resource) => resource.rating === 0 && !resource.isCompleted
    )
    setTodoResources(todo)

    const completed = props.resources.filter(
      (resource) => resource.rating > 0 || resource.isCompleted
    )
    setCompletedResources(completed)
  }, [props.resources])

  return (
    <Box m={2} maxWidth={700}>
        <ContentHeader
          onTabChange={(newTabIndex) => setTabIndex(newTabIndex)}
          tabIndex={tabIndex}
          todoResources={todoResources}
          completedResources={completedResources}
        />
        <Box mt={3} />
        <ResourceList
          resources={tabIndex === 0 ? todoResources : completedResources}
        />
    </Box>
  )
}

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  resources: ResourceDto[]
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(RelearnContent)
