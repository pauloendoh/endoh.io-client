import Checkbox from "@material-ui/core/Checkbox"
import { makeStyles } from "@material-ui/core/styles"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableSortLabel from "@material-ui/core/TableSortLabel"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { SkillDto } from "../../../../dtos/skillbase/SkillDto"
import { ApplicationState } from "../../../../store/store"

interface IHeadCell {
  id: keyof SkillDto
  label: string
  numeric: boolean
  align: "center" | "left" | "right"
  disablePadding: boolean
}

const headCells: IHeadCell[] = [
  {
    id: "isPriority",
    label: "Priority",
    numeric: false,
    align: "center",
    disablePadding: true,
  },
  {
    id: "name",
    label: "Skill Name",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "currentLevel",
    numeric: true,
    disablePadding: false,
    label: "Now",
    align: "center",
  },
  {
    id: "goalLevel",
    numeric: true,
    disablePadding: false,
    label: "Goal",
    align: "center",
  },

  {
    id: "tagId",
    numeric: false,
    disablePadding: false,
    label: "Tag",
    align: "left",
  },
  {
    id: "expectations",
    numeric: false,
    disablePadding: false,
    label: "Expectations",
    align: "center",
  },
]

interface OwnProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof SkillDto
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  // order: "asc" | "desc"
  // orderBy: string
  rowCount: number
}

const mapStateToProps = (state: ApplicationState) => ({
  sortBy: state.skillbase.sortBy,
})

type Props = ReturnType<typeof mapStateToProps> & OwnProps

const SkillbaseTableHead = (props: Props) => {
  const classes = useStyles()

  const createSortHandler = (property: keyof SkillDto) => (
    event: React.MouseEvent<unknown>
  ) => {
    props.onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" className={classes.th}>
          <Checkbox
            className={classes.th}
            indeterminate={
              props.numSelected > 0 && props.numSelected < props.rowCount
            }
            checked={props.rowCount > 0 && props.numSelected === props.rowCount}
            onChange={props.onSelectAllClick}
            inputProps={{ "aria-label": "Select all skills" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.th}
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={
              props.sortBy.property === headCell.id ? props.sortBy.order : false
            }
          >
            <TableSortLabel
              active={props.sortBy.property === headCell.id}
              direction={
                props.sortBy.property === headCell.id
                  ? props.sortBy.order
                  : "desc"
              }
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {props.sortBy.property === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {props.sortBy.order === "desc"
                    ? "sorted descending"
                    : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const useStyles = makeStyles((theme) => ({
  th: {
    backgroundColor: "#2B2B2B",
  },

  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}))

export default connect(mapStateToProps)(SkillbaseTableHead)
