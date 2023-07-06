import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import React from "react"

type Props = {
  children: React.ReactNode
}

export const MyDivider = ({ children }: Props) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.border} />
      <div className={classes.content}>{children}</div>
      <div className={classes.border} />
    </div>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
  },
  border: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    width: "100%",
  },
  content: {
    padding: "0 10px 0 10px",
  },
}))
