import { faCrown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Box,
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core"
import {
  TBody,
  TD,
  THead,
  TR,
} from "../../../../components/shared/Table/MyTableWrappers"
import AddIcon from "@material-ui/icons/Add"
import React from "react"
import FlexVCenter from "../../../../components/shared/Flexboxes/FlexVCenter"
import Txt from "../../../../components/shared/Text/Txt"
import { DecisionTableDto } from "../../../../dtos/BigDecisions/DecisionTableDto"
import {
  DecisionTableItemDto,
  newDecisionTableItemDto,
} from "../../../../dtos/BigDecisions/DecisionTableItemDto"
import usePPutItemMutation from "../../../../hooks/BigDecisions/DecisionTableItem/usePPutItemMutation"
import getFinalWeight from "../../../../utils/domain/BigDecision/getFinalWeight"
import DecisionTableRow from "./DecisionTableRow/DecisionTableRow"
import TableMoreIcon from "./TableMoreIcon/TableMoreIcon"

type Props = { table: DecisionTableDto; isWinner: boolean }

const DecisionTable = ({ table, isWinner }: Props) => {
  const classes = useStyles()

  const { mutate } = usePPutItemMutation(table.decisionId)

  const addItem = () => {
    mutate(newDecisionTableItemDto(table.id))
  }

  const saveItemChange = (newItem: DecisionTableItemDto) => {
    mutate(newItem)
  }

  return (
    <Box mr={2} key={table.id}>
      <FlexVCenter justifyContent="space-between">
        <FlexVCenter maxWidth={470}>
          <Txt variant="h5">
            {table.title} · {getFinalWeight(table.items)}
            {isWinner && (
              <FontAwesomeIcon
                size="sm"
                icon={faCrown}
                style={{ color: "orange", marginLeft: 8, marginBottom: 2 }}
              />
            )}
          </Txt>
        </FlexVCenter>
        <Box>
          <TableMoreIcon table={table} />
        </Box>
      </FlexVCenter>
      <Box mt={1} />

      <Paper>
        <TableContainer className={classes.container}>
          <Table stickyHeader size="small" className={classes.table}>
            <THead className={classes.tableHead}>
              <TR>
                <TD className={classes.col1}>Problem / Risk</TD>
                <TD className={classes.col2}>Solution / Counter argument</TD>
                <TD className={classes.col3}>
                  <Box>Weight</Box>
                  <Box>{getFinalWeight(table.items)}</Box>
                </TD>
              </TR>
            </THead>
            <TBody>
              {table.items.map((item) => (
                <DecisionTableRow
                  key={`${item.id}-${item.updatedAt}`}
                  initialItem={item}
                  onChange={saveItemChange}
                />
              ))}
            </TBody>
          </Table>
        </TableContainer>
      </Paper>
      <Button startIcon={<AddIcon />} onClick={addItem}>
        Add problem
      </Button>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    maxHeight: 440,
  },
  table: {
    "& .MuiTableCell-root": {
      padding: 8,
      borderBottom: "1px solid rgb(255 255 255 / 0.1)",
    },
    "& .MuiTableBody-root .MuiTableRow-root:last-child .MuiTableCell-root": {
      borderBottom: "none",
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
  col1: { width: 240 },
  col2: { width: 240 },
  col3: { width: 75, textAlign: "center" },
}))

export default DecisionTable
