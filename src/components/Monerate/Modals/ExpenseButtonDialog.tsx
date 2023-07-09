import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Rating from "@mui/lab/Rating"
import { Box, DialogTitle, Tooltip } from "@mui/material"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import MuiDialogContent from "@mui/material/DialogContent"
import Typography from "@mui/material/Typography"
import { Theme, createStyles } from "@mui/material/styles"
import { Form, Formik } from "formik"
import { useAxios } from "hooks/utils/useAxios"
import React from "react"
import { GlobalHotKeys } from "react-hotkeys"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import useConfirmDialogStore from "store/zustand/useConfirmDialogStore"
import { urls } from "utils/urls"
import * as monerateActions from "../../../store/monerate/monerateActions"
import { ApplicationState } from "../../../store/store"
import CategoryGetDto from "../../../types/domain/monerate/CategoryGetDto"
import ExpenseGetDto from "../../../types/domain/monerate/ExpenseGetDto"
import ExpensePostDto from "../../../types/domain/monerate/ExpensePostDto"
import PlaceGetDto from "../../../types/domain/monerate/PlaceGetDto"
import Flex from "../../_UI/Flexboxes/Flex"
import MyTextField from "../../_UI/MyInputs/MyTextField"
import SelectCategoryInput from "../Inputs/SelectCategoryInput/SelectCategoryInput"
import SelectPlaceInput from "../Inputs/SelectPlaceInput/SelectPlaceInput"

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

// PE 1/3
const ExpenseButtonDialog = (props: Props) => {
  const { openConfirmDialog } = useConfirmDialogStore()

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

  const myAxios = useAxios()

  const handleSubmit = (
    values: ExpensePostDto,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    // I gotta fix this... MyCurrencyInput is returning event.target.value as string
    values.value = parseFloat(values.value as any)
    values.rating = rating

    myAxios
      .post<ExpenseGetDto>("/monerate/expense", values)
      .then((res) => {
        props.addOrUpdateExpense(res.data)
      })
      .finally(() => {
        setSubmitting(false)
        props.closeExpenseModal()
      })
  }

  const handleConfirmDelete = (id: number) => {
    openConfirmDialog({
      title: "Delete this expense?",
      onConfirm() {
        myAxios
          .delete(`${urls.api.monerate.expense}/${id}`)
          .then((res) => {
            props.removeExpense(id)
          })
          .finally(() => {
            props.closeExpenseModal()
          })
      },
    })
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
                  <DialogTitle id="edit-expense-dialog-title">
                    {values.id ? "Edit expense" : "New expense"}
                  </DialogTitle>
                  <MuiDialogContent
                    sx={{
                      px: 2,
                      pb: 2,
                    }}
                  >
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
                        {/* <MyCurrencyInput
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
                        /> */}
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
                  </MuiDialogContent>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseButtonDialog)
