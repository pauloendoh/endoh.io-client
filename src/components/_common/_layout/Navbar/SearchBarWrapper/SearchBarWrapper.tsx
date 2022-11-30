import NotesIcon from "@mui/icons-material/Notes"

import { FormControl, MenuItem, Select, Typography } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { useEffect, useState } from "react"
import { FaLink } from "react-icons/fa"
import { useLocation } from "react-router-dom"
import NotesSearchBar from "./NotesSearchBar/NotesSearchBar"
import ResourcesSearchBar from "./ResourcesSearchBar/ResourcesSearchBar"

interface Props {
  test?: string
}

const SearchBarWrapper = (props: Props) => {
  type SearchType = "resources" | "notes"

  const [searchType, setSearchType] = useState<SearchType>("resources")

  const location = useLocation()
  useEffect(() => {
    if (location.pathname.includes("questions")) {
      setSearchType("notes")
      return
    }
    setSearchType("resources")
  }, [location.pathname])

  return (
    <FlexVCenter>
      {searchType === "resources" && <ResourcesSearchBar />}
      {searchType === "notes" && <NotesSearchBar />}
      <FormControl
        variant="outlined"
        size="small"
        style={{
          borderRadius: "0px 4px 4px 0px",
          position: "relative",
        }}
      >
        <Select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as SearchType)}
          style={{ borderRadius: "0px 4px 4px 0px", height: 36 }}
        >
          <MenuItem value={"resources" as SearchType}>
            <FlexVCenter style={{ gap: 4 }}>
              <FaLink />
              <Typography>Resources</Typography>
            </FlexVCenter>
          </MenuItem>
          <MenuItem value={"notes" as SearchType}>
            <FlexVCenter style={{ gap: 4 }}>
              <NotesIcon />
              <Typography>Questions</Typography>
            </FlexVCenter>
          </MenuItem>
        </Select>
      </FormControl>
    </FlexVCenter>
  )
}

export default SearchBarWrapper
