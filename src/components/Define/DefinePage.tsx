import { SxProps, Theme, useMediaQuery, useTheme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { Box } from "@mui/material"
import classNames from "classnames"
import Flex from "components/_UI/Flexboxes/Flex"
import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import useDocsStore from "store/zustand/domain/useDocsStore"
import pageUrls from "utils/url/urls/pageUrls"
import useSidebarStore from "../../store/zustand/useSidebarStore"
import { DocDto } from "../../types/domain/define/DocDto"
import { NoteDto } from "../../types/domain/define/NoteDto"
import myAxios from "../../utils/consts/myAxios"
import apiUrls from "../../utils/url/urls/apiUrls"
import LoadingPage from "../_common/LoadingPage/LoadingPage"
import DefineContent from "./DefineContent/DefineContent"
import DefineSidebar from "./DefineSidebar/DefineSidebar"

// PE 3/3
const DefinePage = () => {
  const history = useHistory()
  const docsStore = useDocsStore()
  const { docId: paramDocId } = useParams<{ docId: string }>()
  const [selectedDocId, setSelectedDocId] = useState<number>(null)

  const { sidebarIsOpen, openSidebar } = useSidebarStore()

  useEffect(
    () => {
      openSidebar()

      myAxios
        .get<DocDto[]>(apiUrls.define.doc)
        .then((res) => docsStore.setDocs(res.data))

      myAxios
        .get<NoteDto[]>(apiUrls.define.note)
        .then((res) => docsStore.setNotes(res.data))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (paramDocId && docsStore.hasFirstLoaded) {
      const docId = Number(paramDocId)

      const doc = docsStore.docs.find((doc) => doc.id === docId)
      if (!doc) {
        history.push(pageUrls.define.index)
        return
      }
      setSelectedDocId(docId)
      document.title = doc.title
    } else {
      setSelectedDocId(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramDocId, docsStore.docs])

  useEffect(
    () => {
      // open last opened tag
      if (!paramDocId && docsStore.docs?.length > 0) {
        const sortedByLastOpened = docsStore.docs.sort((a, b) => {
          if (a.lastOpenedAt === undefined) return -1
          if (b.lastOpenedAt === undefined) return 1

          return a.lastOpenedAt > b.lastOpenedAt ? -1 : 1
        })

        const docId = sortedByLastOpened[0].id
        history.push(pageUrls.define.docId(docId))
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [docsStore.docs, paramDocId]
  )

  const classes = useStyles()

  const theme = useTheme()

  const isSmallScreen = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  )
  const sx: SxProps<Theme> = {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: isSmallScreen ? 0 : 300 / 8, // 300px
  }

  return (
    <Box p={3}>
      <Flex>
        <DefineSidebar selectedDocId={selectedDocId} />
        <Box
          className={classNames(classes.content)}
          flexGrow={1}
          sx={sidebarIsOpen && sx}
        >
          {docsStore.hasFirstLoaded ? (
            <React.Fragment>
              {selectedDocId && <DefineContent docId={selectedDocId} />}
            </React.Fragment>
          ) : (
            <LoadingPage />
          )}
        </Box>
      </Flex>
    </Box>
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
    marginLeft: 300,
  },
}))

export default DefinePage
