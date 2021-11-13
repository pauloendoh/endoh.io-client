import {
  makeStyles,
  Paper,
  Table,
  TableContainer,
  Toolbar,
} from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import useDocsStore from "store/zustand/domain/useDocsStore";
import { ApplicationState } from "../../../../store/store";
import { newNoteDto, NoteDto } from "../../../../types/domain/define/NoteDto";
import apiUrls from "../../../../utils/consts/apiUrls";
import myAxios from "../../../../utils/consts/myAxios";
import DarkButton from "../../../_UI/Buttons/DarkButton";
import { TBody, TD, THead, TR } from "../../../_UI/Table/MyTableWrappers";
import DocTableRow from "./DocTableRow/DocTableRow";

const DocTable = (props: Props) => {
  const docsStore = useDocsStore();

  const classes = useStyles();

  const addNote = () => {
    setSubmitting(true);
    const newNote = newNoteDto(sortedNotes().length, props.docId, props.userId);
    myAxios
      .post<NoteDto>(apiUrls.define.note, newNote)
      .then((res) => {
        docsStore.pushOrReplaceNote(res.data);
      })
      .finally(() => setSubmitting(false));
  };

  const sortedNotes = () => {
    const filtered = docsStore.notes.filter(
      (note) => note.docId === props.docId
    );
    const sorted = filtered.sort((a, b) => a.index - b.index);
    return sorted;
  };

  const [throttle, setThrottle] = useState<NodeJS.Timeout>(null);

  const handleNoteChange = (changed: NoteDto) => {
    clearTimeout(throttle);
    setThrottle(
      setTimeout(() => {
        myAxios.post<NoteDto>(apiUrls.define.note, changed).then((res) => {
          docsStore.pushOrReplaceNote(res.data);
        });
      }, 500)
    );
  };

  const getRowKey = (note: NoteDto) => {
    return `${note.id}-${note.weight}`;
  };

  const [submitting, setSubmitting] = useState(false);

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
              <TD className={classes.th} align="center">
                #
              </TD>
              <TD className={classes.th}>Notes</TD>
              <TD className={classes.th}>Flashcard Question</TD>
              <TD align="center" className={classes.th}>
                Weight
              </TD>
            </TR>
          </THead>

          <TBody>
            {sortedNotes().map((note, index) => (
              <DocTableRow
                index={index}
                key={getRowKey(note)}
                initialValue={note}
                onChange={handleNoteChange}
              />
            ))}
          </TBody>
        </Table>
      </TableContainer>

      <Toolbar>
        <DarkButton onClick={addNote} disabled={submitting}>
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

const mapStateToProps = (state: ApplicationState) => ({
  userId: state.auth.user.id,
});

interface OwnProps {
  docId: number;
}

type Props = ReturnType<typeof mapStateToProps> & OwnProps;

export default connect(mapStateToProps, undefined)(DocTable);
