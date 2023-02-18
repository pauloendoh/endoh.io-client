import { Button, Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { Box } from "@mui/material"
import clsx from "clsx"
import FlexVCenterBetween from "components/_UI/Flexboxes/FlexVCenterBetween"
import { useMyMediaQuery } from "hooks/utils/useMyMediaQuery"
import { useEffect } from "react"
import useLearningsPerDayDialogStore from "store/zustand/dialogs/useLearningsPerDayDialogStore"
import useLearningDiaryStore from "store/zustand/domain/useLearningDiaryStore"
import useSidebarStore from "../../store/zustand/useSidebarStore"
import Flex from "../_UI/Flexboxes/Flex"
import DiaryTable from "./DiaryTable/DiaryTable"
import HoursPointsToAchieve from "./HoursPointsToAchieve/HoursPointsToAchieve"
import LearningChart from "./LearningChart/LearningChart"
import LearningDayCounter from "./LearningDayCounter/LearningDayCounter"

const LearningDiaryPage = () => {
  const classes = useStyles()

  const { selectedDate } = useLearningDiaryStore()
  const { sidebarIsOpen, closeSidebar } = useSidebarStore()

  const { downSm } = useMyMediaQuery()

  useEffect(() => {
    document.title = "Learning Diary"
    closeSidebar()
  }, [])

  useEffect(() => {
    console.log(selectedDate)
  }, [selectedDate])

  const { openDialog: openLearningsPerDayDialog } =
    useLearningsPerDayDialogStore()

  return (
    <Flex height="100%" justifyContent="center">
      <Box
        className={clsx(classes.content, {
          [classes.contentShift]: sidebarIsOpen,
        })}
      >
        <Box width="100%">
          <LearningChart />
          <FlexVCenterBetween mt={4}>
            <LearningDayCounter />

            {!downSm && <HoursPointsToAchieve />}

            <Button
              onClick={openLearningsPerDayDialog}
              sx={{
                textDecoration: "underline",
              }}
            >
              Insights
            </Button>
          </FlexVCenterBetween>

          <Box mt={2} />
          <DiaryTable />
        </Box>
      </Box>
    </Flex>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: 1200,
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
}))

export default LearningDiaryPage
