import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Button } from "@mui/material"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import * as relearnActions from "../../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../../store/store"
import FlexVCenter from "../../../_UI/Flexboxes/FlexVCenter"

// PE 2/3 - I won't use this in the future, probably.
function AddResourceButton(props: Props) {
  return (
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
  )
}

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startNewResource: () => dispatch(relearnActions.startNewResource()),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(AddResourceButton)
