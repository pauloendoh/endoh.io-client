import { Box, makeStyles } from "@material-ui/core";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import useDocsStore from "store/zustand/domain/useDocsStore";
import pageUrls from "utils/url/urls/pageUrls";
import useSidebarStore from "../../store/zustand/useSidebarStore";
import { DocDto } from "../../types/domain/define/DocDto";
import { NoteDto } from "../../types/domain/define/NoteDto";
import myAxios from "../../utils/consts/myAxios";
import apiUrls from "../../utils/url/urls/apiUrls";
import LoadingPage from "../_common/LoadingPage/LoadingPage";
import Flex from "../_UI/Flexboxes/Flex";
import DefineContent from "./DefineContent/DefineContent";
import DefineSidebar from "./DefineSidebar/DefineSidebar";

// PE 3/3
const DefinePage = () => {
  const { docId } = useParams<{ docId: string }>();

  const docsStore = useDocsStore();

  const [selectedDocId, setSelectedDocId] = useState<number>(null);

  const { sidebarIsOpen, openSidebar } = useSidebarStore();

  useEffect(
    () => {
      openSidebar();

      myAxios.get<DocDto[]>(apiUrls.define.doc).then((res) => {
        docsStore.setDocs(res.data);
      });

      myAxios.get<NoteDto[]>(apiUrls.define.note).then((res) => {
        docsStore.setNotes(res.data);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (docId && docsStore.hasFirstLoaded) {
      setSelectedDocId(Number(docId));

      const doc = docsStore.docs.find((doc) => doc.id === Number(docId));
      document.title = doc.title;
    } else {
      setSelectedDocId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docId, docsStore.docs]);

  const history = useHistory();
  useEffect(
    () => {
      // open last opened tag
      if (!docId && docsStore.docs?.length > 0) {
        const sortedByLastOpened = docsStore.docs.sort((a, b) => {
          if (a.lastOpenedAt === undefined) return -1;
          if (b.lastOpenedAt === undefined) return 1;

          return a.lastOpenedAt > b.lastOpenedAt ? -1 : 1;
        });

        const docId = sortedByLastOpened[0].id;
        history.push(pageUrls.define.docId(docId));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [docsStore.docs, docId]
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
          {docsStore.hasFirstLoaded ? (
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

export default DefinePage;
