import {
  Box,
  createStyles,
  Drawer,
  List,
  makeStyles,
  Theme,
  Toolbar,
} from "@mui/material"
import useSidebarStore from "../../../store/zustand/useSidebarStore"
import AnsweredQuestionsListItem from "./AnsweredQuestionsListItem/AnsweredQuestionsListItem"
import FileSystem from "./FileSystem/FileSystem"
import QuestionsToRefineListItem from "./QuestionsToRefineListItem/QuestionsToRefineListItem"
import UnansweredQuestionsListItem from "./UnansweredQuestionsListItem/UnansweredQuestionsListItem"

interface Props {
  selectedDocId: number
}

function DefineSidebar(props: Props) {
  // PE 2/3 - change to styled-components ?
  const classes = useStyles()
  const { sidebarIsOpen } = useSidebarStore()

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
          <AnsweredQuestionsListItem />
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
