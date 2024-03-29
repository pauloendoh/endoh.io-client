import { faCrown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Paper, Table, TableContainer, Toolbar } from "@mui/material"
import useSaveItemMutation from "../../../../hooks/BigDecisions/DecisionTableItem/usePPutItemMutation"
import useSidebarStore from "../../../../store/zustand/useSidebarStore"
import { DecisionTableDto } from "../../../../types/domain/big-decisions/DecisionTableDto"
import {
  DecisionTableItemDto,
  newDecisionTableItemDto,
} from "../../../../types/domain/big-decisions/DecisionTableItemDto"

import { makeStyles } from "@mui/styles"
import { MdAdd } from "react-icons/md"
import myColors from "utils/consts/myColors"
import getFinalWeight from "../../../../utils/domain/BigDecision/getFinalWeight"
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter"
import { TBody, TD, THead, TR } from "../../../_UI/Table/MyTableWrappers"
import Txt from "../../../_UI/Text/Txt"
import DecisionTableRow from "./DecisionTableRow/DecisionTableRow"
import SortWeightIcon from "./SortWeightMenuIcon/SortWeightMenuIcon"
import TableMoreIcon from "./TableMoreIcon/TableMoreIcon"

// PE 2/3
const DecisionTable = ({
  table,
  isWinner,
}: {
  table: DecisionTableDto
  isWinner: boolean
}) => {
  const classes = useStyles()

  const saveItemMutation = useSaveItemMutation(table.decisionId)
  const { sidebarIsOpen } = useSidebarStore()

  const addItem = () => {
    saveItemMutation.mutate(newDecisionTableItemDto(table.id!!))
  }

  const saveItemChange = (newItem: DecisionTableItemDto) => {
    saveItemMutation.mutate(newItem)
  }

  const getBiggerColsWidth = () => {
    if (sidebarIsOpen) return 240
    return 180
  }

  return (
    <Box mr={2} mt={4} key={table.id}>
      {/* PE 2/3 - Could be separated? */}
      <FlexVCenter justifyContent="space-between">
        <FlexVCenter maxWidth={sidebarIsOpen ? 470 : 392}>
          <Txt variant="h5">
            {table.title} · {getFinalWeight(table.items!!)}
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

                {/* PE 2/3 - <FinalWeightTableCell/> ?  */}
                <TD className={classes.col3}>
                  <Box>Weight</Box>
                  <FlexVCenter justifyContent="center">
                    {getFinalWeight(table.items!!) > 0 ? (
                      <b style={{ color: myColors.ratingYellow[5] }}>
                        {getFinalWeight(table.items!!)}
                      </b>
                    ) : (
                      getFinalWeight(table.items!!)
                    )}
                    <SortWeightIcon table={table} />
                  </FlexVCenter>
                </TD>
              </TR>
            </THead>
            <TBody>
              {table.items?.map((item) => (
                <DecisionTableRow
                  key={`${item.id}-${item.updatedAt}`}
                  initialItem={item}
                  onThrottledChange={saveItemChange}
                  biggerColsWidth={getBiggerColsWidth()}
                />
              ))}
            </TBody>
          </Table>
        </TableContainer>

        <Toolbar
          disableGutters
          variant="dense"
          onClick={addItem}
          className={classes.footer}
        >
          <FlexVCenter ml={2}>
            <MdAdd />

            <Box ml={1}>Add problem</Box>
          </FlexVCenter>
        </Toolbar>
      </Paper>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: 440,
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
  col3: { width: 60, textAlign: "center" },
  footer: {
    "&:hover": {
      background: theme.palette.grey[800],
      cursor: "pointer",
      borderRadius: "inherit",
    },
  },
}))

export default DecisionTable
