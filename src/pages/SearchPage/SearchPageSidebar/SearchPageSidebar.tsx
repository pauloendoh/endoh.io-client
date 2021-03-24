import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router"
import Flex from "../../../components/shared/Flexboxes/Flex"
import SkillChip from "../../../components/skillbase/SkillChip/SkillChip"
import API from "../../../consts/API"
import MY_AXIOS from "../../../consts/MY_AXIOS"
import { SearchResultsDto } from "../../../dtos/utils/SearchResultsDto"
import LoadingPage from "../../index/LoadingPage"
import ResourceList from "../../Relearn/Content/ResourceList/ResourceList"

// PE 3/3
const SearchPageSidebar = () => {
  return (
    <List
      component="nav"
      aria-label="User resource lists"
      style={{ paddingRight: 24 }}
    >
      <ListItem
        style={{ marginBottom: 32 }}
        button
        // selected={tagId === undefined}
      >
        <ListItemText>All</ListItemText>
      </ListItem>

      <ListItem
        button
        // selected={tagId === undefined}
      >
        <ListItemText>Your Resources</ListItemText>
      </ListItem>

      <ListItem
        button
        // selected={tagId === undefined}
      >
        <ListItemText>Users</ListItemText>
      </ListItem>

      <ListItem
        button
        // selected={tagId === undefined}
      >
        <ListItemText>Your Skills</ListItemText>
      </ListItem>
    </List>
  )
}

export default SearchPageSidebar
