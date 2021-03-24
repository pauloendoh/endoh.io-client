import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core"
import LabelIcon from "@material-ui/icons/Label"
import { Form, Formik } from "formik"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { Dispatch } from "redux"
import Flex from "../../../../components/shared/Flexboxes/Flex"
import API from "../../../../consts/API"
import MY_AXIOS from "../../../../consts/MY_AXIOS"
import { FollowingTagDto } from "../../../../dtos/feed/FollowingTagDto"
import MyAxiosError from "../../../../interfaces/MyAxiosError"
import { setFollowingTags } from "../../../../store/auth/authActions"
import { ApplicationState } from "../../../../store/store"
import * as utilsActions from "../../../../store/utils/utilsActions"

// PE 2/3
const FollowDialog = (props: Props) => {
  const { username } = useParams<{ username: string }>()

  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])

  useEffect(() => {
    if (props.open) {
      setSelectedTagIds(props.followingTags.map((t) => t.tagId))
    }
  }, [props.open, props.followingTags])

  const toggleTagId = (tagId: number) => {
    if (selectedTagIds.includes(tagId)) {
      setSelectedTagIds(selectedTagIds.filter((id) => id !== tagId))
    } else {
      setSelectedTagIds([...selectedTagIds, tagId])
    }
  }

  const onClose = () => {
    setSelectedTagIds([])
    props.onClose()
  }

  const handleSubmit = () => {
    const data = props.publicTags.map((publicTag) => ({
      tagId: publicTag.id,
      isFollowing: selectedTagIds.includes(publicTag.id),
    }))

    MY_AXIOS.post<FollowingTagDto[]>(API.user.followingTags(username), data)
      .then((res) => {
        props.setFollowingTags(res.data)
        props.setSuccessMessage("Saved!")
      })
      .catch((err: MyAxiosError) => {
        props.setErrorMessage(err.response.data.errors[0].message)
      })
      .finally(() => {
        onClose()
      })
  }

  return (
    <Dialog
      onClose={onClose}
      open={props.open}
      fullWidth
      maxWidth="sm"
      aria-labelledby="follow-dialog"
    >
      <Box pb={1} px={1}>
        <Formik
          initialValues={props.profile}
          onSubmit={(formikValues, { setSubmitting }) => {
            handleSubmit()
          }}
        >
          {({ errors, values, isSubmitting, setFieldValue, handleChange }) => (
            <Form>
              <DialogTitle id="follow-dialog-title">
                Follow {username}
              </DialogTitle>
              <DialogContent>
                <Box>
                  <List component="nav" aria-label="User resource lists">
                    {props.publicTags.map((tag) => (
                      <ListItem
                        button
                        key={tag.id}
                        onClick={() => toggleTagId(tag.id)}
                        selected={selectedTagIds.includes(tag.id)}
                        // selected={Number(tagId) === tag.id}
                      >
                        <ListItemText>
                          <Flex>
                            <LabelIcon style={{ color: tag.color }} />
                            <Box ml={1}>
                              {tag.name}
                              {/* <Typography
                                variant="inherit"
                                className={classes.resourcesCount}
                              >
                                {getResourcesFromListId(tag.id).length}
                              </Typography> */}
                            </Box>
                          </Flex>
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box mt={2}></Box>

                <Flex mt={4}>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                    id="save-follow-button"
                  >
                    Save
                  </Button>

                  <Box ml={1}>
                    <Button onClick={() => onClose()} variant="text">
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
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  profile: state.profile.profile,
  publicTags: state.profile.publicLists,
  followingTags: state.auth.followingTags,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSuccessMessage: (message: string) =>
    dispatch(utilsActions.setSuccessMessage(message)),
  setFollowingTags: (followingTags: FollowingTagDto[]) =>
    dispatch(setFollowingTags(followingTags)),
  setErrorMessage: (message: string) =>
    dispatch(utilsActions.setErrorMessage(message)),
})

interface OwnProps {
  open: boolean
  onClose: () => void
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(FollowDialog)
