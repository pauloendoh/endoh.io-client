import { Box } from "@material-ui/core"
import React, { useEffect } from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import Flex from "../../components/shared/Flexboxes/Flex"
import PATHS from "../../consts/PATHS"
import EditCategoryModal from "../../pages/Monerate/Modals/EditCategoryModal"
import EditPlaceModal from "../../pages/Monerate/Modals/EditPlaceModal"
import PersonalInformationPaper from "./account/paper/PersonalInformationPaper"
import SettingsSidebar from "./SettingsSidebar/SettingsSidebar"

function SettingsPage() {
  useEffect(() => {
    document.title = "Settings - Endoh.io"
  }, [])

  return (
    <Flex height="100%">
      <SettingsSidebar />
      <Box pt={1} px={4} flexGrow={1}>
        <Switch>
          <Route
            path={PATHS.settings.account}
            component={PersonalInformationPaper}
          />

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
            render={() => <Redirect to={PATHS.settings.account} />}
          />
        </Switch>
      </Box>

      <EditPlaceModal />
      <EditCategoryModal />
    </Flex>
  )
}

export default SettingsPage
