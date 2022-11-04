import { makeStyles, Tab, Tabs } from "@mui/material"
import { useMemo } from "react"
import { Link, useLocation } from "react-router-dom"
import { urls } from "utils/urls"

interface Props {
  test?: string
}

const MonerateTabs = (props: Props) => {
  const classes = useStyles()

  const location = useLocation()

  const tabValue = useMemo(() => {
    if (location.pathname === urls.pages.monerate.similarExpenses) return 1

    return 0
  }, [location.pathname])

  return (
    <Tabs
      className={classes.tabs}
      value={tabValue}
      indicatorColor="primary"
      textColor="primary"
      aria-label="disabled tabs example"
    >
      <Tab
        className={classes.tab}
        label={`Expenses`}
        component={Link}
        to={urls.pages.monerate.index}
      />
      <Tab
        className={classes.tab}
        id="completed-resources-tab-button"
        label={`Similar`}
        component={Link}
        to={urls.pages.monerate.similarExpenses}
      />
    </Tabs>
  )
}

const useStyles = makeStyles((theme) => ({
  tabs: {
    minHeight: 32,
  },
  tab: {
    padding: 0,
    minWidth: "inherit",
    width: "inherit",
    "&:nth-child(2)": {
      marginLeft: 16,
    },
  },
}))

export default MonerateTabs
