import { Box, Container, Grid, Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import clsx from "clsx"
import FlexVCenterBetween from "components/_UI/Flexboxes/FlexVCenterBetween"
import useDaysWithLearnings from "hooks/learning-diary/useDaysWithLearnings"
import { useEffect } from "react"
import useLearningDiaryStore from "store/zustand/domain/useLearningDiaryStore"
import useSidebarStore from "../../store/zustand/useSidebarStore"
import Flex from "../_UI/Flexboxes/Flex"
import AvgLearning from "./AvgLearning/AvgLearning"
import AvgLearningAtCurrentTime from "./AvgLearningAtCurrentTime/AvgLearningAtCurrentTime"
import DiaryTable from "./DiaryTable/DiaryTable"
import LearningDayCounter from "./LearningDayCounter/LearningDayCounter"

const LearningDiaryPage = () => {
  const classes = useStyles()

  const { selectedDate, setSelectedDate } = useLearningDiaryStore()
  const { sidebarIsOpen, closeSidebar } = useSidebarStore()

  const sortedDays = useDaysWithLearnings()

  useEffect(() => {
    closeSidebar()
  }, [])

  useEffect(() => {
    console.log(selectedDate)
  }, [selectedDate])

  return (
    <Flex height="100%" pt={5} justifyContent="center">
      <Box
        className={clsx(classes.content, {
          [classes.contentShift]: sidebarIsOpen,
        })}
      >
        <Box width="100%">
          <Grid container>
            <Grid item xs={9}>
              <FlexVCenterBetween>
                <LearningDayCounter />
                {/* <DatePicker
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={parseISO(selectedDate)}
                  autoOk
                  onChange={(date, val) =>
                    setSelectedDate(DateTime.fromJSDate(date).toISODate())
                  }
                  renderDay={(day, _, currentMonth) => {
                    const luxonDay = DateTime.fromJSDate(day)
                    const isoDay = luxonDay.toISODate()
                    return (
                      <Day selected={isoDay === selectedDate}>
                        <div
                          style={{
                            color: currentMonth ? "unset" : "grey",
                            position: "relative",
                          }}
                        >
                          {sortedDays.includes(isoDay) && (
                            <div
                              style={{
                                position: "absolute",
                                background: "red",
                                width: 8,
                                height: 8,
                                borderRadius: 8,
                                right: "-8px",
                                top: "-4px",
                              }}
                            />
                          )}
                          <span>{luxonDay.day}</span>
                        </div>
                      </Day>
                    )
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                /> */}
              </FlexVCenterBetween>
              <DiaryTable />
            </Grid>
            <Grid item xs={3}>
              <Container>
                <AvgLearning />
                <Box mt={2} />
                <AvgLearningAtCurrentTime />
              </Container>
            </Grid>
          </Grid>
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
