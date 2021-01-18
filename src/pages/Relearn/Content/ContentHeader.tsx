import { Box, Chip, makeStyles, Tab, Tabs, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import FlexVCenter from "../../../components/shared/Flexboxes/FlexVCenter"
import SkillLevelChip from "../../../components/skillbase/SkillLevelChip/SkillLevelChip"
import PATHS from "../../../consts/PATHS"
import { SkillDto } from "../../../dtos/skillbase/SkillDto"
import { ResourceDto } from "../../../interfaces/dtos/relearn/ResourceDto"
import { ApplicationState } from "../../../store/store"

function ContentHeader(props: Props) {
  const classes = useStyles()
  const location = useLocation()
  const [tagName, setTagName] = useState("")
  useEffect(() => {
    const { pathname } = location
    if (pathname === PATHS.relearn.index) {
      setTagName("Untagged")
    } else if (pathname.startsWith(PATHS.relearn.tag)) {
      const tagId = Number(pathname.split("/").pop())
      if (tagId) {
        const currentTag = props.tags.find((t) => t.id === tagId)
        if (currentTag) {
          setTagName("# " + currentTag.name)
          document.title = currentTag.name + " - Relearn"
        }
      }
    }
  }, [location, props.tags])

  const handleChangeTab = (
    event: React.ChangeEvent<{}>,
    newTabIndex: number
  ) => {
    props.onTabChange(newTabIndex)
  }

  return (
    <Box className={classes.root}>
      {tagName.length > 0 && <Typography variant="h5">{tagName}</Typography>}

      <Box>
        {/* 20210118 - Não vou fazer isso por hora, pois nem cheguei a prototipar e estou meio cansadin */}
        {/* {props.skills.map((skill) => (
          <Chip
            className={classes.outerChip}
            key={skill.id}
            deleteIcon={<Box>xd</Box>}
            variant="outlined"
            label={
              <FlexVCenter>
                {skill.name}

                {(skill.currentLevel || skill.goalLevel) && (
                  <SkillLevelChip
                    key={skill.id}
                    currentLevel={skill.currentLevel}
                    goalLevel={skill.goalLevel}
                  />
                )}
              </FlexVCenter>
            }
          />
        ))} */}
      </Box>

      <Tabs
        className={classes.tabs}
        value={props.tabIndex}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChangeTab}
        aria-label="disabled tabs example"
      >
        <Tab
          className={classes.tab}
          label={`${props.todoResources.length} Resources`}
        />
        <Tab
          className={classes.tab}
          label={`${props.completedResources.length} Completed`}
        />
      </Tabs>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    background: theme.palette.background.default,
    zIndex: theme.zIndex.appBar,
    top: 65,
    paddingTop: 24,
  },
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
  outerChip: {
    cursor: "inherit",
    marginBottom: 2,
    marginTop: 2,
    marginRight: 4,
  },
}))

const mapStateToProps = (state: ApplicationState) => ({
  tags: state.relearn.tags,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  onTabChange: (newTabIndex: number) => void
  tabIndex: number
  todoResources: ResourceDto[]
  completedResources: ResourceDto[]
  skills: SkillDto[]
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(ContentHeader)
