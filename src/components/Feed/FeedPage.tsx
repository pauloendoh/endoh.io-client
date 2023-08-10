import { Box, Grid } from "@mui/material"
import CompletedBookmarkedTabs from "components/User/CompletedBookmarkedTabs/CompletedBookmarkedTabs"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import useUserSuggestionsQuery from "hooks/react-query/feed/useUserSuggestionsQuery"
import { useMyMediaQuery } from "hooks/utils/useMyMediaQuery"
import { useState } from "react"
import useAuthStore from "store/zustand/useAuthStore"
import UserSuggestions from "../_common/UserSuggestions/UserSuggestions"
import AuthUserSummary from "./AuthUserSummary/AuthUserSummary"
import FeedBookmarkedResources from "./FeedBookmarkedResources/FeedBookmarkedResources"
import FeedCompletedResources from "./FeedCompletedResources/FeedCompletedResources"

// PE 3/3
const FeedPage = () => {
  const { followingUsers } = useAuthStore()
  const { data: userSuggestions } = useUserSuggestionsQuery()

  const [feedType, setFeedType] = useState<"completed" | "bookmarked">(
    "completed"
  )

  const { isMobile } = useMyMediaQuery()
  return (
    <Box pt={3}>
      <Grid container>
        <Grid item xs={0} md={0} lg={4}></Grid>

        <Grid item xs={12} md={8} lg={4}>
          <FlexVCenter justifyContent={"center"}>
            <CompletedBookmarkedTabs
              onChange={setFeedType}
              resources={[]}
              value={feedType}
              completedLabel="Rated"
            />
          </FlexVCenter>

          <Box pr={4} pl={2} mb={10}>
            {feedType === "completed" ? (
              <FeedCompletedResources />
            ) : (
              <FeedBookmarkedResources />
            )}
          </Box>
        </Grid>

        <Grid item xs={0} md={4} lg={4}>
          {!isMobile && (
            <>
              <AuthUserSummary />
              <Box mt={2} />
              {!!userSuggestions?.length && (
                <UserSuggestions
                  userSuggestions={userSuggestions}
                  followingTags={followingUsers}
                />
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default FeedPage
