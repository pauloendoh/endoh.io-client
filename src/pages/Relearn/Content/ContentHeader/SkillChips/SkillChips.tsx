import { Box, Button, makeStyles } from "@material-ui/core"
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link as RouterLink, useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import Flex from "../../../../../components/shared/Flexboxes/Flex"
import FlexVCenter from "../../../../../components/shared/Flexboxes/FlexVCenter"
import PATHS from "../../../../../consts/PATHS"
import { SkillDto } from "../../../../../dtos/skillbase/SkillDto"
import { setEditingSkill } from "../../../../../store/skillbase/skillbaseActions"
import { ApplicationState } from "../../../../../store/store"
import SkillDialog from "../../../../SkillbasePage/SkillDialog/SkillDialog"

// PE 2/3
function SkillChips(props: Props) {
  const classes = useStyles()
  const location = useLocation()

  const [skills, setSkills] = useState(props.allSkills)
  const [skillsHref, setSkillsHref] = useState("")

  useEffect(() => {
    const { pathname } = location

    // /relearn
    if (pathname === PATHS.relearn.index) {
      const unlistedSkills = props.allSkills.filter(
        (s) => s.tagId === null && s.isPriority === true
      )
      setSkills(unlistedSkills)
      setSkillsHref(PATHS.skillbase.list + "/untagged")
    }
    // /relearn/tag/:id
    else if (pathname.startsWith(PATHS.relearn.tag)) {
      const listId = Number(pathname.split("/").pop())

      if (listId) {
        const listedSkills = props.allSkills.filter(
          (s) => s.tagId === listId && s.isPriority === true
        )
        setSkills(listedSkills)
        setSkillsHref(PATHS.skillbase.list + "/" + listId)
      }
    }
  }, [props.allSkills, location])

  return (
    <Flex className={classes.root}>
      <SkillDialog />

      {skills.map((skill) => (
        <Button
          key={skill.id}
          variant="outlined"
          size="small"
          className={classes.skillButton}
          onClick={() => {
            props.editSkill(skill)
          }}
        >
          <Flex>
            <Box>{skill.name}</Box>

            {(skill.currentLevel || skill.goalLevel) && (
              <FlexVCenter ml={1} className={classes.innerChip}>
                {/* only has current level */}
                {skill.currentLevel && !skill.goalLevel && skill.currentLevel}

                {/* only has goal */}
                {!skill.currentLevel && skill.goalLevel && (
                  <>
                    ?<ArrowRightAltIcon />
                    {skill.goalLevel}
                  </>
                )}

                {/* has both */}
                {skill.currentLevel && skill.goalLevel && (
                  <>
                    {skill.currentLevel}
                    <ArrowRightAltIcon />
                    {skill.goalLevel}
                  </>
                )}
              </FlexVCenter>
            )}
          </Flex>
        </Button>
      ))}
      <Button
        component={RouterLink}
        to={skillsHref}
        variant="outlined"
        size="small"
        color="secondary"
        className={classes.manageSkillsButton}
      >
        Manage skills
      </Button>
    </Flex>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
    maxWidth: 700
  },
  skillButton: {
    marginRight: 8,
    marginBottom: 8,
    fontWeight: 400,
  },
  innerChip: {
    background: "#393939",
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 3,
  },
  manageSkillsButton:{
    marginBottom: 8
  },
}))

const mapStateToProps = (state: ApplicationState) => ({
  allTags: state.relearn.tags,
  allSkills: state.skillbase.skills,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  editSkill: (skill: SkillDto) => dispatch(setEditingSkill(skill)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(SkillChips)
