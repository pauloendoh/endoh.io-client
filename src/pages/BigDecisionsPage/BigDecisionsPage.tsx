import { Box } from "@material-ui/core"
import Flex from "components/shared/Flexboxes/Flex"
import React from "react"
import { useParams } from "react-router-dom"
import { stringIsValidNumber } from "utils/math/stringIsValidNumber"
import useDialogsStore from "../../store/zustand/useDialogsStore"
import BigDecisionsSidebar from "./BigDecisionsSidebar/BigDecisionsSidebar"
import DecisionContent from "./DecisionContent/DecisionContent"
import DecisionDialog from "./DecisionDialog/DecisionDialog"
import DecisionTableDialog from "./DecisionTableDialog/DecisionTableDialog"

// PE 3/3
const BigDecisionsPage = () => {
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

  return (
    <Box p={3}>
      <Flex height="100%">
        <BigDecisionsSidebar selectedDecisionId={decisionId} />
        <Box pt={1} px={4} flexGrow={1}>
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

export default BigDecisionsPage
