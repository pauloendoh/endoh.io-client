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
import { newDecisionTableItemDto } from "../../../../dtos/BigDecisions/DecisionTableItemDto"
import usePostItemMutation from "../../../../utils/hooks/queryHooks/BigDecisions/usePostItemMutation"

type Props = { table: DecisionTableDto }

const DecisionTable = (props: Props) => {
  const classes = useStyles()

  const postItemMutation = usePostItemMutation(props.table.decisionId)

  const addItem = () => {
    postItemMutation.mutate(newDecisionTableItemDto(props.table.id), {
      onSuccess: () => {},
    })
  }

  return (
    <Box mr={2}>
      <Typography variant="h6">{props.table.title}</Typography>
      <Paper>
        <TableContainer className={classes.container}>
          <Table stickyHeader size="small" className={classes.table}>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell>Problem / Risk</TableCell>
                <TableCell>Solution / Counter argument</TableCell>
                <TableCell>weight</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.table.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>problem</TableCell>
                  <TableCell>{item.solution}</TableCell>
                  <TableCell>{item.weight}</TableCell>
                </TableRow>
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
    </Box>
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
