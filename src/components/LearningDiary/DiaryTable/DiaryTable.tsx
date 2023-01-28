import { Paper, Table, TableContainer, Toolbar } from "@mui/material"
import { useAddLearningMutation, useLearningsQuery } from "generated/graphql"
import useFilteredLearnings from "hooks/learning-diary/useFilteredLearnings"
import { useMyMediaQuery } from "hooks/utils/useMyMediaQuery"
import { DateTime } from "luxon"
import { useQueryClient } from "react-query"
import useLearningDiaryStore from "store/zustand/domain/useLearningDiaryStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import buildGraphqlClient from "utils/consts/buildGraphqlClient"
import DarkButton from "../../_UI/Buttons/DarkButton/DarkButton"
import { TBody, TD, THead, TR } from "../../_UI/Table/MyTableWrappers"
import DiaryTableRow from "./DiaryTableRow/DiaryTableRow"

const DiaryTable = () => {
  const qc = useQueryClient()

  const { selectedDate } = useLearningDiaryStore()
  const { setSuccessMessage } = useSnackbarStore()

  const filteredLearnings = useFilteredLearnings(selectedDate)

  const {
    mutate: mutateAddLearning,
    isLoading: isAdding,
  } = useAddLearningMutation(buildGraphqlClient(), {
    onSuccess: (data) => {
      qc.invalidateQueries(useLearningsQuery.getKey())
    },
  })

  const { downSm } = useMyMediaQuery()

  return (
    <Paper>
      <TableContainer sx={{ maxHeight: downSm ? "calc(100vh - 480px)" : 440 }}>
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
                  #
                </TD>
              )}

              <TD>Learning</TD>

              <TD align="center" width="100px">
                Highlight
              </TD>
              {!downSm && (
                <TD align="center" width="200px">
                  Time
                </TD>
              )}
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
        <DarkButton
          onClick={() =>
            mutateAddLearning({
              input: {
                datetime: DateTime.now().toISO(),
                description: "",
                isHighlight: false,
              },
            })
          }
          loading={isAdding}
        >
          + Add Learning
        </DarkButton>
        {/* <AddSkillButton tag={props.tag} /> */}
      </Toolbar>
    </Paper>
  )
}

export default DiaryTable
