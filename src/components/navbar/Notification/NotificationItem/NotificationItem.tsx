import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, makeStyles, MenuItem, Typography } from "@material-ui/core"
import React from "react"
import ReactTimeago from "react-timeago"
import { NotificationDto } from "../../../../dtos/utils/NotificationDto"
import Flex from "../../../shared/Flexboxes/Flex"
import FlexHCenter from "../../../shared/Flexboxes/FlexHCenter"
import FlexVCenter from "../../../shared/Flexboxes/FlexVCenter"
import ProfilePicture from "../../../shared/ProfilePicture/ProfilePicture"

// PE 2/3 

// https://stackoverflow.com/questions/62645556/react-warning-function-components-cannot-be-given-refs
const NotificationItem = React.forwardRef((props: Props, ref) => {
  const classes = useStyles()

  return (
    <MenuItem className={classes.menuItem}>
      <Flex>
        <FlexVCenter mt={1} height="fit-content">
          <FlexHCenter width={20}>
            {!props.notification.seen && (
              <FontAwesomeIcon icon={faCircle} className={classes.dot} />
            )}
          </FlexHCenter>

          <ProfilePicture
            pictureUrl={props.notification.pictureUrl}
            isLink
            username={props.notification.username}
          />
        </FlexVCenter>

        <Box ml={2}>
          <Box>
            <Typography>{props.notification.message}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="primary">
              <ReactTimeago date={props.notification.createdAt} live={false} />
            </Typography>
          </Box>
        </Box>
      </Flex>
    </MenuItem>
  )
})

const useStyles = makeStyles((theme) => ({
  menuItem: {
    whiteSpace: "normal",
    width: 450,
    paddingLeft: 8,
  },
  dot: {
    fontSize: 8,
    color: theme.palette.primary.main,
  },
}))

interface OwnProps {
  notification: NotificationDto
}

type Props = OwnProps

export default NotificationItem
