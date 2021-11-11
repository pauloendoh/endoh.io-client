import React from "react"
import { makeStyles } from "@material-ui/core"

export const MyDivider: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.border} />
      <div className={classes.content}>{children}</div>
      <div className={classes.border} />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
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
