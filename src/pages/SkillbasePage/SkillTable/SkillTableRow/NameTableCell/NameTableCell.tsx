import { makeStyles, TableCell, TextField } from "@material-ui/core"
import React, { useRef } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { SkillDto } from "../../../../../dtos/skillbase/SkillDto"
import { ApplicationState } from "../../../../../store/store"

const NameTableCell = (props: Props) => {
  const classes = useStyles()
  const ref = useRef<HTMLInputElement>(null)

  return (
    <TableCell
      onClick={() => {
        ref.current.select()
      }}
    >
      <TextField
        inputRef={ref}
        className={classes.textField}
        name={"name" as keyof SkillDto}
        value={props.value}
        onChange={props.onChange}
        autoComplete="off"
        multiline
        InputProps={{
          disableUnderline: true,
          inputProps: {
            className: classes.input,
          },
        }}
      />
    </TableCell>
  )
}

const useStyles = makeStyles((theme) => ({
  textField: {
    background: "transparent",
    cursor: "default !important",
    padding: '0px'
  },
  input: {
    cursor: "default !important",
  },
}))

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(NameTableCell)
