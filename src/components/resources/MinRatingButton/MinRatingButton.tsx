import {
  Box,
  Button,
  ClickAwayListener,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core"
import { Rating } from "@material-ui/lab"
import clsx from "clsx"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { ApplicationState } from "../../../store/store"
import * as utilsActions from "../../../store/utils/utilsActions"
import FlexHCenter from "../../shared/Flexboxes/FlexHCenter"
import FlexVCenter from "../../shared/Flexboxes/FlexVCenter"

function MinRatingButton(props: Props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const handleTooltipClose = () => {
    setOpen(false)
  }
  const handleTooltipOpen = () => {
    setOpen(true)
  }

  // const [rating, setRating] = React.useState<number | null>(props.value)
  const [hover, setHover] = React.useState(-1)

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        arrow
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={open}
        interactive
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={
          <Box>
            <Rating
              name="rating-input"
              value={props.value}
              onChange={(event, newValue) => {
                // setRating(rating)
                setOpen(false)
                props.onChange(newValue)
              }}
              onChangeActive={(event, newHover) => {
                if (newHover === props.value) {
                  setHover(0)
                } else {
                  setHover(newHover)
                }
              }}
            />
            <FlexHCenter>
              <Typography>
                {labels[hover !== -1 ? hover : props.value]}
              </Typography>
            </FlexHCenter>
          </Box>
        }
      >
        <Button
          size="small"
          onClick={handleTooltipOpen}
          // variant="outlined"
          className={clsx([classes.rateButton, "rate-button"])}
        >
          <FlexVCenter>
            <Box>Min. rating: </Box>
            {props.value > 0 ? (
              <Box ml={1}>
                {props.value} - {labels[props.value]}
              </Box>
            ) : (
              <Box ml={1}>-</Box>
            )}
          </FlexVCenter>
        </Button>
      </Tooltip>
    </ClickAwayListener>
  )
}

const labels: { [index: string]: string } = {
  null: "All ratings",
  0: "All ratings",
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
}

const useStyles = makeStyles((theme) => ({
  rateButton: {
    position: "relative",
    right: 8,
  },
}))

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
})

interface OwnProps {
  value: number
  onChange: (newRating: number) => void
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(MinRatingButton)
