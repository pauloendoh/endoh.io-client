import { Box, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { Dispatch } from "redux";
import { urls } from "utils/urls";
import DarkButton from "../../components/shared/Buttons/DarkButton";
import Flex from "../../components/shared/Flexboxes/Flex";
import FlexVCenter from "../../components/shared/Flexboxes/FlexVCenter";
import SkillChip from "../../components/skillbase/SkillChip/SkillChip";
import myAxios from "../../consts/myAxios";
import { SearchResultsDto } from "../../dtos/utils/SearchResultsDto";
import { ApplicationState } from "../../store/store";
import LoadingPage from "../index/LoadingPage";
import ResourceItem from "../Relearn/Content/ResourceList/DraggableResourceItem/ResourceItem/ResourceItem";
import SearchPageSidebar from "./SearchPageSidebar/SearchPageSidebar";
import UserResults from "./UserResults/UserResults";

export type FilterByType = "all" | "resources" | "users" | "skills";

// PE 3/3
const SearchPage = (props: Props) => {
  const location = useLocation();

  const [q, setQ] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [results, setResults] = useState<SearchResultsDto>(null);

  const [filterBy, setFilterBy] = useState<FilterByType>("all");

  const countAllResults = () => {
    let count = 0;
    if (results) {
      count += results.resources.length;
      count += results.users.length;
      count += results.skills.length;
    }
    return count;
  };

  const filterResources = () => {
    return filterBy === "resources"
      ? results.resources
      : results.resources.slice(0, 3);
  };

  useEffect(() => {
    setIsLoading(true);
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get("q");
    setQ(q);

    myAxios
      .get<SearchResultsDto>(urls.api.search(q))
      .then((res) => {
        setResults(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [location, props.resources]);

  return (
    <Box p={3}>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Box>
          {countAllResults() ? (
            <Grid container>
              <Grid item xs={3}>
                <SearchPageSidebar
                  value={filterBy}
                  onChange={setFilterBy}
                  results={results}
                />
              </Grid>
              <Grid item xs={9}>
                <Box pt={2}>
                  <Typography style={{ fontSize: 20 }}>
                    Results for <b>{q}</b>
                  </Typography>
                </Box>

                <Box maxWidth={600} mt={3}>
                  {results.resources.length > 0 &&
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
                                <ResourceItem resource={resource} />
                              </Box>
                            ))}

                            {results.resources.length > 3 &&
                              filterBy === "all" && (
                                <Box mt={2}>
                                  <DarkButton
                                    fullWidth
                                    onClick={() => {
                                      setFilterBy("resources");
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
                                    setFilterBy("users");
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
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  resources: state.relearn.resources,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
