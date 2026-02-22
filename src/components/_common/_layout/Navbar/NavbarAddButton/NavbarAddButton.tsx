import { Fab, Tooltip } from "@mui/material"
import { useMemo } from "react"
import { useLocation } from "react-router-dom"
import Icons from "utils/styles/Icons"
import { useQHotkey } from "./useQHotkey"

type Props = {
  onClick: () => void
}
// PE 2/3
const NavbarAddButton = (props: Props) => {
  const location = useLocation()

  const isQuestionsPage = useMemo(() => {
    return location.pathname.includes("questions")
  }, [location.pathname])

  const { runQHotkeyManually: runQHotkey } = useQHotkey()

  return (
    <Tooltip title={isQuestionsPage ? "(q) New question" : "(q) New resource"}>
      <Fab
        id="navbar-add-btn"
        onClick={props.onClick}
        color="primary"
        style={{
          width: "1.875rem",
          height: "1.875rem",
          minHeight: "1.875rem",
        }}
      >
        <Icons.Add />
      </Fab>
    </Tooltip>
  )
}

export default NavbarAddButton
