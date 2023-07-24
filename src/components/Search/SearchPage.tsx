import { Box, Grid, Paper, Typography } from "@mui/material"
import { useAxios } from "hooks/utils/useAxios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import { siteTitles } from "utils/consts/siteTitles"
import { urls } from "utils/urls"
import { SearchResultsDto } from "../../types/domain/utils/SearchResultsDto"
import ResourceItem from "../Relearn/RelearnContent/ResourceList/DraggableResourceItem/ResourceItem/ResourceItem"
import DarkButton from "../_UI/Buttons/DarkButton/DarkButton"
import Flex from "../_UI/Flexboxes/Flex"
import FlexVCenter from "../_UI/Flexboxes/FlexVCenter"
import LoadingPage from "../_common/LoadingPage/LoadingPage"
import SkillChip from "../_common/SkillChip/SkillChip"
import SearchPageSidebar from "./SearchPageSidebar/SearchPageSidebar"
import UserResults from "./UserResults/UserResults"

export type FilterByType = "all" | "resources" | "users" | "skills"

// PE 3/3
const SearchPage = () => {
  const { resources } = useRelearnStore()

  const location = useLocation()

  // PE 2/3 - melhor searchQuery?
  const [q, setQ] = useState("")

  const [isLoading, setIsLoading] = useState(true)

  const [results, setResults] = useState<SearchResultsDto | null>(null)

  const [filterBy, setFilterBy] = useState<FilterByType>("all")

  const axios = useAxios()

  const countAllResults = () => {
    let count = 0
    if (results) {
      count += results.resources.length
      count += results.users.length
      count += results.skills.length
    }
    return count
  }

  const filterResources = () => {
    if (!results || !results.resources || !results.resources.length) {
      return []
    }

    if (filterBy === "resources") {
      return results.resources
    }

    return results.resources.slice(0, 3)
  }

  useEffect(() => {
    setIsLoading(true)
    const searchParams = new URLSearchParams(location.search)
    const q = searchParams.get("q") || ""
    setQ(q)

    document.title = siteTitles.search(q)

    axios
      .get<SearchResultsDto>(urls.api.resourcesSearch(q))
      .then((res) => {
        setResults(res.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [location, resources])

  return (
    <Box p={3}>
      {isLoading && <LoadingPage />}
      {results && (
        <Box>
          {countAllResults() ? (
            <Grid container>
              <Grid item xs={3}>
                {results && (
                  <SearchPageSidebar
                    value={filterBy}
                    onChange={setFilterBy}
                    results={results}
                  />
                )}
              </Grid>
              <Grid item xs={9}>
                <Box pt={2}>
                  <Typography style={{ fontSize: 20 }}>
                    Results for <b>{q}</b>
                  </Typography>
                </Box>

                <Box maxWidth={600} mt={3}>
                  {results &&
                    results.resources.length > 0 &&
                    (filterBy === "all" || filterBy === "resources") && (
                      <Box mb={4}>
                        <Paper>
                          <Box p={2}>
                            <FlexVCenter mb={2}>
                              <Typography>
                                <b>{results.resources.length} Resources</b>
                              </Typography>
                            </FlexVCenter>
                            {filterResources().map((resource, index) => (
                              <Box
                                key={resource.id}
                                p={1}
                                borderBottom={
                                  index === filterResources().length - 1
                                    ? "none"
                                    : "1px solid rgb(255 255 255 / 0.1)"
                                }
                              >
                                <ResourceItem resource={resource} showTag />
                              </Box>
                            ))}

                            {results.resources.length > 3 &&
                              filterBy === "all" && (
                                <Box mt={2}>
                                  <DarkButton
                                    fullWidth
                                    onClick={() => {
                                      setFilterBy("resources")
                                    }}
                                  >
                                    Show More
                                  </DarkButton>
                                </Box>
                              )}
                          </Box>
                        </Paper>
                      </Box>
                    )}

                  {results.users.length > 0 &&
                    (filterBy === "all" || filterBy === "users") && (
                      <Box mb={4}>
                        <Paper>
                          <Box p={2}>
                            <FlexVCenter mb={2}>
                              <Typography>
                                <b>{results.users.length} Users</b>
                              </Typography>
                            </FlexVCenter>

                            <UserResults
                              userProfiles={
                                filterBy === "users"
                                  ? results.users
                                  : results.users.slice(0, 3)
                              }
                            />

                            {results.users.length > 3 && filterBy === "all" && (
                              <Box mt={2}>
                                <DarkButton
                                  fullWidth
                                  onClick={() => {
                                    setFilterBy("users")
                                  }}
                                >
                                  Show More
                                </DarkButton>
                              </Box>
                            )}
                          </Box>
                        </Paper>
                      </Box>
                    )}

                  {results.skills.length > 0 &&
                    (filterBy === "all" || filterBy === "skills") && (
                      <Paper>
                        <Box p={2}>
                          <FlexVCenter mb={2}>
                            <Typography>
                              <b>{results.skills.length} Skill</b>
                            </Typography>
                          </FlexVCenter>
                          <Flex flexWrap="wrap">
                            {results.skills.map((skill) => (
                              <SkillChip key={skill.id} skill={skill} />
                            ))}
                          </Flex>
                        </Box>
                      </Paper>
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
