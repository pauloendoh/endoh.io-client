import { Box, makeStyles } from "@material-ui/core"
import classNames from "classnames"
import Flex from "components/shared/Flexboxes/Flex"
import React, { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { stringIsValidNumber } from "utils/math/stringIsValidNumber"
import PATHS from "../../consts/PATHS"
import useDecisionsQuery from "../../hooks/BigDecisions/Decision/useDecisionsQuery"
import useDialogsStore from "../../store/zustand/useDialogsStore"
import useSidebarStore from "../../store/zustand/useSidebarStore"
import DecisionContent from "./DecisionContent/DecisionContent"
import DecisionDialog from "./DecisionDialog/DecisionDialog"
import DecisionSidebar from "./DecisionSidebar/DecisionSidebar"
import DecisionTableDialog from "./DecisionTableDialog/DecisionTableDialog"

// PE 3/3
const BigDecisionsPage = () => {
  const classes = useStyles()

  const { id: queryId } = useParams<{ id: string }>()
  const { openSidebar } = useSidebarStore()

  const decisionId = stringIsValidNumber(queryId) ? Number(queryId) : null

  useEffect(() => {
    document.title = "BigDecisions - endoh.io"
    openSidebar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { data: allDecisions } = useDecisionsQuery()
  const history = useHistory()
  useEffect(
    () => {
      if (decisionId === null && allDecisions?.length)
        history.push(PATHS.BigDecisions.decision(allDecisions[0].id))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allDecisions]
  )

  const {
    decisionDialogOpen,
    decisionDialogValue,
    closeDecisionDialog,

    decisionTableDialogOpen,
    decisionTableDialogValue,
    closeDecisionTableDialog,
  } = useDialogsStore()

  const { sidebarIsOpen } = useSidebarStore()

  return (
    <Box p={2}>
      <Flex height="100%">
        <DecisionSidebar selectedDecisionId={decisionId} />
        <Box
          className={classNames(classes.content, {
            [classes.contentShift]: sidebarIsOpen,
          })}
          flexGrow={1}
        >
          {queryId && <DecisionContent decisionId={decisionId} />}
        </Box>
      </Flex>

      <DecisionDialog
        initialValue={decisionDialogValue}
        open={decisionDialogOpen}
        onClose={closeDecisionDialog}
      />

      <DecisionTableDialog
        initialValue={decisionTableDialogValue}
        open={decisionTableDialogOpen}
        onClose={closeDecisionTableDialog}
      />
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
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

export default BigDecisionsPage
