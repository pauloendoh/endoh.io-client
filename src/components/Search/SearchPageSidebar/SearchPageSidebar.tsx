import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { Box, List, ListItem, ListItemText } from "@mui/material"
import { SearchResultsDto } from "../../../types/domain/utils/SearchResultsDto"
import Flex from "../../_UI/Flexboxes/Flex"
import { FilterByType } from "../SearchPage"

// PE 3/3
const SearchPageSidebar = (props: Props) => {
  const classes = useStyles()

  return (
    <List
      component="nav"
      aria-label="Search page sidebar"
      style={{ paddingRight: 24 }}
    >
      <ListItem
        button
        selected={props.value === "all"}
        onClick={() => {
          props.onChange("all")
        }}
      >
        <ListItemText>
          <Flex justifyContent="space-between">
            <Box>All</Box>
            <Box className={classes.counter}>
              {props.results.resources.length +
                props.results.users.length +
                props.results.skills.length}
            </Box>
          </Flex>
        </ListItemText>
      </ListItem>

      <ListItem
        button
        selected={props.value === "resources"}
        onClick={() => {
          props.onChange("resources")
        }}
      >
        <ListItemText>
          <Flex justifyContent="space-between">
            <Box>Resources</Box>
            <Box className={classes.counter}>
              {props.results.resources.length}
            </Box>
          </Flex>
        </ListItemText>
      </ListItem>

      <ListItem
        button
        selected={props.value === "users"}
        onClick={() => {
          props.onChange("users")
        }}
      >
        <ListItemText>
          <Flex justifyContent="space-between">
            <Box>Users</Box>
            <Box className={classes.counter}>{props.results.users.length}</Box>
          </Flex>
        </ListItemText>
      </ListItem>

      <ListItem
        button
        selected={props.value === "skills"}
        onClick={() => {
          props.onChange("skills")
        }}
      >
        <ListItemText>
          <Flex justifyContent="space-between">
            <Box>Skills</Box>
            <Box className={classes.counter}>{props.results.skills.length}</Box>
          </Flex>
        </ListItemText>
      </ListItem>
    </List>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  counter: {
    color: theme.palette.grey[400],
  },
}))

interface Props {
  value: FilterByType
  onChange: (filterBy: FilterByType) => void
  results: SearchResultsDto
}

export default SearchPageSidebar
