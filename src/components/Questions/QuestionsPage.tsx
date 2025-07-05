import { urls } from "utils/urls"

import { Box, SxProps, Theme, useMediaQuery, useTheme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import classNames from "classnames"
import Flex from "components/_UI/Flexboxes/Flex"
import { useDefaultSubmitQuestion } from "hooks/questions/useDefaultSubmitQuestion"
import { useAxios } from "hooks/utils/useAxios"
import { api } from "orval/api"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import useQuestionDialogStore from "store/zustand/dialogs/useQuestionDialogStore"
import useDocsStore from "store/zustand/domain/useDocsStore"
import useSidebarStore from "../../store/zustand/useSidebarStore"
import { DocDto } from "../../types/domain/questions/DocDto"
import LoadingPage from "../_common/LoadingPage/LoadingPage"
import QuestionsContent from "./QuestionsContent/QuestionsContent"
import QuestionsSidebar from "./QuestionsSidebar/QuestionsSidebar"

// PE 3/3
const QuestionsPage = () => {
  const navigate = useNavigate()
  const docsStore = useDocsStore()
  const { deckId: paramDeckId } = useParams<{ deckId: string }>()
  const [selectedDocId, setSelectedDocId] = useState<number | null>(null)

  const myAxios = useAxios()

  const { sidebarIsOpen, openSidebar } = useSidebarStore()

  useEffect(() => {
    openSidebar()

    myAxios
      .get<DocDto[]>(urls.api.define.doc)
      .then((res) => docsStore.setDocs(res.data))

    api.question
      .getAllMyQuestions()
      .then((res) => docsStore.setQuestions(res.data))
  }, [])

  useEffect(() => {
    if (paramDeckId && docsStore.HasLoadedDocs) {
      const docId = Number(paramDeckId)

      const doc = docsStore.docs.find((doc) => doc.id === docId)
      if (!doc) {
        navigate(urls.pages.questions.index)
        return
      }
      setSelectedDocId(docId)
      document.title = doc.title
    } else {
      setSelectedDocId(null)
    }
  }, [paramDeckId, docsStore.docs])

  useEffect(() => {
    // open last opened tag
    if (!paramDeckId && docsStore.docs?.length > 0) {
      const sortedByLastOpened = docsStore.docs.sort((a, b) => {
        if (a.lastOpenedAt === undefined) return -1
        if (b.lastOpenedAt === undefined) return 1

        return a.lastOpenedAt > b.lastOpenedAt ? -1 : 1
      })

      const docId = sortedByLastOpened[0].id
      navigate(urls.pages.questions.deckId(docId))
    }
  }, [docsStore.docs, paramDeckId])

  const [searchParams] = useSearchParams()
  const [hasFirstChecked, setHasFirstChecked] = useState(false)
  const { openDialog: openQuestionDialog } = useQuestionDialogStore()
  const defaultSubmitQuestion = useDefaultSubmitQuestion()
  useEffect(() => {
    if (docsStore.questions.length > 0 && !hasFirstChecked) {
      setHasFirstChecked(true)
      const openQuestionId = searchParams.get("openQuestionId")
      if (openQuestionId) {
        const questionId = Number(openQuestionId)
        const question = docsStore.questions.find((q) => q.id === questionId)
        if (question) {
          openQuestionDialog({
            initialValue: question,
            onSubmit: defaultSubmitQuestion,
          })
        }
      }
    }
  }, [docsStore.questions])

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
          sx={sidebarIsOpen ? sx : undefined}
        >
          {docsStore.HasLoadedDocs ? (
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
