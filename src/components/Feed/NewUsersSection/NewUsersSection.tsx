import { Button, Typography } from "@mui/material"
import FlexCol from "components/_UI/Flexboxes/FlexCol"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import ProfilePicture from "components/_UI/ProfilePicture/ProfilePicture"
import { useNewUsersQuery } from "hooks/react-query/feed/useNewUsersQuery"
import { useState } from "react"
import { Link } from "react-router-dom"
import { format } from "timeago.js"
import { urls } from "utils/urls"

type Props = {}

const NewUsersSection = ({ ...props }: Props) => {
  const { data } = useNewUsersQuery()
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="NewUsersSection">
      <Typography variant="h6">New users</Typography>
      <FlexCol mt={1} gap={1}>
        {data?.slice(0, expanded ? data.length : 3).map((user) => (
          <FlexVCenter key={user.id} gap={1}>
            <ProfilePicture
              isLink
              pictureUrl={user.profile.pictureUrl}
              username={user.username}
            />
            <FlexCol>
              <Link to={urls.pages.user.index(user.username)}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {user.username}
                </Typography>
              </Link>
              <Typography variant="caption">
                Joined {format(user.createdAt)}
              </Typography>
            </FlexCol>
          </FlexVCenter>
        ))}
        <Button onClick={() => setExpanded((prev) => !prev)}>
          <Typography variant="caption">
            {expanded ? "See less" : "See more"}
          </Typography>
        </Button>
      </FlexCol>
    </div>
  )
}

export default NewUsersSection
