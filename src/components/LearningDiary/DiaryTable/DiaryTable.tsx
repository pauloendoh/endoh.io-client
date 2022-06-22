import {
  makeStyles,
  Paper,
  Table,
  TableContainer,
  Toolbar,
} from "@material-ui/core";
import { useAddLearningMutation, useLearningsQuery } from "generated/graphql";
import { useMemo } from "react";
import { useQueryClient } from "react-query";
import useSnackbarStore from "store/zustand/useSnackbarStore";
import buildGraphqlClient from "utils/consts/buildGraphqlClient";
import DarkButton from "../../_UI/Buttons/DarkButton/DarkButton";
import { TBody, TD, THead, TR } from "../../_UI/Table/MyTableWrappers";
import DiaryTableRow from "./DiaryTableRow/DiaryTableRow";

const DiaryTable = () => {
  const classes = useStyles();
  const qc = useQueryClient();

  const { setSuccessMessage } = useSnackbarStore();

  const { data } = useLearningsQuery(buildGraphqlClient());
  const sortedLearnings = useMemo(
    () =>
      data?.learnings.sort((a, b) => a.createdAt.localeCompare(b.createdAt)) ||
      [],
    [data]
  );

  const {
    mutate: mutateAddLearning,
    isLoading: isAdding,
  } = useAddLearningMutation(buildGraphqlClient(), {
    onSuccess: () => {
      setSuccessMessage("Learning added!");
      qc.invalidateQueries(useLearningsQuery.getKey());
    },
  });

  return (
    <Paper>
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          className={classes.table}
          aria-labelledby="tableTitle"
          size="small"
          aria-label="enhanced table"
        >
          <THead>
            <TR>
              <TD className={classes.th} align="center" width="64px">
                #
              </TD>
              <TD className={classes.th}>Learning</TD>

              <TD align="center" className={classes.th} width="100px">
                Highlight
              </TD>
            </TR>
          </THead>

          <TBody>
            {sortedLearnings.map((learning, index) => (
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
                date: new Date().toISOString(),
                description: "",
                isHighlight: false,
              },
            })
          }
          disabled={isAdding}
        >
          + Add Note
        </DarkButton>
        {/* <AddSkillButton tag={props.tag} /> */}
      </Toolbar>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: 440,
  },
  th: {
    background: "#232323",
  },
  table: {
    minWidth: 500,
    "& .MuiTableCell-root": {
      padding: 8,
      borderBottom: "1px solid rgb(255 255 255 / 0.1)",
    },
  },
}));

export default DiaryTable;
