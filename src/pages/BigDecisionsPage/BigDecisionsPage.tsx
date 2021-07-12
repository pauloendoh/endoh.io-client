import { Box } from "@material-ui/core"
import React from "react"
import { useParams } from "react-router-dom"
import Flex from "components/shared/Flexboxes/Flex"
import BigDecisionsSidebar from "./BigDecisionsSidebar/BigDecisionsSidebar"
import DecisionContent from "./DecisionContent/DecisionContent"
import {stringIsValidNumber} from "utils/math/stringIsValidNumber"


// PE 3/3
const BigDecisionsPage = () => {
  const { id } = useParams<{ id: string }>()
  const decisionId = stringIsValidNumber(id) ? Number(id) : null

  document.title = "BigDecisions - endoh.io"

  return (
    <Box p={3}>
      <Flex height="100%">
        <BigDecisionsSidebar selectedDecisionId={decisionId} />
        <Box pt={1} px={4} flexGrow={1}>
          {decisionId && <DecisionContent decisionId={decisionId} />}
        </Box>
      </Flex>
    </Box>
  )
}

export default BigDecisionsPage
