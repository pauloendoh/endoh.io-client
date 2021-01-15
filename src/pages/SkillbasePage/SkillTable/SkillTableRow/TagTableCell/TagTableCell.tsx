import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TableCell,
} from "@material-ui/core"
import { Form, Formik } from "formik"
import React, { useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import Flex from "../../../../../components/shared/Flexboxes/Flex"
import MyTextField from "../../../../../components/shared/MyInputs/MyTextField"
import API from "../../../../../consts/API"
import MY_AXIOS from "../../../../../consts/MY_AXIOS"
import { SkillDto } from "../../../../../dtos/skillbase/SkillDto"
import {
  TagDto,
  newTagDto,
} from "../../../../../interfaces/dtos/relearn/TagDto"

import MyAxiosError from "../../../../../interfaces/MyAxiosError"
import { removeTag, setTags } from "../../../../../store/relearn/relearnActions"

import { ApplicationState } from "../../../../../store/store"
import {
  setErrorMessage,
  setSuccessMessage,
} from "../../../../../store/utils/utilsActions"
import H5 from "../../../../../components/shared/Text/H5"

const TagTableCell = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formType, setFormType] = useState("none" as "none" | "edit" | "create")

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setFormType("none")
  }

  const handleSubmit = (
    values: TagDto,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true)

    MY_AXIOS.post<TagDto[]>(API.relearn.tag, values)
      .then((res) => {
        props.setTags(res.data)
        props.setSuccessMessage("Tag added successfully!")

        handleClose()
      })
      .catch((err: MyAxiosError) => {
        props.setErrorMessage(err.response.data.errors[0].message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handleDelete = (tagId: number ) => {
    if (window.confirm("Confirm delete?")) {
      MY_AXIOS.delete(`${API.relearn.tag}/${tagId}`).then((res) => {
        props.setSuccessMessage("Tag deleted!")
        props.removeTag(tagId)
      })
    }
  }


  const findTagById = (id: number) => {
    return props.tags.find((tag) => tag.id === id)
  }

  return (
    <TableCell>
      <Button onClick={handleOpen}>
        {/*  PE 1/3  */}
        {props.skill.tagId && props.tags.length
          ? findTagById(props.skill.tagId).name
          : "+ Add tag"}
      </Button>
      <Dialog
        onClose={handleClose}
        open={isOpen}
        fullWidth
        maxWidth="xs"
        aria-labelledby="skill-tag-dialog"
      >
        <Box pb={1} px={1}>
          <Formik
            initialValues={newTagDto()}
            onSubmit={(formikValues, { setSubmitting }) => {
              handleSubmit(formikValues, setSubmitting)
            }}
          >
            {({ values, isSubmitting, handleChange, setFieldValue }) => (
              <Form>
                <DialogContent>
                  <Box mb={2}>
                    <List>
                      {props.tags.map((tag) => (
                        <ListItem
                          button
                          key={tag.id}
                          selected={props.skill.tagId === tag.id}
                          onClick={() => {
                            props.onChange(tag)
                            handleClose()
                          }}
                        >
                          <ListItemText>{tag.name}</ListItemText>
                          <ListItemSecondaryAction>
                            <IconButton
                              onClick={() => {
                                setFieldValue("id" as keyof TagDto, tag.id)
                                setFieldValue("name" as keyof TagDto, tag.name)
                                setFormType("edit")
                              }}
                              edge="end"
                              aria-label="edit"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => {
                                handleDelete(tag.id)
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  {formType !== "none" && (
                    <React.Fragment>
                      <Divider />

                      <Box my={2}>
                        <H5>{values.id ? "Edit Tag" : "Create tag"}</H5>
                      </Box>
                      <MyTextField
                        data-testid="tag-name-input"
                        id={"name" as keyof TagDto}
                        name={"name" as keyof TagDto}
                        value={values.name}
                        inputProps={{ "aria-label": "tag-name-input" }}
                        required
                        label="Name"
                        onChange={handleChange}
                        fullWidth
                        autoFocus
                      />

                      <Flex mt={2}>
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          variant="contained"
                          color="primary"
                          id="save-tag-button"
                        >
                          Save
                        </Button>

                        <Box ml={1}>
                          <Button
                            onClick={() => {
                              setFormType("none")
                            }}
                            variant="text"
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Flex>
                    </React.Fragment>
                  )}
                </DialogContent>
              </Form>
            )}
          </Formik>
        </Box>
      </Dialog>
    </TableCell>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  tags: state.relearn.tags,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // addTag: (tag: TagDto) => dispatch(addTag(tag)),
  setTags: (tags: TagDto[]) => dispatch(setTags(tags)),
  removeTag: (id: number) => dispatch(removeTag(id)),
  
  setSuccessMessage: (message: string) => dispatch(setSuccessMessage(message)),
  setErrorMessage: (message: string) => dispatch(setErrorMessage(message)),
})

interface OwnProps {
  skill: SkillDto
  onChange: (tag: TagDto) => void
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(TagTableCell)
