import { Box, Button, Dialog } from "@mui/material"
import { Form, Formik } from "formik"
import { useAxios } from "hooks/utils/useAxios"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import useDialogsStore from "store/zustand/useDialogsStore"
import apiUrls from "utils/url/urls/apiUrls"
import * as monerateActions from "../../../store/monerate/monerateActions"
import { ApplicationState } from "../../../store/store"
import PlaceGetDto from "../../../types/domain/monerate/PlaceGetDto"
import Flex from "../../_UI/Flexboxes/Flex"
import MyTextField from "../../_UI/MyInputs/MyTextField"

const EditPlaceModal = (props: Props) => {
  const { openConfirmDialog } = useDialogsStore()

  const myAxios = useAxios()

  const handleSubmit = (place: PlaceGetDto) => {
    myAxios
      .post<PlaceGetDto[]>(apiUrls.monerate.place, place)
      .then((res) => {
        props.setPlaces(res.data)
      })
      .finally(() => {
        props.closePlaceModal()
      })
  }

  const handleDelete = (id: number) => {
    openConfirmDialog({
      title: "Confirm delete?",
      onConfirm: () => {
        myAxios
          .delete<PlaceGetDto[]>(`${apiUrls.monerate.place}/${id}`)
          .then((res) => {
            props.setPlaces(res.data)
          })
          .finally(() => {
            props.closePlaceModal()
          })
      },
    })
  }

  return (
    <Dialog onClose={() => props.closePlaceModal()} open={!!props.editingPlace}>
      <Box margin={2}>
        <Formik
          initialValues={props.editingPlace}
          onSubmit={(formikValues, { setSubmitting }) => {
            handleSubmit(formikValues)
          }}
        >
          {({ values, isSubmitting, handleChange }) => (
            <Form>
              <MyTextField
                id="name"
                name="name"
                value={values.name}
                label="Place name"
                onChange={handleChange}
                required
                autoFocus
              />
              <Flex justifyContent="flex-end" mt={1}>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Save
                </Button>
                {values.id && (
                  <Box ml={1}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        handleDelete(values.id)
                      }}
                      color="secondary"
                      size="small"
                    >
                      Delete
                    </Button>
                  </Box>
                )}
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  editingPlace: state.monerate.editingPlace,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closePlaceModal: () => dispatch(monerateActions.closePlaceModal()),
  setPlaces: (places: PlaceGetDto[]) =>
    dispatch(monerateActions.setPlaces(places)),
})

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(EditPlaceModal)
