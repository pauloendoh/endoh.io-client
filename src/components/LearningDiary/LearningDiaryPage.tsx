import { parseISO } from "date-fns";

import DateFnsUtils from "@date-io/date-fns";

import { Box, makeStyles } from "@material-ui/core";
import {
  Day,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import clsx from "clsx";
import FlexVCenterBetween from "components/_UI/Flexboxes/FlexVCenterBetween";
import { useLearningsQuery } from "generated/graphql";
import { DateTime } from "luxon";
import { useEffect, useMemo } from "react";
import useLearningDiaryStore from "store/zustand/domain/useLearningDiaryStore";
import buildGraphqlClient from "utils/consts/buildGraphqlClient";
import useSidebarStore from "../../store/zustand/useSidebarStore";
import Flex from "../_UI/Flexboxes/Flex";
import DiaryTable from "./DiaryTable/DiaryTable";
import LearningDayCounter from "./LearningDayCounter/LearningDayCounter";

const LearningDiaryPage = () => {
  const classes = useStyles();

  const { selectedDate, setSelectedDate } = useLearningDiaryStore();
  const { sidebarIsOpen, closeSidebar } = useSidebarStore();

  const { data } = useLearningsQuery(buildGraphqlClient());
  const learnings = useMemo(() => data?.learnings || [], [data]);

  const sortedDays = useMemo(() => {
    const days = learnings.reduce(
      (result, learning) => {
        if (!result.includes(learning.date)) return [...result, learning.date];
        return result;
      },
      [new Date().toISOString().split("T")[0]]
    );
    return days.sort();
  }, [learnings]);

  useEffect(() => {
    closeSidebar();
  }, []);

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Flex height="100%" pt={5} justifyContent="center">
        <Box
          className={clsx(classes.content, {
            [classes.contentShift]: sidebarIsOpen,
          })}
        >
          <Box width="100%">
            <FlexVCenterBetween>
              <LearningDayCounter />
              <KeyboardDatePicker
                disableToolbar
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
                  const luxonDay = DateTime.fromJSDate(day);
                  const isoDay = luxonDay.toISODate();
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
                  );
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </FlexVCenterBetween>
            <DiaryTable />
          </Box>
        </Box>
      </Flex>
    </MuiPickersUtilsProvider>
  );
};

const useStyles = makeStyles((theme) => ({
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
}));

export default LearningDiaryPage;
