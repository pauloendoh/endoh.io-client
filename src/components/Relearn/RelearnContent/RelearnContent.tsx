import { Box, Container } from "@mui/material"
import Flex from "components/_UI/Flexboxes/Flex"
import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { ResourceDto } from "../../../types/domain/relearn/ResourceDto"
import { getTodoResources as filterTodo } from "../../../utils/relearn/getTodoResources"
import AddResourceButton from "./AddResourceButton/AddResourceButton"
import ContentHeader from "./ContentHeader/ContentHeader"
import ResourceList from "./ResourceList/ResourceList"

function RelearnContent(props: { resources: ResourceDto[] }) {
  const [tabIndex, setTabIndex] = useState(0)

  const [todo, setTodo] = useState<ResourceDto[]>([])
  const [completed, setCompleted] = useState<ResourceDto[]>([])

  const previousPathnameRef = useRef("")
  const location = useLocation()

  // PE 2/3 - it's not clear if this props.resources is "ALL RESOURCES" or "RESOURCES FROM LIST"
  useEffect(() => {
    // When changing to another tag, go to "TO-DO" resources
    if (location.pathname !== previousPathnameRef.current) {
      setTabIndex(0)
      previousPathnameRef.current = location.pathname
    }

    const todo = filterTodo(props.resources).sort(
      (a, b) => (a.position || 0) - (b.position || 0)
    )

    setTodo(todo)

    const completed = props.resources
      .filter(
        (resource) =>
          resource.rating &&
          (resource.rating > 0 || resource.completedAt.length > 0)
      )
      .sort((resourceA, resourceB) =>
        resourceB.completedAt.localeCompare(resourceA.completedAt)
      )

    setCompleted(completed)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resources])

  return (
    <Container maxWidth="md">
      <ContentHeader
        onTabChange={(newTabIndex) => setTabIndex(newTabIndex)}
        tabIndex={tabIndex}
        todoResources={todo}
        completedResources={completed}
      />

      <Box mt={2}>
        <ResourceList
          resources={tabIndex === 0 ? todo : completed}
          isDraggable={tabIndex === 0}
        />
      </Box>

      {tabIndex === 0 && (
        <Flex mt={2}>
          <AddResourceButton />
        </Flex>
      )}
    </Container>
  )
}

export default RelearnContent
