import DeleteIcon from "@material-ui/icons/Delete"
import {
  Box,
  Button,
  createStyles,
  Drawer,
  IconButton,
  makeStyles,
  Paper,
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
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter"
import API from "../../../consts/API"
import MY_AXIOS from "../../../consts/MY_AXIOS"
import { ProgressDto } from "../../../dtos/skillbase/ProgressDto"
import { setProgresses } from "../../../store/skillbase/skillbaseActions"
import { ApplicationState } from "../../../store/store"
import Flex from "../../../components/shared/Flexboxes/Flex"
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
      const days = resultDays.map((d) => d.day)
      const progressDay = progress.createdAt.substring(0, 10)

      const index = resultDays.findIndex((r) => r.day === progressDay)
      if (~index) {
        resultDays[index].progresses.push(progress)
      } else {
        resultDays.push({ day: progressDay, progresses: [progress] })
      }
    }
    return resultDays
  }

  const handleDelete = (progressId: number) => {
    if (window.confirm("Confirm delete?")) {
      MY_AXIOS.delete<ProgressDto[]>(
        API.skillbase.progress + "/" + progressId
      ).then((res) => {
        props.setProgresses(res.data)
      })
    }
  }

  return (
    <Drawer
      anchor="right"
      className={classes.root}
      variant="persistent"
      open={props.sidebarIsOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <Box p={3} className={classes.drawerContainer}>
        <Typography variant="h5">Your Progress</Typography>
        <Box mt={2} />

        <Timeline>
          {progressesPerDay.map((day, index) => (
            <TimelineItem key={index} className={classes.timelineItem}>
              <TimelineSeparator>
                <TimelineDot />
                {progressesPerDay.length > index + 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Box>{day.day}</Box>
                <Paper>
                  <Box px={2} py={1} position="relative">
                    {day.progresses.map((progress, i) => (
                      <ProgressItem
                        progress={progress}
                        index={i}
                        key={progress.id}
                      />
                    ))}
                  </Box>
                </Paper>
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
    drawerContainer: {
      // overflow: "auto",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    listItemIcon: {
      minWidth: 32,
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
