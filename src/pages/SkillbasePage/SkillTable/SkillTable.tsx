import { Box, TableFooter } from "@material-ui/core"
import Checkbox from "@material-ui/core/Checkbox"
import IconButton from "@material-ui/core/IconButton"
import Paper from "@material-ui/core/Paper"
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableSortLabel from "@material-ui/core/TableSortLabel"
import Toolbar from "@material-ui/core/Toolbar"
import Tooltip from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"
import DeleteIcon from "@material-ui/icons/Delete"
import clsx from "clsx"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import API from '../../../consts/API'
import MY_AXIOS from '../../../consts/MY_AXIOS'
import { SkillDto } from "../../../dtos/skillbase/SkillDto"
import { ApplicationState } from "../../../store/store"
import AddSkillButton from "./AddSkillButton/AddSkillButton"
import SkillTableRow from "./SkillTableRow/SkillTableRow"
import {IdsDto} from '../../../dtos/IdsDto'
import { removeSkills } from '../../../store/skillbase/skillbaseActions'
import { setSuccessMessage } from '../../../store/utils/utilsActions'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = "asc" | "desc"

// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key
// ): (
//   a: { [key in Key]: number | string },
//   b: { [key in Key]: number | string }
// ) => number {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy)
// }

// function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0])
//     if (order !== 0) return order
//     return a[1] - b[1]
//   })
//   return stabilizedThis.map((el) => el[0])
// }

interface HeadCell {
  disablePadding: boolean
  id: keyof SkillDto
  label: string
  numeric: boolean
}

const headCells: HeadCell[] = [
  {
    id: "isPriority",
    numeric: false,
    disablePadding: true,
    label: "Priority",
  },
  { id: "name", numeric: false, disablePadding: false, label: "Skill Name" },
  {
    id: "currentLevel",
    numeric: true,
    disablePadding: false,
    label: "Current",
  },
  { id: "goalLevel", numeric: true, disablePadding: false, label: "Goal" },
  { id: "dependencies", numeric: false, disablePadding: false, label: "Dependencies" },
]

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof SkillDto
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props
  const createSortHandler = (property: keyof SkillDto) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
  })
)

interface EnhancedTableToolbarProps {
  numSelected: number, 
  onClickDelete: () => void
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles()
  const { numSelected } = props

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Your skills
        </Typography>
      )}
      {
        numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton 
            onClick={props.onClickDelete}
            aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )
        // <Tooltip title="Filter list">
        //   {/* <IconButton aria-label="filter list">
        //     <FilterListIcon />
        //   </IconButton> */}
        // </Tooltip>
      }
    </Toolbar>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
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
  })
)

const SkillTable = (props: Props) => {
  const classes = useStyles()
  const [order, setOrder] = React.useState<Order>("asc")
  const [orderBy, setOrderBy] = React.useState<keyof SkillDto>("goalLevel")
  const [selectedIds, setSelectedIds] = React.useState<number[]>([])

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof SkillDto
  ) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = props.skills.map((skill) => skill.id)
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
    MY_AXIOS.delete<SkillDto[]>(API.skillbase.skill, {
      headers: {},
      data: {ids: selectedIds} as IdsDto,
    }).then((res) => {
      props.removeSkills(selectedIds)
      props.setSuccessMessage("Skills deleted successfully!")
      setSelectedIds([])
    })
  }

  return (
    <Box className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar 
        onClickDelete={handleDelete}
        numSelected={selectedIds.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            // size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selectedIds.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.skills.length}
            />
            <TableBody>
              {
                // stableSort(props.skills, getComparator(order, orderBy))

                props.skills.map((skill, index) => {
                  return (
                    <SkillTableRow
                      key={skill.id}
                      skill={skill}
                      index={index}
                      isSelected={isSelected(skill.id)}
                      onCheck={handleCheck}
                    />
                  )
                })
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>
                  <AddSkillButton />
                </TableCell>
                <TableCell colSpan={4} />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  skills: state.skillbase.skills,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeSkills: (ids: number[]) => dispatch(removeSkills(ids)), 

  setSuccessMessage: (message: string) => dispatch(setSuccessMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(SkillTable)
