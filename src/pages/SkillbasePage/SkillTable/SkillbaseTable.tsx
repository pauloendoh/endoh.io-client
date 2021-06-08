import { Box } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableContainer from "@material-ui/core/TableContainer"
import Toolbar from "@material-ui/core/Toolbar"
import { PortraitSharp } from "@material-ui/icons"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import API from "../../../consts/API"
import MY_AXIOS from "../../../consts/MY_AXIOS"
import PATHS from "../../../consts/PATHS"
import { IdsDto } from "../../../dtos/IdsDto"
import { SkillDto } from "../../../dtos/skillbase/SkillDto"
import { UserPreferenceDto } from "../../../interfaces/dtos/AuthUserGetDto"
import { TagDto } from "../../../interfaces/dtos/relearn/TagDto"
import { savePreferenceActionCreator } from "../../../store/auth/authActions"
import {
  removeSkills,
  sortSkill,
} from "../../../store/skillbase/skillbaseActions"
import { SortSkill } from "../../../store/skillbase/skillbaseTypes"
import { ApplicationState } from "../../../store/store"
import { setSuccessMessage } from "../../../store/utils/utilsActions"
import AddSkillButton from "./AddSkillButton/AddSkillButton"
import SkillbaseTableHead from "./SkillbaseTableHead/SkillbaseTableHead"
import SkillbaseTableRow from "./SkillbaseTableRow/SkillbaseTableRow"
import SkillTableToolbar from "./SkillTableToolbar/SkillTableToolbar"

// PE 1/3 - tá muito grande, temos q limpar um monte de coisa que nem está sendo mais usada.

const SkillbaseTable = (props: Props) => {
  const classes = useStyles()

  const [order, setOrder] = React.useState<"asc" | "desc">("desc")
  const [orderBy, setOrderBy] = React.useState<keyof SkillDto>("isPriority")

  const [selectedIds, setSelectedIds] = React.useState<number[]>([])

  const filterAndSortSkills = () => {
    let skills = props.allSkills

    if (props.sortBy) {
      const property = props.sortBy.property
      const order = props.sortBy.order

      if (property === "isPriority") {
        if (order === "asc") {
          skills = skills.sort((a, b) => {
            if (a.isPriority === b.isPriority) return 0
            if (b.isPriority) return -1
            return 1
          })
        } else {
          skills = skills.sort((a, b) => {
            if (a.isPriority === b.isPriority) return 0
            if (a.isPriority) return -1 // only difference
            return 1
          })
        }
      } else if (property === "name") {
        if (order === "asc") {
          skills = skills.sort((a, b) => a.name.localeCompare(b.name))
        } else {
          skills = skills.sort((a, b) => b.name.localeCompare(a.name))
        }
      } else if (property === "currentLevel" || property === "goalLevel") {
        if (order === "asc") {
          skills = skills.sort((a, b) => a[property] - b[property])
        } else {
          skills = skills.sort((a, b) => b[property] - a[property])
        }
      } else if (property === "dependencies") {
        if (order === "asc") {
          skills = skills.sort(
            (a, b) => a.dependencies.length - b.dependencies.length
          )
        } else {
          skills = skills.sort(
            (a, b) => b.dependencies.length - a.dependencies.length
          )
        }
      } else if (property === "tagId") {
        if (order === "asc") {
          skills = skills.sort((a, b) => a.tagId - b.tagId)
        } else {
          skills = skills.sort((a, b) => b.tagId - a.tagId)
        }
      }
    }

    if (props.tag === "Untagged") {
      skills = skills.filter((s) => s.tagId === null)
    } else if (props.tag?.id) {
      const tagId = props.tag.id
      skills = skills.filter((s) => s.tagId === tagId)
    }

    return skills
  }

  const [visibleSkills, setVisibleSkills] = useState<SkillDto[]>(
    filterAndSortSkills()
  )

  useEffect(
    () => {
      setVisibleSkills(filterAndSortSkills())
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.allSkills, props.sortBy, props.tag]
  )

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof SkillDto
  ) => {
    const isDesc = orderBy === property && order === "desc"
    setOrder(isDesc ? "asc" : "desc")
    setOrderBy(property)

    props.sortSkill({
      order: isDesc ? "asc" : "desc",
      property: property,
    })
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = visibleSkills.map((skill) => skill.id)
      setSelectedIds(newSelecteds)
      return
    }
    setSelectedIds([])
  }

  const handleCheck = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selectedIds.indexOf(id)
    let newSelected: number[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedIds, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedIds.slice(1))
    } else if (selectedIndex === selectedIds.length - 1) {
      newSelected = newSelected.concat(selectedIds.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedIds.slice(0, selectedIndex),
        selectedIds.slice(selectedIndex + 1)
      )
    }

    setSelectedIds(newSelected)
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
    <React.Fragment>
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
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
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
                  onCheck={handleCheck}
                />
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Toolbar>
        <AddSkillButton tag={props.tag} />
      </Toolbar>
    </React.Fragment>
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
  preference: state.auth.preference,

  allTags: state.relearn.tags,
  allSkills: state.skillbase.skills,
  sortBy: state.skillbase.sortBy,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  savePreference: (preference: UserPreferenceDto) =>
    savePreferenceActionCreator(dispatch, preference),
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
