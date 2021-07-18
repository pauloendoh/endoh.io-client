import { Box, makeStyles } from "@material-ui/core"
import classNames from 'classnames'
import Flex from "components/shared/Flexboxes/Flex"
import React from "react"
import { useParams } from "react-router-dom"
import { stringIsValidNumber } from "utils/math/stringIsValidNumber"
import useDialogsStore from "../../store/zustand/useDialogsStore"
import useSidebarStore from "../../store/zustand/useSidebarStore"
import DecisionSidebar from "./DecisionSidebar/DecisionSidebar"
import DecisionContent from "./DecisionContent/DecisionContent"
import DecisionDialog from "./DecisionDialog/DecisionDialog"
import DecisionTableDialog from "./DecisionTableDialog/DecisionTableDialog"

// PE 3/3
const BigDecisionsPage = () => {
  const classes = useStyles()
  const { id } = useParams<{ id: string }>()
  const decisionId = stringIsValidNumber(id) ? Number(id) : null

  document.title = "BigDecisions - endoh.io"

  const {
    decisionDialogOpen,
    decisionDialogValue,
    closeDecisionDialog,

    decisionTableDialogOpen,
    decisionTableDialogValue,
    closeDecisionTableDialog,
  } = useDialogsStore()

  const {sidebarIsOpen} = useSidebarStore()

  return (
    <Box p={3}>
      <Flex height="100%">
        <DecisionSidebar selectedDecisionId={decisionId} />
        <Box 
         className={classNames(classes.content, {
          [classes.contentShift]: sidebarIsOpen,
        })}
        pt={1} px={4} flexGrow={1}>
          {decisionId && <DecisionContent decisionId={decisionId} />}
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

}))

export default BigDecisionsPage
