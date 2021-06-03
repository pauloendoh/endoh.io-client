import { Box } from "@material-ui/core"
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
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import MyTextField from "../../../components/shared/MyInputs/MyTextField"
import API from "../../../consts/API"
import MY_AXIOS from "../../../consts/MY_AXIOS"
import PATHS from "../../../consts/PATHS"
import { IdsDto } from "../../../dtos/IdsDto"
import { SkillDto } from "../../../dtos/skillbase/SkillDto"
import { UserPreferenceDto } from "../../../interfaces/dtos/AuthUserGetDto"
import { savePreferenceActionCreator } from "../../../store/auth/authActions"
import {
  removeSkills,
  sortSkill,
} from "../../../store/skillbase/skillbaseActions"
import { SortSkill } from "../../../store/skillbase/skillbaseTypes"
import { ApplicationState } from "../../../store/store"
import { setSuccessMessage } from "../../../store/utils/utilsActions"
import AddSkillButton from "./AddSkillButton/AddSkillButton"
import SkillbaseTableRow from "./SkillbaseTableRow/SkillbaseTableRow"
import SkillListSelect from "./SkillListSelect/SkillListSelect"

// PE 1/3 - tá muito grande, temos q limpar um monte de coisa que nem está sendo mais usada.

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1
//   }
//   return 0
// }

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
  align: "center" | "left" | "right"
}

const headCells: HeadCell[] = [
  {
    id: "isPriority",
    numeric: false,
    disablePadding: true,
    label: "Priority",
    align: "center",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Skill Name",
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
  // {
  //   id: "dependencies",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Dependencies",
  //   align: "left",
  // },
  {
    id: "tagId",
    numeric: false,
    disablePadding: false,
    label: "Tag",
    align: "left",
  },
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
        <TableCell padding="checkbox" className={classes.th}>
          <Checkbox
            className={classes.th}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.th}
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "desc"}
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
  numSelected: number
  textFilter: string
  onChangeFilter: (text: string) => void
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
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            id="delete-skills-icon"
            onClick={props.onClickDelete}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Box mr={2} width={450}>
          <SkillListSelect />
          {/* <MyTextField
            label="Filter by name or tag"
            value={props.textFilter}
            onChange={(e) => props.onChangeFilter(e.target.value)}
            fullWidth
          /> */}
        </Box>
      )}
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
    container: {
      maxHeight: 440,
    },
    th: {
      backgroundColor: "#2B2B2B",
    },
    table: {
      minWidth: 750,

      "& .MuiTableCell-root": {
        padding: 8,
        borderBottom: "1px solid rgb(255 255 255 / 0.1)",
      },
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

const SkillbaseTable = (props: Props) => {
  const classes = useStyles()
  const location = useLocation()

  const [order, setOrder] = React.useState<Order>(
    props.preference?.skillbaseSortSkill?.order
  )
  const [orderBy, setOrderBy] = React.useState<keyof SkillDto>(
    props.preference?.skillbaseSortSkill?.sortBy as keyof SkillDto
  )
  const [selectedIds, setSelectedIds] = React.useState<number[]>([])

  const [listId, setListId] = useState<number>(null) // null = "show all", 0 = "unlisted"

  const [textFilter, setTextFilter] = useState(
    props.preference?.skillbaseTextFilter
  )

  const [throttle, setThrottle] = useState<NodeJS.Timeout>(null)

  const handleChangeTextFilter = (text: string) => {
    setTextFilter(text)

    clearTimeout(throttle)
    setThrottle(
      setTimeout(() => {
        props.savePreference({ ...props.preference, skillbaseTextFilter: text })
      }, 200)
    )
  }

  const filterAndSortSkills = () => {
    let skills = props.skills

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

    const { pathname } = location
    if (pathname.startsWith(PATHS.skillbase.untagged)) {
      skills = skills.filter((s) => s.tagId === null)
    } else if (pathname.startsWith(PATHS.skillbase.tag + "/")) {
      const listId = Number(pathname.split("/").pop())
      if (listId) {
        skills = skills.filter((s) => s.tagId === listId)
      }
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
    [props.skills, props.sortBy, location]
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
    <Box className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          onClickDelete={handleDelete}
          textFilter={textFilter}
          numSelected={selectedIds.length}
          onChangeFilter={handleChangeTextFilter}
        />
        <TableContainer className={classes.container}>
          <Table
            stickyHeader
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
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
              rowCount={visibleSkills.length}
            />
            <TableBody>
              {
                // stableSort(props.skills, getComparator(order, orderBy))

                visibleSkills.map((skill, index) => {
                  return (
                    <SkillbaseTableRow
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
          </Table>
        </TableContainer>

        <Toolbar>
          <AddSkillButton />
        </Toolbar>
      </Paper>
    </Box>
  )
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: ApplicationState) => ({
  preference: state.auth.preference,

  allTags: state.relearn.tags,
  skills: state.skillbase.skills,
  sortBy: state.skillbase.sortBy,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  savePreference: (preference: UserPreferenceDto) =>
    savePreferenceActionCreator(dispatch, preference),
  sortSkill: (sortBy: SortSkill) => dispatch(sortSkill(sortBy)),

  removeSkills: (ids: number[]) => dispatch(removeSkills(ids)),

  setSuccessMessage: (message: string) => dispatch(setSuccessMessage(message)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SkillbaseTable)
