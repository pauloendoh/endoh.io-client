import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { Box, Typography } from "@mui/material"
import React from "react"
import ReactTimeago from "react-timeago"
import { NotificationDto } from "../../../../../../types/domain/utils/NotificationDto"
import Flex from "../../../../../_UI/Flexboxes/Flex"
import FlexHCenter from "../../../../../_UI/Flexboxes/FlexHCenter"
import FlexVCenter from "../../../../../_UI/Flexboxes/FlexVCenter"
import ProfilePicture from "../../../../../_UI/ProfilePicture/ProfilePicture"
import S from "./NotificationItem.styles"

interface Props {
  notification: NotificationDto
}

const NotificationItem = React.forwardRef((props: Props, ref) => {
  return (
    <S.MenuItem>
      <Flex>
        <FlexVCenter mt={1} height="fit-content">
          <FlexHCenter width={20}>
            {!props.notification.seen && <S.Dot icon={faCircle} />}
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
    </S.MenuItem>
  )
})

export default NotificationItem
