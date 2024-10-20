import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { Box, createStyles, Drawer, List, Toolbar } from "@mui/material"
import useSidebarStore from "../../../store/zustand/useSidebarStore"
import AnsweredQuestionsListItem from "./AnsweredQuestionsListItem/AnsweredQuestionsListItem"
import DocsFolderSystem from "./DocsFolderSystem/DocsFolderSystem"
import QuestionsToRefineListItem from "./QuestionsToRefineListItem/QuestionsToRefineListItem"
import UnansweredQuestionsListItem from "./UnansweredQuestionsListItem/UnansweredQuestionsListItem"

interface Props {
  selectedDocId: number | null
}

function QuestionsSidebar(props: Props) {
  const classes = useStyles()
  const { sidebarIsOpen } = useSidebarStore()

  const container =
    window !== undefined ? () => window.document.body : undefined

  return (
    <Drawer
      className={classes.root}
      variant="persistent"
      open={sidebarIsOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
      container={container}
    >
      <Toolbar />
      <Box paddingBottom={4}>
        <List disablePadding>
          <UnansweredQuestionsListItem />
          <QuestionsToRefineListItem type="to-refine" />
          <QuestionsToRefineListItem type="both-types" />
          <AnsweredQuestionsListItem />
        </List>

        <DocsFolderSystem />
      </Box>
    </Drawer>
  )
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
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

export default QuestionsSidebar
