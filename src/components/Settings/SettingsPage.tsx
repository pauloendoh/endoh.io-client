import { Box } from "@mui/material"
import { useEffect } from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import useAuthStore from "store/zustand/useAuthStore"
import { urls } from "utils/urls"
import EditCategoryModal from "../Monerate/Modals/EditCategoryModal"
import EditPlaceModal from "../Monerate/Modals/EditPlaceModal"
import Flex from "../_UI/Flexboxes/Flex"
import KeepTempUserPaper from "./account/paper/KeepTempUserPaper/KeepTempUserPaper"
import PersonalInformationPaper from "./account/paper/PersonalInformationPaper"
import SettingsSidebar from "./SettingsSidebar/SettingsSidebar"

function SettingsPage() {
  useEffect(() => {
    document.title = "Settings - Endoh.io"
  }, [])

  const authUser = useAuthStore((s) => s.authUser)

  return (
    <Flex height="100%">
      <SettingsSidebar />
      <Box pt={1} px={4} flexGrow={1}>
        <Switch>
          {authUser.userExpiresAt ? (
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

          {/* <Route
            path={PATHS.settings.monerate.places}
            component={PlaceSettings}
          />
          <Route
            path={PATHS.settings.monerate.categories}
            component={CategorySettings}
          /> */}

          {/* por hora, redirecionar para o settings/monerate/places */}
          <Route
            path="/"
            render={() => <Redirect to={urls.pages.settings.account} />}
          />
        </Switch>
      </Box>

      <EditPlaceModal />
      <EditCategoryModal />
    </Flex>
  )
}

export default SettingsPage
