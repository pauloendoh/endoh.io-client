import { Grid, Hidden, Typography } from "@material-ui/core";
import useUserSuggestionsQuery from "hooks/react-query/feed/useUserSuggestionsQuery";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Dispatch } from "redux";
import UserSuggestions from "../../components/feed/UserSuggestions/UserSuggestions";
import MinRatingButton from "../../components/resources/MinRatingButton/MinRatingButton";
import {
  clearProfile,
  setProfileResources,
  setUserInfo,
} from "../../store/profile/profileActions";
import { ApplicationState } from "../../store/store";
import { ResourceDto } from "../../types/domain/relearn/ResourceDto";
import { TagDto } from "../../types/domain/relearn/TagDto";
import { UserInfoDto } from "../../types/domain/_common/UserInfoDto";
import API from "../../utils/consts/API";
import myAxios from "../../utils/consts/myAxios";
import PATHS from "../../utils/consts/PATHS";
import LoadingPage from "../index/LoadingPage";
import FeedResources from "./FeedResources/FeedResources";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ResourcesChart from "./ResourcesChart/ResourcesChart";
import S from "./UserPage.styles";
import UserPageSidebar from "./UserPageSidebar/UserPageSidebar";

// PE 3/3
const UserPage = (props: Props) => {
  const history = useHistory();
  const { username, tagId } = useParams<{
    username: string;
    tagId: string;
  }>();

  const [filteredResources, setFilteredResources] = useState<ResourceDto[]>([]);
  const [minRating, setMinRating] = useState(0);

  const { data: userSuggestions, isLoading: isLoadingUserSuggestion } =
    useUserSuggestionsQuery();

  const [filterByTag, setFilterByTag] = useState<TagDto>(null);

  // filtering resources by min rating
  useEffect(() => {
    const minResources = [...props.resources].filter(
      (r) => r.rating >= minRating
    );

    const filtered = minResources.filter((r) => {
      if (tagId !== undefined) {
        const allTags = props.publicTags.concat(props.privateTags);
        setFilterByTag(allTags.find((t) => t.id === Number(tagId)));
        return r.tag?.id === Number(tagId);
      } else {
        setFilterByTag(null);
        return true;
      }
    });

    setFilteredResources(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resources, minRating, tagId]);

  useEffect(
    () => {
      document.title = username + " - Endoh.io";

      props.clearProfile();

      myAxios
        .get<UserInfoDto>(API.user.userInfo(username))
        .then((res) => {
          props.setUserInfo(res.data);
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            history.push(PATHS.notFound);
          }
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [username]
  );

  return (
    <S.UserPageRoot>
      {props.profile === null ? (
        <LoadingPage />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={3} style={{ width: "22%" }}>
            <UserPageSidebar />
          </Grid>
          <Grid item xs={9} md={6} lg={5}>
            <ProfileHeader />

            <S.ChartWrapper>
              <ResourcesChart resources={filteredResources} />
            </S.ChartWrapper>

            <S.ResourcesContentHeader>
              <Typography variant="h5">
                {filterByTag === null ? "All resources" : filterByTag.name}
              </Typography>
              <MinRatingButton onChange={setMinRating} value={minRating} />
            </S.ResourcesContentHeader>
            <FeedResources resources={filteredResources} />
          </Grid>

          <Grid item lg={4}>
            <Hidden mdDown>
              <S.UserSuggestionsWrapper>
                {userSuggestions?.length > 0 && (
                  <UserSuggestions
                    userSuggestions={userSuggestions}
                    followingTags={props.followingUsers}
                  />
                )}
              </S.UserSuggestionsWrapper>
            </Hidden>
          </Grid>
        </Grid>
      )}
    </S.UserPageRoot>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: ApplicationState) => ({
  authUser: state.auth.user,
  followingUsers: state.auth.followingUsers,
  resources: state.profile.resources,
  profile: state.profile.profile,
  publicTags: state.profile.publicTags,
  privateTags: state.profile.privateTags,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearProfile: () => dispatch(clearProfile()),

  setProfileResources: (resources: ResourceDto[]) =>
    dispatch(setProfileResources(resources)),

  setUserInfo: (userInfo: UserInfoDto) => dispatch(setUserInfo(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
