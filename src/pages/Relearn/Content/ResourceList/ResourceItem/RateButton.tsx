import {
  Box,
  Button,
  ClickAwayListener,
  makeStyles,
  Tooltip,
  Typography
} from "@material-ui/core"
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined'
import { Rating } from "@material-ui/lab"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import FlexHCenter from "../../../../../components/shared/Flexboxes/FlexHCenter"
import FlexVCenter from "../../../../../components/shared/Flexboxes/FlexVCenter"
import API from "../../../../../consts/API"
import MY_AXIOS from "../../../../../consts/MY_AXIOS"
import { ResourceDto } from "../../../../../interfaces/dtos/relearn/ResourceDto"
import * as relearnActions from "../../../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../../../store/store"
import * as utilsActions from "../../../../../store/utils/utilsActions"
import clsx from 'clsx'

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
    MY_AXIOS.post<ResourceDto[]>(API.relearn.resource, resource).then((res) => {
      props.setResources(res.data)

      if (resource.rating) {
        props.setSuccessMessage("Resource rated!")
      } else {
        props.setSuccessMessage("Resource unrated!")
      }
    })
  }

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
              value={rating}
              onChange={(event, newValue) => {
                handleSaveRating(newValue)
                // setValue(newValue)
              }}
              onChangeActive={(event, newHover) => {
                if (newHover === rating) {
                  setHover(0)
                } else {
                  setHover(newHover)
                }
              }}
            />
            <FlexHCenter>
              <Typography>{labels[hover !== -1 ? hover : rating]}</Typography>
            </FlexHCenter>
          </Box>
        }
      >
        <Button
          size="small"
          onClick={handleTooltipOpen}
          // variant="outlined"
          className={(clsx([classes.rateButton, "rate-button" ]))}
          
        >
          <FlexVCenter>
            <StarBorderOutlined />
            {props.resource.rating > 0 ? (
              <Box ml={1}>
                {props.resource.rating} - {labels[props.resource.rating]}
              </Box>
            ) : (
              <Box ml={1}>Rate this resource</Box>
            )}
          </FlexVCenter>
        </Button>
      </Tooltip>
    </ClickAwayListener>
  )
}

const labels: { [index: string]: string } = {
  null: "Give a rating",
  0: "Unrate",
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
}

const useStyles = makeStyles((theme) => ({
  rateButton: {
    position: 'relative', 
    right: 8
  },
}))

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setResources: (resources: ResourceDto[]) =>
    dispatch(relearnActions.setResources(resources)),

  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
})

interface OwnProps {
  resource: ResourceDto
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(RateButton)
