import { faChessKnight, faLink } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import NotesIcon from "@material-ui/icons/Notes"
import TimeLineIcon from "@material-ui/icons/Timeline"
import { ReactElement, ReactNode } from "react"
import pageUrls from "../../../../utils/url/urls/pageUrls"

interface ITab {
  id: string
  to: string
  label: ReactNode
  icon: ReactElement
}

const utils = {
  navbarTabs: [
    {
      id: "resources-tab",
      to: pageUrls.relearn.index,
      label: "Resources",
      icon: <FontAwesomeIcon icon={faLink} />,
    },
    {
      id: "feed-tab",
      to: pageUrls.feed.index,
      label: "Feed",
      icon: <TimeLineIcon />,
    },
    {
      id: "skill-tab",
      to: pageUrls.skillbase.index,
      label: "Skills",
      icon: <FontAwesomeIcon icon={faChessKnight} />,
    },
    {
      id: "notes-tab",
      to: pageUrls.define.index,
      label: "Questions",
      icon: <NotesIcon />,
    },
    // {
    //   id: "decisions-tab",
    //   to: pageUrls.BigDecisions.index,
    //   label: "Decisions",
    //   icon: <FontAwesomeIcon icon={faBalanceScaleRight} />,
    // },
  ] as ITab[],
}

export default utils
