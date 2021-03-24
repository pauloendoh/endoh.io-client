import { Box, Container } from "@material-ui/core"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import MonerateDescription from "../../components/descriptions/MonerateDescription"
import RelearnDescription from "../../components/descriptions/RelearnDescription"
import { logoutActionCreator } from "../../store/auth/authActions"
import { ApplicationState } from "../../store/store"

function Home(props: Props) {
  useEffect(() => {
    document.title = "Home - Endoh.io"
  }, [])

  return (
    <Container maxWidth="lg">
      <Box mt={10}>
        <RelearnDescription />
      </Box>

      <Box mt={10}>
        <MonerateDescription />
      </Box>
    </Container>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  user: state.auth.user,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(logoutActionCreator(dispatch)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(Home)
