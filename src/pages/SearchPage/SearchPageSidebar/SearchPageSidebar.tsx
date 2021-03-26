import { List, ListItem, ListItemText } from "@material-ui/core"
import React from "react"
import { FilterByType } from "../SearchPage"

// PE 3/3
const SearchPageSidebar = (props: Props) => {
  return (
    <List
      component="nav"
      aria-label="User resource lists"
      style={{ paddingRight: 24 }}
    >
      <ListItem
        style={{ marginBottom: 32 }}
        button
        selected={props.value === "all"}
        onClick={() => {
          props.onChange("all")
        }}
      >
        <ListItemText>All</ListItemText>
      </ListItem>

      <ListItem
        button
        selected={props.value === "resources"}
        onClick={() => {
          props.onChange("resources")
        }}
      >
        <ListItemText>Your Resources</ListItemText>
      </ListItem>

      <ListItem
        button
        selected={props.value === "users"}
        onClick={() => {
          props.onChange("users")
        }}
      >
        <ListItemText>Users</ListItemText>
      </ListItem>

      <ListItem
        button
        selected={props.value === "skills"}
        onClick={() => {
          props.onChange("skills")
        }}
      >
        <ListItemText>Your Skills</ListItemText>
      </ListItem>
    </List>
  )
}

interface Props {
  value: FilterByType
  onChange: (filterBy: FilterByType) => void
}

export default SearchPageSidebar
