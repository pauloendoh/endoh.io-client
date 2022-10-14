import {
  Box,
  createStyles,
  Drawer,
  List,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core"
import useSaveDocLastOpenedAt from "hooks/react-query/define/useSaveDocLastOpenedAt"
import sample from "lodash/sample"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import useDocsStore from "store/zustand/domain/useDocsStore"
import { pushOrReplace } from "utils/array/pushOrReplace"
import useSidebarStore from "../../../store/zustand/useSidebarStore"
import pageUrls from "../../../utils/url/urls/pageUrls"
import FileSystem from "./FileSystem/FileSystem"
import QuestionsToRefineListItem from "./QuestionsToRefineListItem/QuestionsToRefineListItem"
import UnansweredQuestionsListItem from "./UnansweredQuestionsListItem/UnansweredQuestionsListItem"

interface Props {
  selectedDocId: number
}

function DefineSidebar(props: Props) {
  // PE 2/3 - change to styled-components ?
  const classes = useStyles()
  const history = useHistory()
  const docsStore = useDocsStore()
  const { sidebarIsOpen } = useSidebarStore()
  const { mutate: saveDocLastOpenedAt } = useSaveDocLastOpenedAt()

  const [openTitleDialog, setOpenTitleDialog] = useState(false)

  // PE 2/3 - name too big?
  const handleSaveDocLastOpenedAt = (docId: number) => {
    saveDocLastOpenedAt(docId, {
      // PE 2/3 - do you have to do this? I don't think so :thinking:
      onSuccess: (savedDoc) => {
        const docs = pushOrReplace([...docsStore.docs], savedDoc, "id")
        docsStore.setDocs(docs)
      },
    })
  }

  const openRandomDoc = () => {
    if (docsStore.docs.length > 0) {
      const randomDoc = sample(docsStore.docs)
      history.push(pageUrls.define.docId(randomDoc.id))
      handleSaveDocLastOpenedAt(randomDoc.id)
    }
  }

  return (
    <Drawer
      className={classes.root}
      variant="persistent"
      open={sidebarIsOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <Box paddingBottom={4}>
        <List disablePadding>
          <UnansweredQuestionsListItem />
          <QuestionsToRefineListItem />
          {/* <ListItem>
            <ListItemText>
              <FlexVCenter justifyContent="space-between">
                <FlexVCenter>
                  <Tooltip title="Open random doc">
                    <IconButton size="small" onClick={openRandomDoc}>
                      <ShuffleIcon />
                    </IconButton>
                  </Tooltip>

                  <Box ml={1} />
                  <Tooltip title="Add doc">
                    <IconButton
                      size="small"
                      onClick={() => setOpenTitleDialog(true)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </FlexVCenter>

                <DocTitleDialog
                  open={openTitleDialog}
                  initialValue={{ title: "" }}
                  onClose={() => setOpenTitleDialog(false)}
                  afterSave={(doc) => {
                    history.push(pageUrls.define.docId(doc.id))
                    setOpenTitleDialog(false)
                  }}
                />
              </FlexVCenter>
            </ListItemText>
          </ListItem> */}
        </List>

        <FileSystem />
      </Box>
    </Drawer>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
    },

    drawerPaper: {
      width: 300,
      background: "#202020",
      borderRight: "1px solid rgba(255, 255, 255, 0.05)",
    },
  })
)

export default DefineSidebar
