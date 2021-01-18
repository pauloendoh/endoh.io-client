import { Box } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { SkillDto } from '../../../dtos/skillbase/SkillDto'
import { ResourceDto } from "../../../interfaces/dtos/relearn/ResourceDto"
import { ApplicationState } from "../../../store/store"
import { getTodoResources as filterTodo } from "../../../utils/relearn/getTodoResources"
import ContentHeader from "./ContentHeader"
import ResourceList from "./ResourceList/ResourceList"

function RelearnContent(props: Props) {
  const [tabIndex, setTabIndex] = useState(0)

  const [todo, setTodo] = useState<ResourceDto[]>([])
  const [completed, setCompleted] = useState<ResourceDto[]>([])

  useEffect(() => {
    const todo = filterTodo(props.resources).sort(
      (a, b) => a.position - b.position
    )

    setTodo(todo)

    const completed = props.resources
      .filter(
        (resource) => resource.rating > 0 || resource.completedAt.length > 0
      )
      .sort((resourceA, resourceB) =>
        resourceB.completedAt.localeCompare(resourceA.completedAt)
      )

    setCompleted(completed)
  }, [props.resources])

  return (
    <Box m={2} maxWidth={700}>
      <ContentHeader
        onTabChange={(newTabIndex) => setTabIndex(newTabIndex)}
        tabIndex={tabIndex}
        todoResources={todo}
        completedResources={completed}
        skills={props.skills}
      />
      <Box mt={12} />
      <ResourceList resources={tabIndex === 0 ? todo : completed} />
    </Box>
  )
}

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  resources: ResourceDto[], 
  skills: SkillDto[]
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(RelearnContent)
