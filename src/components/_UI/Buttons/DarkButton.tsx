import { Button, makeStyles } from "@material-ui/core"
import React from "react"

// PE 3/3
const DarkButton = (props: Props) => {
  const classes = useStyles()
  return (
    <Button className={classes.root + " " + props.className} {...props}>
      {props.children}
    </Button>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.grey[800],
  },
}))

type Props = React.ComponentProps<typeof Button>

export default DarkButton
