import { FormControl, MenuItem, Select } from "@material-ui/core"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { useEffect, useState } from "react"
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
    if (location.pathname.includes("define")) {
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
          style={{ borderRadius: "0px 4px 4px 0px" }}
        >
          <MenuItem value={"resources" as SearchType}>Resources</MenuItem>
          <MenuItem value={"notes" as SearchType}>Notes</MenuItem>
        </Select>
      </FormControl>
    </FlexVCenter>
  )
}

export default SearchBarWrapper
