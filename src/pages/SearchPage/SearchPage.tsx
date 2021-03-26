import { Box, Button, Grid, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router"
import Flex from "../../components/shared/Flexboxes/Flex"
import FlexVCenter from "../../components/shared/Flexboxes/FlexVCenter"
import SkillChip from "../../components/skillbase/SkillChip/SkillChip"
import API from "../../consts/API"
import MY_AXIOS from "../../consts/MY_AXIOS"
import { SearchResultsDto } from "../../dtos/utils/SearchResultsDto"
import LoadingPage from "../index/LoadingPage"
import ResourceList from "../Relearn/Content/ResourceList/ResourceList"
import SearchPageSidebar from "./SearchPageSidebar/SearchPageSidebar"
import UserResults from "./UserResults/UserResults"

export type FilterByType = "all" | "resources" | "users" | "skills"

// PE 3/3
const SearchPage = () => {
  const location = useLocation()

  const [q, setQ] = useState("")

  const [isLoading, setIsLoading] = useState(true)

  const [results, setResults] = useState<SearchResultsDto>(null)

  const [filterBy, setFilterBy] = useState<FilterByType>("all")

  const countAllResults = () => {
    let count = 0
    if (results) {
      count += results.resources.length
      count += results.users.length
      count += results.resources.length
    }
    return count
  }

  useEffect(() => {
    setIsLoading(true)
    const searchParams = new URLSearchParams(location.search)
    const q = searchParams.get("q")
    setQ(q)

    MY_AXIOS.get<SearchResultsDto>(API.utils.search(q))
      .then((res) => {
        setResults(res.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [location])

  return (
    <Box p={3}>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Box>
          {countAllResults() ? (
            <Grid container>
              <Grid item xs={3}>
                <SearchPageSidebar value={filterBy} onChange={setFilterBy} />
              </Grid>
              <Grid item xs={9}>
                <Typography style={{ fontSize: 20 }}>
                  Results for <b>{q}</b>
                </Typography>
                <Box mt={5} />
                <Box maxWidth={600}>
                  {results.resources.length > 0 &&
                    (filterBy === "all" || filterBy === "resources") && (
                      <Box mb={8}>
                        <FlexVCenter mb={2}>
                          <Typography>Your Resources -</Typography>
                          <Button
                            onClick={() => {
                              setFilterBy("resources")
                            }}
                          >
                            View all {results.resources.length}
                          </Button>
                        </FlexVCenter>
                        <ResourceList
                          resources={
                            filterBy === "resources"
                              ? results.resources
                              : results.resources.slice(0, 3)
                          }
                        />
                      </Box>
                    )}

                  {results.users.length > 0 &&
                    (filterBy === "all" || filterBy === "users") && (
                      <Box mb={8}>
                        <FlexVCenter mb={2}>
                          <Typography>Users -</Typography>
                          <Button
                            onClick={() => {
                              setFilterBy("users")
                            }}
                          >
                            View all {results.users.length}
                          </Button>
                        </FlexVCenter>
                        <UserResults
                          userProfiles={
                            filterBy === "users"
                              ? results.users
                              : results.users.slice(0, 3)
                          }
                        />
                      </Box>
                    )}

                  {results.skills.length > 0 &&
                    (filterBy === "all" || filterBy === "skills") && (
                      <Box>
                        <FlexVCenter mb={2}>
                          <Typography>Your Skills -</Typography>

                          <Button onClick={() => setFilterBy("skills")}>
                            View all {results.skills.length}
                          </Button>
                        </FlexVCenter>
                        <Flex flexWrap="wrap">
                          {results.skills.map((skill) => (
                            <SkillChip key={skill.id} skill={skill} />
                          ))}
                        </Flex>
                      </Box>
                    )}
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Box>
              <Typography>No results :(</Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default SearchPage
