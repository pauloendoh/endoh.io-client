import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableContainer from "@mui/material/TableContainer"
import Toolbar from "@mui/material/Toolbar"
import DarkButton from "components/_UI/Buttons/DarkButton/DarkButton"
import FlexVCenterBetween from "components/_UI/Flexboxes/FlexVCenterBetween"
import useSaveSkill from "hooks/skillbase/useSaveSkill"
import { isEqual } from "lodash"
import React, { useEffect, useState } from "react"
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { urls } from "utils/urls"
import { IdsDto } from "../../../types/domain/_common/IdsDto"
import { TagDto } from "../../../types/domain/relearn/TagDto"
import { SkillDto } from "../../../types/domain/skillbase/SkillDto"
import myAxios from "../../../utils/consts/myAxios"
import filterAndSortSkills from "../../../utils/domain/skills/filterAndSortSkills"
import SelectSkillLabelsDialog from "../SkillDialog/SkillDialogLabels/SelectSkillLabelsDialog/SelectSkillLabelsDialog"
import AddSkillButton from "./AddSkillButton/AddSkillButton"
import SkillTableToolbar from "./SkillTableToolbar/SkillTableToolbar"
import SkillbaseProgressDialog from "./SkillbaseProgressDialog/SkillbaseProgressDialog"
import SkillbaseTableHead from "./SkillbaseTableHead/SkillbaseTableHead"
import SkillbaseTableRow from "./SkillbaseTableRow/SkillbaseTableRow"

interface Props {
  tag: TagDto | "Untagged"
  fixedTag: TagDto | null
}

const SkillbaseTable = (props: Props) => {
  const classes = useStyles()
  const saveSkill = useSaveSkill()
  const {
    filter,
    sortBy,
    skills: allSkills,
    sortSkill,
    removeSkills,
  } = useSkillbaseStore()
  const { setSuccessMessage } = useSnackbarStore()

  const [labelsDialogSkill, setLabelsDialogSkill] = useState<SkillDto>()
  const [progressDialog, setProgressDialog] = useState(false)
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  // PE 1/3 Transform this into a utility hook
  const [visibleSkills, setVisibleSkills] = useState<SkillDto[]>(
    filterAndSortSkills(
      // PE 1/3 - global states don't need to be passed
      allSkills,
      sortBy,
      props.tag,
      filter.hidingDone,
      filter.labelIds,
      filter.byText,
      filter.currentGoal
    )
  )

  useEffect(() => {
    setVisibleSkills(
      filterAndSortSkills(
        allSkills,
        sortBy,
        props.tag,
        filter.hidingDone,
        filter.labelIds,
        filter.byText,
        filter.currentGoal
      )
    )
  }, [
    allSkills,
    sortBy,
    props.tag,
    filter.hidingDone,
    filter.labelIds,
    filter.byText,
    filter.currentGoal,
  ])

  const sortByProperty = (property: keyof SkillDto) => {
    // if sorting the same column, order = "asc"
    const order =
      sortBy.property === property && sortBy.order === "desc" ? "asc" : "desc"
    sortSkill({ order, property })
  }

  const checkSelectAll = (checked: boolean) => {
    if (checked) {
      const skillIds = visibleSkills.map((skill) => Number(skill.id))
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
      myAxios
        .delete<SkillDto[]>(urls.api.skillbase.skill, {
          headers: {}, // why is this?
          data: { ids: selectedIds } as IdsDto,
        })
        .then((res) => {
          removeSkills(selectedIds)
          setSuccessMessage("Skills deleted successfully!")
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
            selectedCount={selectedIds.length}
            onClickSelectAll={(e) => {
              checkSelectAll(e.target.checked)
            }}
            onSort={(headerCellId) => {
              sortByProperty(headerCellId)
            }}
            rowCount={visibleSkills.length}
          />
          <TableBody>
            {visibleSkills.map((skill, index) => {
              return (
                <SkillbaseTableRow
                  key={JSON.stringify(skill)}
                  skill={skill}
                  index={index}
                  isSelected={isSelected(Number(skill.id))}
                  onCheck={changeSkillCheck}
                  openLabelsDialog={() => {
                    const s = allSkills.find((s) => s.id === skill.id)
                    if (s) {
                      setLabelsDialogSkill({ ...s })
                      return
                    }
                    setLabelsDialogSkill(undefined)
                  }}
                />
              )
            })}

            <SelectSkillLabelsDialog
              open={!!labelsDialogSkill}
              skillId={Number(labelsDialogSkill?.id)}
              selectedLabels={labelsDialogSkill?.labels || []}
              onChange={(labels) => {
                if (labelsDialogSkill) {
                  setLabelsDialogSkill({
                    ...labelsDialogSkill,
                    labels,
                  })
                }
              }}
              onClose={() => {
                const prevSkill = allSkills.find(
                  (s) => s.id === labelsDialogSkill?.id
                )
                const prevLabelIds = new Set(
                  prevSkill?.labels?.map((l) => Number(l.id))
                )
                const newLabelIds = new Set(
                  labelsDialogSkill?.labels?.map((l) => l.id)
                )

                if (!isEqual(prevLabelIds, newLabelIds) && labelsDialogSkill)
                  saveSkill(labelsDialogSkill)
                setLabelsDialogSkill(undefined)
              }}
            />
          </TableBody>
        </Table>
      </TableContainer>

      <Toolbar>
        <FlexVCenterBetween width="100%">
          <AddSkillButton tag={props.tag} />

          <DarkButton onClick={() => setProgressDialog(true)}>
            See Progress
          </DarkButton>
          <SkillbaseProgressDialog
            open={progressDialog}
            onClose={() => setProgressDialog(false)}
          />
        </FlexVCenterBetween>
      </Toolbar>
    </>
  )
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  container: {
    maxHeight: "calc(100vh - 320px)",
  },
  table: {
    minWidth: 750,
    "& .MuiTableCell-root": {
      padding: 8,
      borderBottom: "1px solid rgb(255 255 255 / 0.1)",
    },
  },
}))

export default SkillbaseTable
