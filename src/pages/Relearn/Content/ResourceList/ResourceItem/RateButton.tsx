import {
  Box,
  Button,
  ClickAwayListener,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core"
import StarRateIcon from "@material-ui/icons/StarRate"
import { Rating } from "@material-ui/lab"
import FlexHCenter from "../../../../../components/shared/Flexboxes/FlexHCenter"
import FlexVCenter from "../../../../../components/shared/Flexboxes/FlexVCenter"
import API from "../../../../../consts/API"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import myAxios from "../../../../../utils/myAxios"
import { ResourceDto } from "../../../../../dtos/relearn/ResourceDto"
import { ApplicationState } from "../../../../../store/store"
import * as relearnActions from "../../../../../store/relearn/relearnActions"

function RateButton(props: Props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const handleTooltipClose = () => {
    setOpen(false)
  }
  const handleTooltipOpen = () => {
    setOpen(true)
  }

  const [rating, setRating] = React.useState<number | null>(
    props.resource.rating
  )
  const [hover, setHover] = React.useState(-1)

  const handleSaveRating = (rating: number) => {
    setRating(rating)
    setOpen(false)

    const resource = { ...props.resource, rating } as ResourceDto
    myAxios.post<ResourceDto[]>(API.relearn.resource, resource).then((res) => {
      props.setResources(res.data)
    })
  }

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Box>
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
            <React.Fragment>
              <Rating
                name="rating-input"
                value={rating}
                onChange={(event, newValue) => {
                  handleSaveRating(newValue)
                  // setValue(newValue)
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover)
                }}
              />
              <FlexHCenter>
                {rating !== null ? (
                  <Typography>
                    {labels[hover !== -1 ? hover : rating]}
                  </Typography>
                ) : (
                  <Typography>Select</Typography>
                )}
              </FlexHCenter>
            </React.Fragment>
          }
        >
          <Button
            size="small"
            onClick={handleTooltipOpen}
            variant="outlined"
            className={classes.rateButton}
          >
            <FlexVCenter>
              <StarRateIcon />
              {props.resource.rating > 0 ? (
                <Box mr={1}>
                  {props.resource.rating} - {labels[props.resource.rating]}
                </Box>
              ) : (
                <Box mr={1}>Rate</Box>
              )}
            </FlexVCenter>
          </Button>
        </Tooltip>
      </Box>
    </ClickAwayListener>
  )
}

const labels: { [index: string]: string } = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
}

const useStyles = makeStyles((theme) => ({
  rateButton: {
    color: "#ffb400",
    border: "1px solid #ffb400",
    width: 135
  },
}))

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setResources: (resources: ResourceDto[]) =>
    dispatch(relearnActions.setResources(resources)),
})

interface OwnProps {
  resource: ResourceDto
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(RateButton)
