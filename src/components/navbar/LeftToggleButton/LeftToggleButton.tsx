import { IconButton } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import React from "react"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import PATHS from "../../../consts/PATHS"
import { setSidebarIsOpen } from "../../../store/skillbase/skillbaseActions"
import { ApplicationState } from "../../../store/store"
const LeftToggleButton = (props: Props) => {
  const location = useLocation()

  return (
    <React.Fragment>
      {location.pathname.startsWith(PATHS.skillbase.index) && (
        <IconButton
          onClick={() => {
            props.setSidebarIsOpen(!props.sidebarIsOpen)
          }}
          aria-label="right-sidebar-toggle"
        >
          <MenuIcon />
        </IconButton>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  sidebarIsOpen: state.skillbase.sidebarIsOpen,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSidebarIsOpen: (value: boolean) => dispatch(setSidebarIsOpen(value)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(LeftToggleButton)
