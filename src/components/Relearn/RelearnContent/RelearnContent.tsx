import { Box, Container } from "@mui/material"
import Flex from "components/_UI/Flexboxes/Flex"
import { useTagQueryUtils } from "hooks/react-query/relearn/useTagQueryUtils"
import { useMyPathParams } from "hooks/utils/react-router/useMyPathParams"
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

  const { tagId } = useMyPathParams()
  const tag = useTagQueryUtils(Number(tagId))

  // PE 2/3 - it's not clear if this props.resources is "ALL RESOURCES" or "RESOURCES FROM LIST"
  useEffect(() => {
    // When changing to another tag, go to "TO-DO" resources
    if (location.pathname !== previousPathnameRef.current) {
      setTabIndex(0)
      previousPathnameRef.current = location.pathname
    }

    let todos = filterTodo(props.resources)

    if (tag?.sortingBy === "default") {
      todos = todos.sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    }
    if (tag?.sortingBy === "priority") {
      todos = todos.sort(
        // desc, nulls first
        (a, b) => {
          if (a.priority !== null && b.priority === null) {
            return 1
          }
          if (a.priority === null && b.priority !== null) {
            return -1
          }

          return (b.priority ?? 0) - (a.priority ?? 0)
        }
      )
    }

    setTodo(todos)

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
  }, [
    props.resources,
    props.resources.map((r) => r.priority).join(""),
    tag?.sortingBy,
  ])

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
