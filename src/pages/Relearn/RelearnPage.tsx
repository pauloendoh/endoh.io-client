import { Box } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { GlobalHotKeys } from "react-hotkeys"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import Flex from "../../components/shared/Flexboxes/Flex"
import API from "../../consts/API"
import MY_AXIOS from "../../consts/MY_AXIOS"
import PATHS from "../../consts/PATHS"
import { SkillDto } from "../../dtos/skillbase/SkillDto"
import { ResourceDto } from "../../interfaces/dtos/relearn/ResourceDto"
import * as relearnActions from "../../store/relearn/relearnActions"
import { setSkills } from "../../store/skillbase/skillbaseActions"
import { ApplicationState } from "../../store/store"
import { sleep } from "../../utils/sleep"
import LoadingPage from "../index/LoadingPage"
import RelearnContent from "./Content/RelearnContent"
import ResourceDialog from "./Dialogs/ResourceDialog"
import TagDialog from "./Dialogs/TagDialog"
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

      MY_AXIOS.get<SkillDto[]>(API.skillbase.skill).then((res) => {
        props.setSkills(res.data)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const [skills, setSkills] = useState<SkillDto[]>([])

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
        document.title = "Untagged - Endoh.io"
      } else if (pathname.startsWith(PATHS.relearn.tag)) {
        const tagId = Number(pathname.split("/").pop())
        if (tagId) {
          setFilteredResources(
            props.resources.filter((resource) => {
              return resource.tag?.id === tagId
            })
          )

          setSkills(props.allSkills.filter((skill) => skill.tagId === tagId))
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
            <RelearnContent resources={filteredResources} skills={skills} />
            // <ResourceList resources={filteredResources} />
          )}
        </Box>
        <TagDialog />
      </Flex>
    </GlobalHotKeys>
  )
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  resources: state.relearn.resources,
  allSkills: state.skillbase.skills,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setResources: (resources: ResourceDto[]) =>
    dispatch(relearnActions.setResources(resources)),
  setSkills: (skills: SkillDto[]) => dispatch(setSkills(skills)),

  startNewResource: () => dispatch(relearnActions.startNewResource()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RelearnPage)
