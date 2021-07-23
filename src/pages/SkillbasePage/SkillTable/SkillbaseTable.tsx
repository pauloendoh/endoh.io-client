import { makeStyles, Theme } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableContainer from "@material-ui/core/TableContainer"
import Toolbar from "@material-ui/core/Toolbar"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import API from "../../../consts/API"
import MY_AXIOS from "../../../consts/MY_AXIOS"
import { IdsDto } from "../../../dtos/IdsDto"
import { SkillDto } from "../../../dtos/skillbase/SkillDto"
import { TagDto } from "../../../interfaces/dtos/relearn/TagDto"
import {
  removeSkills,
  sortSkill
} from "../../../store/skillbase/skillbaseActions"
import { SortSkill } from "../../../store/skillbase/skillbaseTypes"
import { ApplicationState } from "../../../store/store"
import { setSuccessMessage } from "../../../store/utils/utilsActions"
import filterAndSortSkills from "../../../utils/domain/skills/filterAndSortSkills"
import AddSkillButton from "./AddSkillButton/AddSkillButton"
import SkillbaseTableHead from "./SkillbaseTableHead/SkillbaseTableHead"
import SkillbaseTableRow from "./SkillbaseTableRow/SkillbaseTableRow"
import SkillTableToolbar from "./SkillTableToolbar/SkillTableToolbar"

// PE 2/3
const SkillbaseTable = (props: Props) => {
  const classes = useStyles()

  const [selectedIds, setSelectedIds] = React.useState<number[]>([])
  const [visibleSkills, setVisibleSkills] = useState<SkillDto[]>(
    filterAndSortSkills(props.allSkills, props.sortBy, props.tag)
  )

  useEffect(
    () => {
      setVisibleSkills(
        filterAndSortSkills(props.allSkills, props.sortBy, props.tag)
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.allSkills, props.sortBy, props.tag]
  )

  const sortByProperty = (property: keyof SkillDto) => {
    // if sorting the same column, order = "asc"
    const order =
      props.sortBy.property === property && props.sortBy.order === "desc"
        ? "asc"
        : "desc"
    props.sortSkill({ order, property })
  }

  const checkSelectAll = (checked: boolean) => {
    if (checked) {
      const skillIds = visibleSkills.map((skill) => skill.id)
      setSelectedIds(skillIds)
      return
    }
    setSelectedIds([])
  }

  // PE 1/3
  const changeSkillCheck = (_: React.MouseEvent<unknown>, skillId: number) => {
    const isSelected = selectedIds.includes(skillId)

    // if already selected, filter out
    if (isSelected) setSelectedIds(selectedIds.filter((id) => id !== skillId))
    else setSelectedIds([...selectedIds, skillId])
  }

  const isSelected = (id: number) => selectedIds.indexOf(id) !== -1

  const handleDelete = () => {
    if (window.confirm(`Delete ${selectedIds.length} skill(s)?`)) {
      MY_AXIOS.delete<SkillDto[]>(API.skillbase.skill, {
        headers: {}, // why is this?
        data: { ids: selectedIds } as IdsDto,
      }).then((res) => {
        props.removeSkills(selectedIds)
        props.setSuccessMessage("Skills deleted successfully!")
        setSelectedIds([])
      })
    }
  }

  return (
    <>
      <SkillTableToolbar
        fixedTag={props.fixedTag}
        onClickDelete={handleDelete}
        numSelected={selectedIds.length}
      />
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          className={classes.table}
          aria-labelledby="tableTitle"
          size="small"
          aria-label="enhanced table"
        >
          <SkillbaseTableHead
            numSelected={selectedIds.length}
            onSelectAllClick={(e) => {
              checkSelectAll(e.target.checked)
            }}
            onRequestSort={(_, property) => {
              sortByProperty(property)
            }}
            rowCount={visibleSkills.length}
          />
          <TableBody>
            {visibleSkills.map((skill, index) => {
              return (
                <SkillbaseTableRow
                  key={skill.id}
                  skill={skill}
                  index={index}
                  isSelected={isSelected(skill.id)}
                  onCheck={changeSkillCheck}
                />
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Toolbar>
        <AddSkillButton tag={props.tag} />
      </Toolbar>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxHeight: 440,
  },
  table: {
    minWidth: 750,
    "& .MuiTableCell-root": {
      padding: 8,
      borderBottom: "1px solid rgb(255 255 255 / 0.1)",
    },
  },
}))

const mapStateToProps = (state: ApplicationState) => ({
  allSkills: state.skillbase.skills,
  sortBy: state.skillbase.sortBy,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sortSkill: (sortBy: SortSkill) => dispatch(sortSkill(sortBy)),
  removeSkills: (ids: number[]) => dispatch(removeSkills(ids)),
  setSuccessMessage: (message: string) => dispatch(setSuccessMessage(message)),
})

interface OwnProps {
  tag: TagDto | "Untagged"
  fixedTag: TagDto
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(SkillbaseTable)
