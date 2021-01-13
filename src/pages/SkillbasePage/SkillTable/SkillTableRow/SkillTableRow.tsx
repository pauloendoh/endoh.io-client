import { Checkbox, TableCell, TableRow } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import API from "../../../../consts/API"
import MY_AXIOS from "../../../../consts/MY_AXIOS"
import { SkillDto } from "../../../../dtos/skillbase/SkillDto"
import { setSkill } from "../../../../store/skillbase/skillbaseActions"
import { ApplicationState } from "../../../../store/store"
import SelectDependencies from "./SelectDependencies/SelectDependencies"
// PE 3/3
const SkillTableRow = (props: Props) => {
  const [skill, setSkill] = useState(props.skill)
  const [isTouched, setIsTouched] = useState(false)

  const labelId = `enhanced-table-checkbox-${props.index}`

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true)

    if (event.target.name === ("isPriority" as keyof SkillDto)) {
      setSkill({ ...skill, [event.target.name]: event.target.checked })
    } else {
      setSkill({ ...skill, [event.target.name]: event.target.value })
    }
  }

  const handleDependenciesChange = (dependencies: SkillDto[]) => {
    setIsTouched(true)
    setSkill({ ...skill, dependencies })
  }

  const [throttle, setThrottle] = useState<NodeJS.Timeout>(null)
  const saveSkill = () => {
    clearTimeout(throttle)

    setThrottle(
      setTimeout(() => {
        MY_AXIOS.put<SkillDto>(
          API.skillbase.skill + "/" + skill.id,
          skill
        ).then((res) => {
          props.setSkill(res.data)
        })
      }, 1000)
    )
  }

  useEffect(() => {
    if (isTouched) saveSkill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skill])

  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={props.isSelected}
      tabIndex={-1}
      selected={props.isSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={props.isSelected}
          onClick={(event) => props.onCheck(event, skill.id)}
          inputProps={{ "aria-labelledby": labelId }}
        />
      </TableCell>
      <TableCell>
        <Checkbox
          checked={skill.isPriority}
          name={"isPriority" as keyof SkillDto}
          onChange={handleInputChange}
          inputProps={{ "aria-labelledby": labelId }}
        />
      </TableCell>
      <TableCell>
        <input
          name={"name" as keyof SkillDto}
          value={skill.name}
          onChange={handleInputChange}
        />
      </TableCell>
      <TableCell align="right">
        <input
          name={"currentLevel" as keyof SkillDto}
          value={skill.currentLevel ? skill.currentLevel : ""}
          type="number"
          onChange={handleInputChange}
        />
      </TableCell>
      <TableCell align="right">
        <input
          name={"goalLevel" as keyof SkillDto}
          value={skill.goalLevel ? skill.goalLevel : ""}
          type="number"
          onChange={handleInputChange}
        />
      </TableCell>
      <TableCell>
        <SelectDependencies
          initialValues={skill.dependencies}
          onChange={(e, dependencies) => {
            handleDependenciesChange(dependencies as SkillDto[])
          }}
        />
      </TableCell>
    </TableRow>
  )
}

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSkill: (skill: SkillDto) => dispatch(setSkill(skill)),
})

interface OwnProps {
  skill: SkillDto
  index: number
  isSelected: boolean
  onCheck: (e: React.MouseEvent, skillId: number) => void
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(SkillTableRow)
