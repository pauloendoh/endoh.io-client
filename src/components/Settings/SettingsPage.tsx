import { Box } from "@mui/material"
import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
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
        <Routes>
          {authUser?.userExpiresAt ? (
            <Route path={"/account"} element={<KeepTempUserPaper />} />
          ) : (
            <Route path={"/account"} element={<PersonalInformationPaper />} />
          )}

          <Route
            path="*"
            element={<Navigate to={urls.pages.settings.account} replace />}
          />
        </Routes>
      </Box>
    </Flex>
  )
}

export default SettingsPage
