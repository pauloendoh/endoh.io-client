import { Box, Grid } from "@mui/material"
import useUserSuggestionsQuery from "hooks/react-query/feed/useUserSuggestionsQuery"
import useAuthStore from "store/zustand/useAuthStore"
import UserSuggestions from "../_common/UserSuggestions/UserSuggestions"
import AuthUserSummary from "./AuthUserSummary/AuthUserSummary"
import FeedResources from "./FeedResources/FeedResources"

// PE 3/3
const FeedPage = () => {
  const { followingUsers } = useAuthStore()
  const { data: userSuggestions } = useUserSuggestionsQuery()
  return (
    <Box pt={3}>
      <Grid container>
        <Grid item xs={0} lg={3}></Grid>

        <Grid item xs={8} lg={5}>
          <FeedResources />
        </Grid>

        <Grid item xs={4}>
          <AuthUserSummary />
          <Box mt={2} />
          {userSuggestions?.length > 0 && (
            <UserSuggestions
              userSuggestions={userSuggestions}
              followingTags={followingUsers}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default FeedPage
