import { faChessKnight, faLink } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import NotesIcon from "@mui/icons-material/Notes"
import TimeLineIcon from "@mui/icons-material/Timeline"
import useNewResourcesCountQuery from "hooks/react-query/feed/last-seen-resource/useNewResourcesCountQuery"
import { ReactElement, ReactNode, useMemo } from "react"
import { urls } from "utils/urls"

interface ITab {
  id: string
  to: string
  label: ReactNode
  icon: ReactElement
  badgeCount?: number
}

const useUtils = () => {
  const { data: newResourcesCount } = useNewResourcesCountQuery()

  const navbarTabs = useMemo(() => {
    return [
      {
        id: "resources-tab",
        to: urls.pages.resources.index,
        label: "Resources",
        icon: <FontAwesomeIcon icon={faLink} />,
      },
      {
        id: "feed-tab",
        to: urls.pages.feed.index,
        label: "Feed",
        badgeCount: newResourcesCount,
        icon: <TimeLineIcon />,
      },
      {
        id: "skill-tab",
        to: urls.pages.skills.index,
        label: "Skills",
        icon: <FontAwesomeIcon icon={faChessKnight} />,
      },
      {
        id: "notes-tab",
        to: urls.pages.questions.index,
        label: "Questions",
        icon: <NotesIcon />,
      },
      // {
      //   id: "learning-diary-tab",
      //   to: urls.pages.learningDiary,
      //   label: "Learning Diary",
      //   icon: <BsFillJournalBookmarkFill />,
      // },
    ] as ITab[]
  }, [newResourcesCount])

  return {
    navbarTabs,
  }
}

export default useUtils
