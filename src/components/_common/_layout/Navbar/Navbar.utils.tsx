import { faChessKnight, faLink } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import NotesIcon from "@mui/icons-material/Notes"
import TimeLineIcon from "@mui/icons-material/Timeline"
import { ReactElement, ReactNode } from "react"
import { urls } from "utils/urls"
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
      to: urls.pages.relearn.index,
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
  ] as ITab[],
}

export default utils
