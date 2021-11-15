import { Box, Button, Dialog } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import useDialogsStore from "store/zustand/useDialogsStore";
import * as monerateActions from "../../../store/monerate/monerateActions";
import { ApplicationState } from "../../../store/store";
import CategoryGetDto from "../../../types/domain/monerate/CategoryGetDto";
import myAxios from "../../../utils/consts/myAxios";
import apiUrls from "../../../utils/url/urls/apiUrls";
import Flex from "../../_UI/Flexboxes/Flex";
import MyTextField from "../../_UI/MyInputs/MyTextField";

const EditCategoryModal = (props: Props) => {
  const dialogStore = useDialogsStore();

  const handleSubmit = (category: CategoryGetDto) => {
    myAxios
      .post<CategoryGetDto[]>(apiUrls.monerate.category, category)
      .then((res) => {
        props.setCategories(res.data);
      })
      .finally(() => {
        props.closeCategoryModal();
      });
  };

  const handleDelete = (id: number) => {
    dialogStore.openConfirmDialog({
      title: "Confirm delete?",
      onConfirm: () => {
        myAxios
          .delete<CategoryGetDto[]>(`${apiUrls.monerate.category}/${id}`)
          .then((res) => {
            props.setCategories(res.data);
          })
          .finally(() => {
            props.closeCategoryModal();
          });
      },
    });
  };

  return (
    <Dialog
      onClose={() => props.closeCategoryModal()}
      open={!!props.editingCategory}
    >
      <Box margin={2}>
        <Formik
          initialValues={props.editingCategory}
          onSubmit={(formikValues, { setSubmitting }) => {
            handleSubmit(formikValues);
          }}
        >
          {({ values, isSubmitting, handleChange }) => (
            <Form>
              <MyTextField
                id="name"
                name="name"
                value={values.name}
                label="Category name"
                onChange={handleChange}
                required
                autoFocus
              />
              <Flex justifyContent="flex-end" mt={1}>
                <Button
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
                        handleDelete(values.id);
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
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  editingCategory: state.monerate.editingCategory,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeCategoryModal: () => dispatch(monerateActions.closeCategoryModal()),
  setCategories: (categories: CategoryGetDto[]) =>
    dispatch(monerateActions.setCategories(categories)),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryModal);
