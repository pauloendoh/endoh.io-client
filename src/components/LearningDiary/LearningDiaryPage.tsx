import { Box, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { useEffect } from "react";
import useSidebarStore from "../../store/zustand/useSidebarStore";
import Flex from "../_UI/Flexboxes/Flex";
import DiaryTable from "./DiaryTable/DiaryTable";

const LearningDiaryPage = () => {
  const classes = useStyles();

  const { sidebarIsOpen, closeSidebar } = useSidebarStore();

  useEffect(() => {
    closeSidebar();
  }, []);

  return (
    <Flex height="100%" pt={5} justifyContent="center">
      <Box
        className={clsx(classes.content, {
          [classes.contentShift]: sidebarIsOpen,
        })}
      >
        <Box width="100%">
          <DiaryTable />
        </Box>
      </Box>
    </Flex>
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
