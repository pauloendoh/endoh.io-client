import { faCrown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Button, Typography } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import React from "react"
import Flex from "../../../components/shared/Flexboxes/Flex"
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter"
import useDecisionsQuery from "../../../hooks/BigDecisions/Decision/useDecisionsQuery"
import getWinnerTable from "../../../utils/domain/BigDecision/getWinnerTable"
import DecisionTable from "./DecisionTable/DecisionTable"
import TableMoreIcon from "./DecisionTable/TableMoreIcon/TableMoreIcon"

type Props = { decisionId: number }

const DecisionContent = (props: Props) => {
  const { data: allDecisions } = useDecisionsQuery()

  const decision = allDecisions?.find((d) => d.id === props.decisionId)

  const getTables = () => [...decision.tables].sort((a, b) => a.index - b.index)

  const winnerTable = decision ? getWinnerTable(getTables()) : null

  if (!decision) return null
  return (
    <Box>
      <Typography variant="h4">{decision.title}</Typography>
      <Box mt={4}>
        <Button startIcon={<AddIcon />} variant="contained" color="primary">
          Add table
        </Button>
      </Box>
      <Flex mt={4}>
        {getTables().map((table) => (
          <Box mr={2} key={table.id}>
            <FlexVCenter justifyContent="space-between">
              <FlexVCenter maxWidth={470}>
                <Typography variant="h6">{table.title}</Typography>

                {winnerTable?.id === table.id && (
                  <Box ml={1}>
                    <FontAwesomeIcon icon={faCrown} style={{color: 'orange'}} />
                  </Box>
                )}
              </FlexVCenter>
              <Box>
                <TableMoreIcon table={table} />
              </Box>
            </FlexVCenter>
            <Box mt={1} />
            <DecisionTable table={table} />
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

export default DecisionContent
