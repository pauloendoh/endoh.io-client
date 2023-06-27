import { Paper, Table, TableContainer, Toolbar } from "@mui/material"
import useFilteredLearnings from "hooks/learning-diary/useFilteredLearnings"
import { useMyMediaQuery } from "hooks/utils/useMyMediaQuery"
import useLearningDialogStore from "store/zustand/dialogs/useLearningDialogStore"
import useLearningDiaryStore from "store/zustand/domain/useLearningDiaryStore"
import { buildLearning } from "utils/builders"
import DarkButton from "../../_UI/Buttons/DarkButton/DarkButton"
import { TBody, TD, THead, TR } from "../../_UI/Table/MyTableWrappers"
import DiaryTableRow from "./DiaryTableRow/DiaryTableRow"

const DiaryTable = () => {
  const { selectedDate } = useLearningDiaryStore()

  const filteredLearnings = useFilteredLearnings(selectedDate)

  const { openDialog } = useLearningDialogStore()

  const { downSm } = useMyMediaQuery()

  return (
    <Paper>
      <TableContainer
        id="learning-table-container"
        sx={{ maxHeight: downSm ? "calc(100vh - 480px)" : 440 }}
      >
        <Table
          stickyHeader
          sx={{
            minWidth: downSm ? 360 : 500,
            "& .MuiTableCell-root": {
              padding: 2,
              borderBottom: "1px solid rgb(255 255 255 / 0.1)",
            },
          }}
          aria-labelledby="tableTitle"
          size="small"
          aria-label="enhanced table"
        >
          <THead
            sx={{
              th: {
                background: "#232323",
              },
            }}
          >
            <TR>
              {!downSm && (
                <TD align="center" width="64px">
                  Time
                </TD>
              )}

              <TD>Learning</TD>

              <TD align="center" width="100px">
                Points
              </TD>
            </TR>
          </THead>

          <TBody>
            {filteredLearnings.map((learning, index) => (
              <DiaryTableRow
                key={learning.id}
                index={index}
                initialValue={learning}
              />
            ))}
          </TBody>
        </Table>
      </TableContainer>

      <Toolbar>
        <DarkButton onClick={() => openDialog(buildLearning())}>
          + Add Learning
        </DarkButton>
        {/* <AddSkillButton tag={props.tag} /> */}
      </Toolbar>
    </Paper>
  )
}

export default DiaryTable
