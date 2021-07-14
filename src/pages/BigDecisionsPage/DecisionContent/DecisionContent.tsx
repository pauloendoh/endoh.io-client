import { faCrown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Button, Typography } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import React from "react"
import Flex from "../../../components/shared/Flexboxes/Flex"
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter"
import getWinnerTable from "../../../utils/domain/BigDecision/getWinnerTable"
import useDecisionsQuery from "../../../utils/hooks/queryHooks/BigDecisions/useDecisionsQuery"
import DecisionTable from "./DecisionTable/DecisionTable"

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
            <FlexVCenter>
              <Typography variant="h6">{table.title}</Typography>

              {winnerTable?.id === table.id && (
                <Box ml={1}>
                  <FontAwesomeIcon icon={faCrown} />
                </Box>
              )}
            </FlexVCenter>
            <DecisionTable table={table} />
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

export default DecisionContent
