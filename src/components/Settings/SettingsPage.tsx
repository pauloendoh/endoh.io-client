import { Box } from "@mui/material"
import { useEffect } from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import useAuthStore from "store/zustand/useAuthStore"
import { urls } from "utils/urls"
import Flex from "../_UI/Flexboxes/Flex"
import SettingsSidebar from "./SettingsSidebar/SettingsSidebar"
import KeepTempUserPaper from "./account/paper/KeepTempUserPaper/KeepTempUserPaper"
import PersonalInformationPaper from "./account/paper/PersonalInformationPaper"

function SettingsPage() {
  useEffect(() => {
    document.title = "Settings - Relearn"
  }, [])

  const authUser = useAuthStore((s) => s.authUser)

  return (
    <Flex height="100%">
      <SettingsSidebar />
      <Box pt={1} px={4} flexGrow={1}>
        <Switch>
          {authUser?.userExpiresAt ? (
            <Route
              path={urls.pages.settings.account}
              component={KeepTempUserPaper}
            />
          ) : (
            <Route
              path={urls.pages.settings.account}
              component={PersonalInformationPaper}
            />
          )}

          <Route
            path="/"
            render={() => <Redirect to={urls.pages.settings.account} />}
          />
        </Switch>
      </Box>
    </Flex>
  )
}

export default SettingsPage
