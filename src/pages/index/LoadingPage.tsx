import { Box, CircularProgress } from "@material-ui/core";
import React from "react";
import FlexCenter from "../../components/shared/Flexboxes/FlexCenter";

// PE 2/3 - should be at shared-components, and change it to /loading/LoadingBox
function LoadingPage() {
  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <FlexCenter flexDirection="column">
        <CircularProgress />
        <Box mt={2}>Loading</Box>
      </FlexCenter>
    </Box>
  );
}

export default LoadingPage;
