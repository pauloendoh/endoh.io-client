import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import Checkbox from "@mui/material/Checkbox"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableSortLabel from "@mui/material/TableSortLabel"
import React from "react"
import useSkillbaseStore from "store/zustand/domain/useSkillbaseStore"
import { SkillDto } from "../../../../types/domain/skillbase/SkillDto"

interface IHeaderCell {
  id: keyof SkillDto
  label: string
  align: "center" | "left" | "right"
}

// PE 2/3 - Better separate in a utils file?
const headCells: IHeaderCell[] = [
  {
    id: "name",
    label: "Skill Name",
    align: "left",
  },
  {
    id: "currentLevel",
    label: "Now",
    align: "center",
  },
  {
    id: "goalLevel",
    label: "Goal",
    align: "center",
  },

  {
    id: "priority",
    label: "Priority",
    align: "center",
  },
]

interface Props {
  selectedCount: number
  onSort: (property: keyof SkillDto) => void
  onClickSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void

  rowCount: number
}

const SkillbaseTableHead = (props: Props) => {
  const classes = useStyles()
  const { sortBy } = useSkillbaseStore()

  const getSortDirection = (headCellId: keyof SkillDto) => {
    return sortBy.property === headCellId ? sortBy.order : "desc"
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.th} align="center">
          #
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.th}
            key={headCell.id}
            align={headCell.align}
          >
            <TableSortLabel
              active={sortBy.property === headCell.id}
              direction={getSortDirection(headCell.id)}
              onClick={() => props.onSort(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}

        <TableCell padding="checkbox" className={classes.th}>
          <Checkbox
            className={classes.th}
            checked={
              props.rowCount > 0 && props.selectedCount === props.rowCount
            }
            onChange={props.onClickSelectAll}
            inputProps={{ "aria-label": "Select all skills" }}
          />
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

const useStyles = makeStyles<Theme>(() => ({
  th: {
    backgroundColor: "#2B2B2B",
  },
}))

export default SkillbaseTableHead
