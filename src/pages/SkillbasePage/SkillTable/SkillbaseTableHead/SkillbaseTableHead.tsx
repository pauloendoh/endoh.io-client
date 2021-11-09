import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../../../store/store";
import { SkillDto } from "../../../../types/domain/skillbase/SkillDto";

interface IHeaderCell {
  id: keyof SkillDto;
  label: string;
  align: "center" | "left" | "right";

  // What is this? Wouldn't it be easier to be "none" | "default" ?
  disablePadding: boolean;
}

// PE 2/3 - Better separate in a utils file?
const headCells: IHeaderCell[] = [
  {
    id: "isPriority",
    label: "Priority",
    align: "center",
    disablePadding: true,
  },
  {
    id: "name",
    label: "Skill Name",
    disablePadding: false,
    align: "left",
  },
  {
    id: "currentLevel",
    disablePadding: false,
    label: "Now",
    align: "center",
  },
  {
    id: "goalLevel",
    disablePadding: false,
    label: "Goal",
    align: "center",
  },

  {
    id: "tagId",
    disablePadding: false,
    label: "Tag",
    align: "left",
  },
  {
    id: "expectations",
    disablePadding: false,
    label: "Expectations",
    align: "center",
  },
];

const SkillbaseTableHead = (props: Props) => {
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" className={classes.th}>
          <Checkbox
            className={classes.th}
            // PE 1/3 - remove?
            indeterminate={
              props.selectedCount > 0 && props.selectedCount < props.rowCount
            }
            checked={
              props.rowCount > 0 && props.selectedCount === props.rowCount
            }
            onChange={props.onClickSelectAll}
            inputProps={{ "aria-label": "Select all skills" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.th}
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={
              // PE 1/3 - Create a function for this?
              props.sortBy.property === headCell.id ? props.sortBy.order : false
            }
          >
            <TableSortLabel
              active={props.sortBy.property === headCell.id}
              // PE 1/3 - getDirection ?
              direction={
                props.sortBy.property === headCell.id
                  ? props.sortBy.order
                  : "desc"
              }
              onClick={() => props.onSort(headCell.id)}
            >
              {headCell.label}

              {/* PE 1/3 - ?? */}
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
  );
};

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
}));

const mapStateToProps = (state: ApplicationState) => ({
  sortBy: state.skillbase.sortBy,
});

interface OwnProps {
  selectedCount: number;
  onSort: (property: keyof SkillDto) => void;
  onClickSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;

  rowCount: number;
}

type Props = ReturnType<typeof mapStateToProps> & OwnProps;

export default connect(mapStateToProps)(SkillbaseTableHead);
