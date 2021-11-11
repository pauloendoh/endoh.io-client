import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core"
import React from "react"

// PE 3/3d
export const THead = (props: React.ComponentProps<typeof TableHead>) => {
  return <TableHead {...props}>{props.children}</TableHead>
}

export const TBody = (props: React.ComponentProps<typeof TableBody>) => {
  return <TableBody {...props}>{props.children}</TableBody>
}

export const TR = (props: React.ComponentProps<typeof TableRow>) => {
  return <TableRow {...props}>{props.children}</TableRow>
}

export const TD = (props: React.ComponentProps<typeof TableCell>) => {
  return <TableCell {...props}>{props.children}</TableCell>
}
