import { Box, makeStyles } from "@material-ui/core";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Dispatch } from "redux";
import { urls } from "utils/urls";
import Flex from "../../components/shared/Flexboxes/Flex";
import { setDocs, setNotes } from "../../store/define/defineActions";
import { ApplicationState } from "../../store/store";
import useSidebarStore from "../../store/zustand/useSidebarStore";
import { DocDto } from "../../types/domain/define/DocDto";
import { NoteDto } from "../../types/domain/define/NoteDto";
import apiUrls from "../../utils/consts/apiUrls";
import myAxios from "../../utils/consts/myAxios";
import LoadingPage from "../index/LoadingPage";
import DefineContent from "./DefineContent/DefineContent";
import DefineSidebar from "./DefineSidebar/DefineSidebar";

// PE 3/3
const DefinePage = (props: Props) => {
  const { docId } = useParams<{ docId: string }>();

  const [selectedDocId, setSelectedDocId] = useState<number>(null);

  const { sidebarIsOpen, openSidebar } = useSidebarStore();

  useEffect(
    () => {
      openSidebar();

      myAxios.get<DocDto[]>(apiUrls.define.doc).then((res) => {
        props.setDocs(res.data);
      });

      myAxios.get<NoteDto[]>(apiUrls.define.note).then((res) => {
        props.setNotes(res.data);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (docId && props.hasFirstLoaded) {
      setSelectedDocId(Number(docId));

      const doc = props.allDocs.find((doc) => doc.id === Number(docId));
      document.title = doc.title;
    } else {
      setSelectedDocId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docId]);

  const history = useHistory();
  useEffect(
    () => {
      // open last opened tag
      if (!docId && props.allDocs?.length > 0) {
        const sortedByLastOpened = props.allDocs.sort((a, b) => {
          if (a.lastOpenedAt === undefined) return -1;
          if (b.lastOpenedAt === undefined) return 1;

          return a.lastOpenedAt > b.lastOpenedAt ? -1 : 1;
        });

        const docId = sortedByLastOpened[0].id;
        history.push(urls.pages.define.docId(docId));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.allDocs, docId]
  );

  const classes = useStyles();

  return (
    <Box p={3}>
      <Flex height="100%">
        <DefineSidebar selectedDocId={selectedDocId} />
        <Box
          className={classNames(classes.content, {
            [classes.contentShift]: sidebarIsOpen,
          })}
          flexGrow={1}
        >
          {props.hasFirstLoaded ? (
            <React.Fragment>
              {selectedDocId && <DefineContent docId={selectedDocId} />}
            </React.Fragment>
          ) : (
            <LoadingPage />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,

    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 300,
  },
}));
type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: ApplicationState) => ({
  hasFirstLoaded: state.define.hasFirstLoaded,
  allDocs: state.define.docs,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setDocs: (docs: DocDto[]) => dispatch(setDocs(docs)),
  setNotes: (notes: NoteDto[]) => dispatch(setNotes(notes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefinePage);
