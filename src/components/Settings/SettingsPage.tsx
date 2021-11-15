import { Box } from "@material-ui/core";
import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import pageUrls from "../../utils/url/urls/pageUrls";
import EditCategoryModal from "../Monerate/Modals/EditCategoryModal";
import EditPlaceModal from "../Monerate/Modals/EditPlaceModal";
import Flex from "../_UI/Flexboxes/Flex";
import PersonalInformationPaper from "./account/paper/PersonalInformationPaper";
import SettingsSidebar from "./SettingsSidebar/SettingsSidebar";

function SettingsPage() {
  useEffect(() => {
    document.title = "Settings - Endoh.io";
  }, []);

  return (
    <Flex height="100%">
      <SettingsSidebar />
      <Box pt={1} px={4} flexGrow={1}>
        <Switch>
          <Route
            path={pageUrls.settings.account}
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
            render={() => <Redirect to={pageUrls.settings.account} />}
          />
        </Switch>
      </Box>

      <EditPlaceModal />
      <EditCategoryModal />
    </Flex>
  );
}

export default SettingsPage;
