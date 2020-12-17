import { Box } from "@material-ui/core"
import Flex from "components/shared/Flexboxes/Flex"
import API from "consts/API"
import PATHS from "consts/PATHS"
import { ResourceDto } from "interfaces/dtos/relearn/ResourceDto"
import LoadingPage from "pages/index/LoadingPage"
import React, { useEffect, useState } from "react"
import { GlobalHotKeys } from "react-hotkeys"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import MY_AXIOS from "consts/MY_AXIOS"
import { sleep } from "utils/sleep"
import { TagDto } from "../../interfaces/dtos/relearn/TagDto"
import * as relearnActions from "../../store/relearn/relearnActions"
import { ApplicationState } from "../../store/store"
import RelearnContent from "./Content/RelearnContent"
import EditResourceDialog from "./Dialogs/EditResourceDialog"
import EditTagDialog from "./Dialogs/EditTagDialog"
import RelearnSidebar from "./RelearnSidebar/RelearnSidebar"
// PE 3/3
const RelearnPage = (props: Props) => {
  const [isLoadingResources, setIsLoadingResources] = useState(true)
  useEffect(
    () => {
      MY_AXIOS.get<ResourceDto[]>(API.relearn.resource)
        .then((res) => {
          props.setResources(res.data)
        })
        .finally(() => {
          setIsLoadingResources(false)
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const location = useLocation()
  // filter resources by tag (from path name)
  const [filteredResources, setFilteredResources] = useState<ResourceDto[]>([])
  useEffect(
    () => {
      const { pathname } = location

      // Filtrando resource por tags. Melhor colocar em outro arquivo?
      if (pathname === PATHS.relearn.index) {
        setFilteredResources(
          props.resources.filter((resource) => resource.tag === null)
        )
        document.title = "Untagged - Relearn"
      } else if (pathname.startsWith(PATHS.relearn.tag)) {
        const tagId = Number(pathname.split("/").pop())
        if (tagId) {
          setFilteredResources(
            props.resources.filter((resource) => {
              return resource.tag?.id === tagId
            })
          )
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.resources, location]
  )

  const keyMap = { openModal: "q" }
  const handlers = {
    openModal: async () => {
      await sleep(100) // required so it doesn't add 'q' at the title field immediately
      props.startNewResource()
    },
  }

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <Flex height="100%">
        <RelearnSidebar />
        <Box pt={1} px={4} flexGrow={1}>
          {isLoadingResources ? (
            <LoadingPage />
          ) : (
            <RelearnContent resources={filteredResources} />
            // <ResourceList resources={filteredResources} />
          )}
        </Box>
        <EditResourceDialog />
        <EditTagDialog />
      </Flex>
    </GlobalHotKeys>
  )
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  resources: state.relearn.resources,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setResources: (resources: ResourceDto[]) =>
    dispatch(relearnActions.setResources(resources)),
  setTags: (tags: TagDto[]) => dispatch(relearnActions.setTags(tags)),
  startNewResource: () => dispatch(relearnActions.startNewResource()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RelearnPage)
