import { faCrown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Box,
  Button,
  makeStyles,
  Paper,
  Table,
  TableContainer,
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import React from "react"
import FlexVCenter from "../../../../components/shared/Flexboxes/FlexVCenter"
import {
  TBody,
  TD,
  THead,
  TR,
} from "../../../../components/shared/Table/MyTableWrappers"
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
import SortWeightIcon from "./SortWeightMenuIcon/SortWeightMenuIcon"
import useSidebarStore from "../../../../store/zustand/useSidebarStore"
import MyColors from "../../../../consts/MyColors"

type Props = { table: DecisionTableDto; isWinner: boolean }

const DecisionTable = ({ table, isWinner }: Props) => {
  const classes = useStyles()

  const { mutate } = usePPutItemMutation(table.decisionId)

  const { sidebarIsOpen } = useSidebarStore()

  const addItem = () => {
    mutate(newDecisionTableItemDto(table.id))
  }

  const saveItemChange = (newItem: DecisionTableItemDto) => {
    mutate(newItem)
  }

  const getBiggerColsWidth = () => {
    if (sidebarIsOpen) return 240
    return 180
  }

  return (
    <Box mr={2} mt={4} key={table.id}>
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
                <TD width={getBiggerColsWidth()}>Problem / Risk</TD>
                <TD width={getBiggerColsWidth()}>
                  Solution / Counter argument
                </TD>
                <TD className={classes.col3}>
                  <Box>Weight</Box>
                  <FlexVCenter justifyContent="center">
                    {getFinalWeight(table.items) > 0 ? (
                      <b style={{ color: MyColors.ratingYellow[5] }}>
                        {getFinalWeight(table.items)}
                      </b>
                    ) : (
                      getFinalWeight(table.items)
                    )}
                    <SortWeightIcon table={table} />
                  </FlexVCenter>
                </TD>
              </TR>
            </THead>
            <TBody>
              {table.items.map((item) => (
                <DecisionTableRow
                  key={`${item.id}-${item.updatedAt}`}
                  initialItem={item}
                  onChange={saveItemChange}
                  biggerColsWidth={getBiggerColsWidth()}
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
  col3: { width: 60, textAlign: "center" },
}))

export default DecisionTable
