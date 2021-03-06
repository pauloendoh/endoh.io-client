import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Tooltip } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import MuiDialogContent from "@material-ui/core/DialogContent"
import MuiDialogTitle from "@material-ui/core/DialogTitle"
import IconButton from "@material-ui/core/IconButton"
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import CloseIcon from "@material-ui/icons/Close"
import Rating from "@material-ui/lab/Rating"
import { Form, Formik } from "formik"
import React from "react"
import { GlobalHotKeys } from "react-hotkeys"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import Flex from "../../../components/shared/Flexboxes/Flex"
import MyCurrencyInput from "../../../components/shared/MyInputs/MyCurrencyInput"
import MyTextField from "../../../components/shared/MyInputs/MyTextField"
import API from "../../../consts/API"
import MY_AXIOS from "../../../consts/MY_AXIOS"
import CategoryGetDto from "../../../interfaces/dtos/monerate/CategoryDtos/CategoryGetDto"
import ExpenseGetDto from "../../../interfaces/dtos/monerate/ExpenseGetDto"
import ExpensePostDto from "../../../interfaces/dtos/monerate/ExpensePostDto"
import PlaceGetDto from "../../../interfaces/dtos/monerate/PlaceGetDto"
import * as monerateActions from "../../../store/monerate/monerateActions"
import { ApplicationState } from "../../../store/store"
import SelectCategoryInput from "../Inputs/SelectCategoryInput/SelectCategoryInput"
import SelectPlaceInput from "../Inputs/SelectPlaceInput/SelectPlaceInput"

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

// PE 1/3
const ExpenseDialog = (props: Props) => {
  // 20201215 - Actually, I can change rating inside formik values, using setFieldValue
  const [rating, setRating] = React.useState(0)

  const handleSetRating = (val: number) => {
    if (val === rating) {
      setRating(0)
    } else {
      setRating(val)
    }
  }

  const handleClickOpen = () => {
    props.startNewExpense()
    setRating(null)
  }
  const handleClose = () => {
    props.closeExpenseModal()
  }

  const handleSubmit = (
    values: ExpensePostDto,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    // I gotta fix this... MyCurrencyInput is returning event.target.value as string
    values.value = parseFloat(values.value as any)
    values.rating = rating

    MY_AXIOS.post<ExpenseGetDto>("/monerate/expense", values)
      .then((res) => {
        props.addOrUpdateExpense(res.data)
      })
      .finally(() => {
        setSubmitting(false)
        props.closeExpenseModal()
      })
  }

  const handleConfirmDelete = (id: number) => {
    if (window.confirm("Delete this expense?")) {
      MY_AXIOS.delete(`${API.monerate.expense}/${id}`)
        .then((res) => {
          props.removeExpense(id)
        })
        .finally(() => {
          props.closeExpenseModal()
        })
    }
  }

  const keyMap = { openModal: "q" }
  const handlers = {
    openModal: () => {
      handleClickOpen()
    },
  }

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <Box>
        {/* This button should be out of this component...? */}
        <Tooltip title="(q) Quick add expense">
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
            data-testid="new-expense-button"
          >
            <Box display="flex" alignItems="center">
              <FontAwesomeIcon icon={faPlus} />
              <Box ml={1}>New Expense</Box>
            </Box>
          </Button>
        </Tooltip>

        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={!!props.editingExpense}
          fullWidth
          maxWidth="md"
          data-testid="edit-expense-modal"
        >
          <Box pb={1} px={1}>
            <Formik
              initialValues={props.editingExpense}
              onSubmit={(formikValues, { setSubmitting }) => {
                handleSubmit(formikValues, setSubmitting)
              }}
            >
              {({ setFieldValue, values, isSubmitting, handleChange }) => (
                <Form>
                  <DialogTitle
                    id="edit-expense-dialog-title"
                    onClose={handleClose}
                  >
                    {values.id ? "Edit expense" : "New expense"}
                  </DialogTitle>
                  <DialogContent>
                    <Flex>
                      <Box>
                        <Typography component="legend">Place</Typography>
                        <SelectPlaceInput
                          value={values.place?.id ? values.place.id : null}
                          onChange={(e, value) => {
                            const place = value as PlaceGetDto
                            setFieldValue("place", place)
                          }}
                        />
                      </Box>
                      <Box ml={2}>
                        <Typography component="legend">Name</Typography>
                        <MyTextField
                          id="name"
                          name="name"
                          value={values.name}
                          inputProps={{ "aria-label": "expense-name-input" }}
                          hiddenLabel
                          placeholder="Eggs, PS5 game..."
                          onChange={handleChange}
                        />
                      </Box>

                      <Box ml={2} width={125}>
                        <Typography component="legend">Value ($)</Typography>
                        <MyCurrencyInput
                          id="value"
                          name="value"
                          value={values.value}
                          hiddenLabel
                          placeholder="$"
                          variant="outlined"
                          autoComplete="off"
                          onChange={(e) => {
                            handleChange(e)
                          }}
                          size="small"
                        />
                      </Box>

                      <Box ml={2}>
                        <Typography component="legend">Rating</Typography>
                        <Box mt={1}>
                          <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                              handleSetRating(newValue)
                            }}
                            onKeyPress={(e) => {
                              if (
                                ["0", "1", "2", "3", "4", "5"].includes(e.key)
                              ) {
                                handleSetRating(parseFloat(e.key))
                              }
                            }}
                          />
                        </Box>
                      </Box>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Flex mt={2}>
                        <Box>
                          <Typography component="legend">Category</Typography>
                          <SelectCategoryInput
                            value={values.category ? values.category.id : null}
                            onChange={(e, value) => {
                              const category = value as CategoryGetDto
                              setFieldValue("category", category)
                            }}
                          />
                        </Box>
                        <Box ml={2} flexGrow={1}>
                          <Typography component="legend">
                            Extra notes
                          </Typography>
                          <MyTextField
                            id="description"
                            name="description"
                            value={values.description}
                            hiddenLabel
                            onChange={handleChange}
                            fullWidth
                            multiline
                            placeholder="Reminders, links..."
                          />
                        </Box>
                      </Flex>
                      <Flex alignItems="flex-end">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          // onClick={handleClose}
                          variant="contained"
                          color="primary"
                          id="save-expense-button"
                        >
                          Save
                        </Button>
                        {values.id ? (
                          <Box ml={2}>
                            <Button
                              disabled={isSubmitting}
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleConfirmDelete(values.id)}
                            >
                              Delete
                            </Button>
                          </Box>
                        ) : null}
                      </Flex>
                    </Flex>
                  </DialogContent>
                  {/* <DialogActions>
              
              </DialogActions> */}
                </Form>
              )}
            </Formik>
          </Box>
        </Dialog>
      </Box>
    </GlobalHotKeys>
  )
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })

interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string
  children: React.ReactNode
  onClose: () => void
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

// PE 1/3 ? do I use this? Do I need this?
const DialogContent = withStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))(MuiDialogContent)

const mapStateToProps = (state: ApplicationState) => ({
  editingExpense: state.monerate.editingExpense,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addOrUpdateExpense: (expense: ExpenseGetDto) =>
    dispatch(monerateActions.addOrUpdateExpense(expense)),
  removeExpense: (id: number) => dispatch(monerateActions.removeExpense(id)),

  startNewExpense: () => dispatch(monerateActions.startNewExpense()),
  closeExpenseModal: () => dispatch(monerateActions.closeExpenseModal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseDialog)
