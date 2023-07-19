import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { Box, Paper } from "@mui/material"
import clsx from "clsx"
import { useAxios } from "hooks/utils/useAxios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import useRelearnStore from "store/zustand/domain/useRelearnStore"
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore"
import useWindowFocus from "use-window-focus"
import titles from "utils/titles"
import { urls } from "utils/urls"
import useSidebarStore from "../../store/zustand/useSidebarStore"
import { TagDto } from "../../types/domain/relearn/TagDto"
import { SkillDto } from "../../types/domain/skillbase/SkillDto"
import Flex from "../_UI/Flexboxes/Flex"
import LoadingPage from "../_common/LoadingPage/LoadingPage"
import ProgressSidebar from "./ProgressSidebar/ProgressSidebar"
import SkillbaseTable from "./SkillTable/SkillbaseTable"

const SkillbasePage = () => {
  const { tags: allTags } = useRelearnStore()

  const classes = useStyles()
  const { pathname } = useLocation()
  const windowFocused = useWindowFocus()

  const { setSkills, hasFirstLoaded } = useSkillbaseStore()

  const { sidebarIsOpen, closeSidebar } = useSidebarStore()
  const [selectedTag, setSelectedTag] = useState<TagDto | "Untagged">()

  const axios = useAxios()

  const fetchSkills = () => {
    axios.get<SkillDto[]>(urls.api.skillbase.skill).then((res) => {
      setSkills(res.data)
    })
  }

  useEffect(
    () => {
      closeSidebar()
      fetchSkills()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (windowFocused) fetchSkills()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowFocused])

  useEffect(() => {
    if (pathname.startsWith(urls.pages.skills.untagged)) {
      setSelectedTag("Untagged")
    } else if (pathname.startsWith(urls.pages.skills.tag + "/")) {
      const tagId = Number(pathname.split("/").pop())
      if (tagId) {
        const tag = allTags.find((tag) => tag.id === tagId)
        if (tag) {
          setSelectedTag(tag)
          document.title = titles.skillPage(tag.name)
        }
      }
    } else {
      setSelectedTag(undefined)
      document.title = titles.skillPage()
    }
  }, [pathname, allTags])

  return (
    <Flex height="100%" pt={5} justifyContent="center">
      <ProgressSidebar />

      <Box
        className={clsx(classes.content, {
          [classes.contentShift]: sidebarIsOpen,
        })}
      >
        <Box width="100%">
          {hasFirstLoaded ? (
            <Paper className={classes.paper}>
              <SkillbaseTable tag={selectedTag || "Untagged"} fixedTag={null} />
            </Paper>
          ) : (
            <LoadingPage />
          )}
        </Box>
      </Box>
    </Flex>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: 1200,
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
    marginLeft: 300,
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}))

export default SkillbasePage
