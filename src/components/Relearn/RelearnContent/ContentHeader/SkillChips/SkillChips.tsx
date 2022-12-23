import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore"
import { FilterSkillChipsBy } from "types/domain/relearn/FilterSkillChipsBy"
import { urls } from "utils/urls"
import SkillChip from "../../../../_common/SkillChip/SkillChip"
import Flex from "../../../../_UI/Flexboxes/Flex"
import EditSkillsButton from "./EditSkillsButton/EditSkillsButton"
import FilterSkillChipsButton from "./FilterSkillChipsButton/FilterSkillChipsButton"

// PE 1/3 - DELETE?
function SkillChips() {
  const classes = useStyles()
  const location = useLocation()
  const { skills: allSkills } = useSkillbaseStore()

  const [filterBy, setFilterBy] = useState<FilterSkillChipsBy>("By tag")

  const skillsWithCurrentGoal = useMemo(() => {
    const { pathname } = location

    if (filterBy === "Show all")
      return [...allSkills].filter((skill) =>
        skill.expectations.some((e) => e.isCurrentGoal)
      )

    if (filterBy === "By tag") {
      if (pathname.startsWith(urls.pages.relearn.tag)) {
        const tagId = Number(pathname.split("/").pop())

        if (tagId) {
          const listedSkills = [...allSkills].filter(
            (s) =>
              s.tagId === tagId && s.expectations.some((e) => e.isCurrentGoal)
          )
          return listedSkills
        }
      }
    }

    return []
  }, [allSkills, location, filterBy])

  return (
    <Flex className={classes.root}>
      {skillsWithCurrentGoal.map((skill) => (
        <SkillChip key={skill.id} skill={skill} />
      ))}
      <EditSkillsButton />
      <FilterSkillChipsButton
        filterBy={filterBy}
        onChangeFilterBy={setFilterBy}
      />
    </Flex>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    flexWrap: "wrap",
  },
  skillButton: {
    marginRight: 8,
    marginBottom: 8,
    fontWeight: 400,
  },
  innerChip: {
    background: theme.palette.secondary.main,
    color: "#fff",
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 3,
  },
  manageSkillsButton: {
    marginBottom: 8,
  },
}))

export default SkillChips
