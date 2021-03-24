import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Button, Tooltip } from "@material-ui/core"
import FlexVCenter from "../../components/shared/Flexboxes/FlexVCenter"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import Flex from "../../components/shared/Flexboxes/Flex"
import * as relearnActions from "../../store/relearn/relearnActions"
import { ApplicationState } from "../../store/store"

// PE 2/3 - I won't use this in the future, probably.
function RelearnNavbarContent(props: Props) {
  return (
    <Flex ml={5}>
      <Tooltip title="(q) Quick Add Resource">
        <Button
          variant="contained"
          color="primary"
          onClick={props.startNewResource}
          id="add-resource-button"
          style={{ width: 130 }}
        >
          <FlexVCenter>
            <FontAwesomeIcon icon={faPlus} />
            <Box ml={1}>Add Resource</Box>
          </FlexVCenter>
        </Button>
      </Tooltip>
    </Flex>
  )
}

// const useStyles = makeStyles((theme: Theme) => createStyles({}))

const mapStateToProps = (state: ApplicationState) => ({
  // user: state.auth.user,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startNewResource: () => dispatch(relearnActions.startNewResource()),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RelearnNavbarContent)
