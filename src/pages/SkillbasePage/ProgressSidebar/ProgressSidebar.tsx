import {
  Box,
  createStyles,
  Drawer,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core"
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@material-ui/lab"
import { DateTime } from "luxon"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { ProgressDto } from "../../../dtos/skillbase/ProgressDto"
import { setProgresses } from "../../../store/skillbase/skillbaseActions"
import { ApplicationState } from "../../../store/store"
import useSidebarStore from "../../../store/zustand/useSidebarStore"
import ProgressItem from "./ProgressItem/ProgressItem"
interface IProgressPerDay {
  day: string
  progresses: ProgressDto[]
}

function ProgressSidebar(props: Props) {
  const classes = useStyles()

  const [progressesPerDay, setProgressesPerDay] = useState<IProgressPerDay[]>(
    []
  )

  const { sidebarIsOpen } = useSidebarStore()

  useEffect(
    () => {
      setProgressesPerDay(splitProgressesPerDay(props.progresses))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.progresses]
  )

  const splitProgressesPerDay = (
    progresses: ProgressDto[]
  ): IProgressPerDay[] => {
    const resultDays: IProgressPerDay[] = []
    for (const progress of progresses) {
      let progressDay = ""
      if (
        new Date().toISOString().substring(0, 10) ===
        progress.createdAt.substring(0, 10)
      ) {
        progressDay = "Today"
      } else {
        progressDay = DateTime.fromISO(progress.createdAt).toFormat("LLL dd")
      }

      const index = resultDays.findIndex((r) => r.day === progressDay)
      if (~index) {
        resultDays[index].progresses.push(progress)
      } else {
        resultDays.push({ day: progressDay, progresses: [progress] })
      }
    }
    return resultDays
  }

  // const handleDelete = (progressId: number) => {
  //   if (window.confirm("Confirm delete?")) {
  //     MY_AXIOS.delete<ProgressDto[]>(
  //       API.skillbase.progress + "/" + progressId
  //     ).then((res) => {
  //       props.setProgresses(res.data)
  //     })
  //   }
  // }

  return (
    <Drawer
      anchor="left"
      className={classes.root}
      variant="persistent"
      open={sidebarIsOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <Box p={3}>
        <Typography variant="h5">Your Progress</Typography>
        <Box mt={2} />

        <Timeline>
          {progressesPerDay.map((day, index) => (
            <TimelineItem key={index} className={classes.timelineItem}>
              <TimelineSeparator>
                <TimelineDot />
                {progressesPerDay.length > index + 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent style={{ padding: 5 }}>
                <Box className={classes.day}>{day.day}</Box>
                <Box py={1}>
                  {day.progresses.map((progress, i) => (
                    <ProgressItem
                      progress={progress}
                      index={i}
                      key={progress.id}
                    />
                  ))}
                </Box>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    </Drawer>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
    },
    timelineItem: {
      "&:before": {
        display: "none",
      },
    },
    drawerPaper: {
      width: 300,
      background: "#202020",
      borderRight: "1px solid rgba(255, 255, 255, 0.05)",
    },

    day: {
      color: theme.palette.grey[400],
    },
  })
)

const mapStateToProps = (state: ApplicationState) => ({
  progresses: state.skillbase.progresses,
  sidebarIsOpen: state.skillbase.sidebarIsOpen,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setProgresses: (progresses: ProgressDto[]) =>
    dispatch(setProgresses(progresses)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(ProgressSidebar)
