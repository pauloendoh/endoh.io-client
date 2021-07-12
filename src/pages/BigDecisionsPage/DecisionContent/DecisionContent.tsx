import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import AddIcon from '@material-ui/icons/Add'
import Flex from '../../../components/shared/Flexboxes/Flex';
import useDecisionsQuery from '../../../utils/hooks/queryHooks/BigDecisions/useDecisionsQuery';
import DecisionTable from './DecisionTable/DecisionTable';

type Props = { decisionId: number }

const DecisionContent = (props: Props) => {
  const { data: allDecisions } = useDecisionsQuery()

  const decision = allDecisions?.find((d) => d.id === props.decisionId)

  const getTables = () => [...decision.tables].sort((a, b) => a.index - b.index)

  if (!decision) return null
  return (
    <Box>
      <Typography variant="h4">{decision.title}</Typography>
      <Box mt={4}>
        <Button startIcon={<AddIcon/>} variant="contained" color="primary">
          Add table
        </Button>
      </Box>
      <Flex mt={4}>
        {getTables().map((table) => (
          <DecisionTable table={table} key={table.id} />
        ))}
      </Flex>
    </Box>
  )
}

export default DecisionContent
