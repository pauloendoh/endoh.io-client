import { Box } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { ResourceDto } from "../../../interfaces/dtos/relearn/ResourceDto"
import { ApplicationState } from "../../../store/store"
import { getTodoResources } from "../../../utils/relearn/getTodoResources"
import ContentHeader from "./ContentHeader"
import ResourceList from "./ResourceList/ResourceList"

function RelearnContent(props: Props) {
  const [tabIndex, setTabIndex] = useState(0)

  const [todoResources, setTodoResources] = useState<ResourceDto[]>([])
  const [completedResources, setCompletedResources] = useState<ResourceDto[]>(
    []
  )

  useEffect(() => {
    const todo = getTodoResources(props.resources).sort(
      (resourceA, resourceB) => resourceA.position - resourceB.position
    )

    setTodoResources(todo)

    const completed = props.resources
      .filter(
        (resource) => resource.rating > 0 || resource.completedAt.length > 0
      )
      .sort((resourceA, resourceB) =>
        resourceB.completedAt.localeCompare(resourceA.completedAt)
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
      <Box mt={12} />
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
