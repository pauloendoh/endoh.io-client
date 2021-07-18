import { Box, Button, Typography } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import React from "react"
import Flex from "../../../components/shared/Flexboxes/Flex"
import { newDecisionTableDto } from "../../../dtos/BigDecisions/DecisionTableDto"
import useDecisionsQuery from "../../../hooks/BigDecisions/Decision/useDecisionsQuery"
import useDialogsStore from "../../../store/zustand/useDialogsStore"
import getWinnerTable from "../../../utils/domain/BigDecision/getWinnerTable"
import DecisionTable from "./DecisionTable/DecisionTable"


type Props = { decisionId: number }

const DecisionContent = (props: Props) => {
  const { data: allDecisions } = useDecisionsQuery()

  const decision = allDecisions?.find((d) => d.id === props.decisionId)

  const getTables = () => [...decision.tables].sort((a, b) => a.index - b.index)

  const winnerTable = decision ? getWinnerTable(getTables()) : null

  const { openDecisionTableDialog } = useDialogsStore()

  if (!decision) return null
  return (
    <Box>
      <Typography variant="h4">{decision.title}</Typography>
      <Box mt={4}>
        <Button
          onClick={() =>
            openDecisionTableDialog(newDecisionTableDto(props.decisionId))
          }
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
        >
          Add table
        </Button>
      </Box>
      <Flex mt={4}>
        {getTables().map((table) => (
          <DecisionTable
            key={table.id}
            table={table}
            isWinner={winnerTable?.id === table.id}
          />
        ))}
      </Flex>
    </Box>
  )
}

export default DecisionContent
