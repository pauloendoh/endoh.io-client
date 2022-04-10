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
    id: "tagId",
    label: "Tag",
    align: "left",
  },
  {
    id: "expectations",
    label: "Expectations",
    align: "center",
  },
];

const SkillbaseTableHead = (props: Props) => {
  const classes = useStyles();

  const getSortDirection = (headCellId: keyof SkillDto) => {
    return props.sortBy.property === headCellId ? props.sortBy.order : "desc";
  };

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
              active={props.sortBy.property === headCell.id}
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
      </TableRow>
    </TableHead>
  );
};

const useStyles = makeStyles((theme) => ({
  th: {
    backgroundColor: "#2B2B2B",
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
