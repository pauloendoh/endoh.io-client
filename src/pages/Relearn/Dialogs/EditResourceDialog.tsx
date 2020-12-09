import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import Flex from "components/shared/Flexboxes/Flex";
import MyTextField from "components/shared/MyInputs/MyTextField";
import API from "consts/API";
import { ResourceDto } from "dtos/relearn/ResourceDto";
import { Form, Formik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import myAxios from "utils/myAxios";
import * as relearnActions from "../../../store/relearn/relearnActions";
import { ApplicationState } from "../../../store/store";

const EditResourceDialog = (props: Props) => {
  const handleSubmit = (resource: ResourceDto) => {
    myAxios
      .post<ResourceDto[]>(API.relearn.resource, resource)
      .then((res) => {
        console.log(res.data);
        // props.setPlaces(res.data);
      })
      .finally(() => {
        props.closeResourceDialog();
      });
  };

  return (
    <Dialog
      onClose={() => props.closeResourceDialog()}
      open={!!props.editingResource}
      fullWidth
      maxWidth="md"
      aria-labelledby="edit-resource-dialog"
    >
      <Box pb={1} px={1}>
        <Formik
          initialValues={props.editingResource}
          onSubmit={(formikValues, { setSubmitting }) => {
            handleSubmit(formikValues);
          }}
        >
          {({ values, isSubmitting, handleChange }) => (
            <Form>
              <DialogTitle id="edit-resource-dialog-title">
                Add Resource
              </DialogTitle>
              <DialogContent>
                <Box>
                  <Typography component="legend">Title*</Typography>
                  <MyTextField
                    id="title"
                    name="title"
                    value={values.title}
                    inputProps={{ "aria-label": "resource-title-input" }}
                    hiddenLabel
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>

                <Box mt={2}>
                  <Typography component="legend">Url</Typography>
                  <MyTextField
                    id="url"
                    name="url"
                    value={values.url}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>

                <Box mt={2}>
                  <Grid container spacing={3}>
                    <Grid item xs={6} sm={3} md={2}>
                      <Typography component="legend">Duration</Typography>
                      <MyTextField
                        id="estimatedTime"
                        name="estimatedTime"
                        value={values.estimatedTime}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={3} md={2}>
                      <Typography component="legend">Due Date</Typography>
                      <MyTextField
                        id="dueDate"
                        name="dueDate"
                        value={values.dueDate}
                        onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={8}>
                      <Typography component="legend">Tags</Typography>
                      <MyTextField
                        // tags TODO
                        // onChange={handleChange}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Flex mt={2}>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>

                  <Box ml={1}>
                    <Button
                      onClick={() => props.closeResourceDialog()}
                      variant="text"
                    >
                      Cancel
                    </Button>
                  </Box>
                </Flex>
              </DialogContent>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  // editingPlace: state.monerate.editingPlace,

  editingResource: state.relearn.editingResource,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeResourceDialog: () => dispatch(relearnActions.closeResourceDialog()),
  // setPlaces: (places: PlaceGetDto[]) =>
  //   dispatch(monerateActions.setPlaces(places)),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(EditResourceDialog);
