import {
  Box,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import React from "react"
import FlexVCenter from "../../../../components/shared/Flexboxes/FlexVCenter"
import { DecisionTableDto } from "../../../../dtos/BigDecisions/DecisionTableDto"
import {
  DecisionTableItemDto,
  newDecisionTableItemDto,
} from "../../../../dtos/BigDecisions/DecisionTableItemDto"
import usePPutItemMutation from "../../../../utils/hooks/queryHooks/BigDecisions/usePPutItemMutation"
import DecisionTableRow from "./DecisionTableRow/DecisionTableRow"
import getFinalWeight from "../../../../utils/domain/BigDecision/getFinalWeight"

type Props = { table: DecisionTableDto }

const DecisionTable = (props: Props) => {
  const classes = useStyles()

  const { mutate } = usePPutItemMutation(props.table.decisionId)

  const addItem = () => {
    mutate(newDecisionTableItemDto(props.table.id))
  }

  const saveItemChange = (newItem: DecisionTableItemDto) => {
    mutate(newItem)
  }



      

  return (
    
      <Paper>
        <TableContainer className={classes.container}>
          <Table stickyHeader size="small" className={classes.table}>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>Problem / Risk</TableCell>
                <TableCell>Solution / Counter argument</TableCell>
                <TableCell>
                  <Box>Weight</Box>
                  <Box>{getFinalWeight(props.table.items)}</Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.table.items.map((item) => (
                <DecisionTableRow
                  key={`${item.id}-${item.updatedAt}`}
                  initialItem={item}
                  onChange={saveItemChange}
                />
              ))}
            </TableBody>

            <TableFooter>
              <TableRow hover className={classes.lastRow} onClick={addItem}>
                <TableCell colSpan={3}>
                  <FlexVCenter>
                    <AddIcon /> <Box ml={1}>New</Box>
                  </FlexVCenter>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    maxHeight: 440,
    minWidth: 350,
    maxWidth: 500,
  },
  table: {
    "& .MuiTableCell-root": {
      padding: 8,
      borderBottom: "1px solid rgb(255 255 255 / 0.1)",
    },
  },
  lastRow: {
    cursor: "pointer",
    "& .MuiTableCell-root": {
      borderBottom: "none",
    },
  },
  tableHead: {
    "& .MuiTableCell-root": {
      backgroundColor: "#2B2B2B",
    },
  },
}))

export default DecisionTable
