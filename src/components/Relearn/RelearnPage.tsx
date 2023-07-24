import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { Box } from "@mui/material"
import classNames from "classnames"
import useMultiSelectResource from "hooks/relearn/useMultiSelectResource"
import { useAxios } from "hooks/utils/useAxios"
import { useMyMediaQuery } from "hooks/utils/useMyMediaQuery"
import { useEffect, useState } from "react"
import { Redirect, useLocation, useParams } from "react-router-dom"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore"
import useWindowFocus from "use-window-focus"
import { urls } from "utils/urls"
import useSidebarStore from "../../store/zustand/useSidebarStore"
import { ResourceDto } from "../../types/domain/relearn/ResourceDto"
import { SkillDto } from "../../types/domain/skillbase/SkillDto"
import Flex from "../_UI/Flexboxes/Flex"
import LoadingPage from "../_common/LoadingPage/LoadingPage"
import RelearnContent from "./RelearnContent/RelearnContent"
import RelearnSidebar from "./RelearnSidebar/RelearnSidebar"
import TagDialog from "./TagDialog/TagDialog"

// PE 1/3 - rename to ResourcesPage
const RelearnPage = () => {
  const {
    resources,
    hasFirstLoaded,
    tags: allTags,
    setResources,
  } = useRelearnStore()

  const classes = useStyles()
  const windowFocused = useWindowFocus()
  const { setSkills: setSkillsStore } = useSkillbaseStore()

  const params = useParams<{ tagId?: string }>()
  const { clearSelectedIds } = useMultiSelectResource()

  const { sidebarIsOpen, closeSidebar } = useSidebarStore()

  const [redirectTo, setRedirectTo] = useState("")

  const axios = useAxios()

  const fetchResourcesAndSkills = () => {
    axios.get<ResourceDto[]>(urls.api.relearn.resource).then((res) => {
      setResources(res.data)
    })

    axios.get<SkillDto[]>(urls.api.skillbase.skill).then((res) => {
      setSkillsStore(res.data)
    })
  }

  const { downSm } = useMyMediaQuery()

  useEffect(() => {
    setRedirectTo("")

    if (downSm) {
      closeSidebar()
    }

    fetchResourcesAndSkills()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(
    () => {
      if (windowFocused) fetchResourcesAndSkills()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [windowFocused]
  )

  const location = useLocation()

  // filter resources by tag (from path name)
  const [filteredResources, setFilteredResources] = useState<ResourceDto[]>([])
  useEffect(
    () => {
      setRedirectTo("")
      const { pathname } = location

      // Filtrando resource por tags. Melhor colocar em outro arquivo?
      if (pathname === urls.pages.resources.index) {
        setFilteredResources(
          resources.filter((resource) => resource.tag === null)
        )
        document.title = "Untagged - Relearn"
      } else if (pathname.startsWith(urls.pages.resources.tag)) {
        const tagId = Number(pathname.split("/").pop())
        if (tagId) {
          setFilteredResources(
            resources.filter((resource) => {
              return resource.tag?.id === tagId
            })
          )

          // setSkillsStore(allSkills.filter((skill) => skill.tagId === tagId));
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resources, location]
  )

  useEffect(() => {
    clearSelectedIds()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(
    () => {
      // open last opened tag
      if (allTags?.length > 0) {
        const lastOpened = allTags.sort((a, b) => {
          if (a.lastOpenedAt === (undefined || null)) return -1
          if (b.lastOpenedAt === (undefined || null)) return 1

          return a.lastOpenedAt > b.lastOpenedAt ? -1 : 1
        })[0]

        if (!params.tagId) {
          setRedirectTo(urls.pages.resources.tagId(lastOpened.id || 0))
          return
        }

        const foundTag = allTags.find((tag) => tag.id === Number(params.tagId))
        if (!foundTag) {
          setRedirectTo(urls.pages.resources.tagId(lastOpened.id || 0))
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allTags, params.tagId]
  )

  if (redirectTo.length > 0) {
    return <Redirect to={redirectTo} />
  }

  return (
    <Flex height="100%">
      <RelearnSidebar />
      <Box
        pb={10}
        className={classNames(classes.content)}
        flexGrow={1}
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            marginLeft: 0,
          },
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: sidebarIsOpen ? 300 / 8 : 0,
        })}
      >
        {hasFirstLoaded ? (
          <RelearnContent resources={filteredResources} />
        ) : (
          <div style={{ marginTop: 32 }}>
            <LoadingPage />
          </div>
        )}
      </Box>

      <TagDialog />
    </Flex>
  )
}
const useStyles = makeStyles<Theme>((theme) => ({
  content: {
    flexGrow: 1,

    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // marginLeft: 300,
  },
}))

export default RelearnPage
