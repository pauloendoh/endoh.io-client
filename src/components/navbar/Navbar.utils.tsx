import {
  faBalanceScaleRight,
  faChessKnight,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotesIcon from "@material-ui/icons/Notes";
import TimeLineIcon from "@material-ui/icons/Timeline";
import { ReactElement, ReactNode } from "react";
import PATHS from "../../utils/consts/PATHS";

interface ITab {
  id: string;
  to: string;
  label: ReactNode;
  icon: ReactElement;
}

const utils = {
  navbarTabs: [
    {
      id: "resources-tab",
      to: PATHS.relearn.index,
      label: "Resources",
      icon: <FontAwesomeIcon icon={faLink} />,
    },
    {
      id: "feed-tab",
      to: PATHS.feed.index,
      label: "Feed",
      icon: <TimeLineIcon />,
    },
    {
      id: "skill-tab",
      to: PATHS.skillbase.index,
      label: "Skills",
      icon: <FontAwesomeIcon icon={faChessKnight} />,
    },
    {
      id: "notes-tab",
      to: PATHS.define.index,
      label: "Notes",
      icon: <NotesIcon />,
    },
    {
      id: "decisions-tab",
      to: PATHS.BigDecisions.index,
      label: "Decisions",
      icon: <FontAwesomeIcon icon={faBalanceScaleRight} />,
    },
  ] as ITab[],
};

export default utils;
