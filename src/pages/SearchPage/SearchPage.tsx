import { Box, Grid, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router"
import Flex from "../../components/shared/Flexboxes/Flex"
import SkillChip from "../../components/skillbase/SkillChip/SkillChip"
import API from "../../consts/API"
import MY_AXIOS from "../../consts/MY_AXIOS"
import { SearchResultsDto } from "../../dtos/utils/SearchResultsDto"
import LoadingPage from "../index/LoadingPage"
import ResourceList from "../Relearn/Content/ResourceList/ResourceList"
import SearchPageSidebar from "./SearchPageSidebar/SearchPageSidebar"
import UserResults from "./UserResults/UserResults"

// PE 3/3
const SearchPage = () => {
  const location = useLocation()

  const [q, setQ] = useState("")

  const [isLoading, setIsLoading] = useState(true)

  const [results, setResults] = useState<SearchResultsDto>(null)

  const hasAnyResults = () => {
    if (results) {
      if (results.resources.length) return true
      if (results.users.length) return true
      if (results.resources.length) return true
    }
    return false
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
          {hasAnyResults() ? (
            <Grid container>
              <Grid item xs={3}>
                <SearchPageSidebar />
              </Grid>
              <Grid item xs={9}>
                <Typography style={{ fontSize: 20 }}>
                  Results for <b>{q}</b>
                </Typography>
                <Box mt={5} />
                <Box maxWidth={600}>
                  {results.resources.length > 0 && (
                    <Box mb={8}>
                      <Box mb={2}>
                        <Typography>
                          Your Resources - View All {results.resources.length}
                        </Typography>
                      </Box>
                      <ResourceList resources={results.resources.slice(0, 3)} />
                    </Box>
                  )}

                  {results.users.length > 0 && (
                    <Box mb={8}>
                      <Box mb={2}>
                        <Typography>
                          Users - View All {results.users.length}
                        </Typography>
                        <UserResults userProfiles={results.users.slice(0, 3)} />
                      </Box>
                    </Box>
                  )}

                  {results.skills.length > 0 && (
                    <Box>
                      <Box mb={2}>
                        <Typography>
                          Your Skills - {results.skills.length}
                        </Typography>
                      </Box>
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
