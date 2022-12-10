import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { Avatar } from "@mui/material"
import React, { FunctionComponent } from "react"
import { Link } from "react-router-dom"
import { urls } from "utils/urls"

interface Props {
  pictureUrl: string
  username: string
  isLink: boolean
  onClick?: () => void
  size?: number | string
  fontSize?: string
}

const ProfilePicture: FunctionComponent<Props> = (props: Props) => {
  const classes = useStyles(props)

  return (
    <React.Fragment>
      {props.isLink ? (
        <Link
          to={urls.pages.user.index(props.username)}
          className={classes.link}
        >
          <Avatar
            src={props.pictureUrl}
            className={classes.avatar}
            alt={props.username}
            onClick={props.onClick}
            style={{
              width: props.size,
              height: props.size,
              cursor: props.onClick ? "pointer" : "inherit",
            }}
          />
        </Link>
      ) : (
        <Avatar
          src={props.pictureUrl}
          className={classes.avatar}
          alt={props.username}
          onClick={props.onClick}
          style={{
            width: props.size,
            height: props.size,
            cursor: props.onClick ? "pointer" : "inherit",
          }}
        />
      )}
    </React.Fragment>
  )
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  link: {
    textDecoration: "none",
  },
  avatar: {},
}))

export default ProfilePicture
