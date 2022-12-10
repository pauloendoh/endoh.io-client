import { urls } from "utils/urls"

import { SxProps, Theme, useMediaQuery, useTheme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { Box } from "@mui/material"
import classNames from "classnames"
import Flex from "components/_UI/Flexboxes/Flex"
import { useAxios } from "hooks/utils/useAxios"
import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useSidebarStore from "../../store/zustand/useSidebarStore"
import { DocDto } from "../../types/domain/questions/DocDto"
import { NoteDto } from "../../types/domain/questions/NoteDto"
import LoadingPage from "../_common/LoadingPage/LoadingPage"
import QuestionsContent from "./QuestionsContent/QuestionsContent"
import QuestionsSidebar from "./QuestionsSidebar/QuestionsSidebar"

// PE 3/3
const QuestionsPage = () => {
  const history = useHistory()
  const docsStore = useDocsStore()
  const { docId: paramDocId } = useParams<{ docId: string }>()
  const [selectedDocId, setSelectedDocId] = useState<number>(null)

  const myAxios = useAxios()

  const { sidebarIsOpen, openSidebar } = useSidebarStore()

  useEffect(
    () => {
      openSidebar()

      myAxios
        .get<DocDto[]>(urls.api.define.doc)
        .then((res) => docsStore.setDocs(res.data))

      myAxios
        .get<NoteDto[]>(urls.api.define.note)
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
        history.push(urls.pages.questions.index)
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
        history.push(urls.pages.questions.docId(docId))
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
        <QuestionsSidebar selectedDocId={selectedDocId} />
        <Box
          className={classNames(classes.content)}
          flexGrow={1}
          sx={sidebarIsOpen && sx}
        >
          {docsStore.hasFirstLoaded ? (
            <React.Fragment>
              {selectedDocId && <QuestionsContent docId={selectedDocId} />}
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

export default QuestionsPage
