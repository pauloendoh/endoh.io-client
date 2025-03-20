import LabelIcon from "@mui/icons-material/Label"
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"
import { Form, Formik } from "formik"
import { useAxios } from "hooks/utils/useAxios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useProfileStore from "store/zustand/domain/useProfileStore"
import useAuthStore from "store/zustand/useAuthStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import { urls } from "utils/urls"
import { FollowingTagDto } from "../../../../types/domain/feed/FollowingTagDto"
import Flex from "../../../_UI/Flexboxes/Flex"

interface Props {
  open: boolean
  onClose: () => void
}

// PE 2/3
const FollowDialog = (props: Props) => {
  const { username } = useParams<{ username: string }>()
  const { followingTags, setFollowingTags } = useAuthStore()

  const profileStore = useProfileStore()

  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])

  const { setSuccessMessage } = useSnackbarStore()

  useEffect(() => {
    if (props.open) {
      setSelectedTagIds(followingTags.map((t) => t.tagId))
    }
  }, [props.open, followingTags])

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

  const axios = useAxios()

  const handleSubmit = () => {
    const data = profileStore.publicTags.map((publicTag) => ({
      tagId: publicTag.id,
      isFollowing: selectedTagIds.includes(Number(publicTag.id)),
    }))

    if (!username) {
      return
    }

    axios
      .post<FollowingTagDto[]>(urls.api.user.followingTags(username), data)
      .then((res) => {
        setFollowingTags(res.data)
        setSuccessMessage("Saved!")
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
        {profileStore.profile && (
          <Formik
            initialValues={profileStore.profile}
            onSubmit={(formikValues, { setSubmitting }) => {
              handleSubmit()
            }}
          >
            {({
              errors,
              values,
              isSubmitting,
              setFieldValue,
              handleChange,
            }) => (
              <Form>
                <DialogTitle id="follow-dialog-title">
                  Select tags to follow
                </DialogTitle>
                <DialogContent>
                  <Box>
                    <List component="nav" aria-label="User resource lists">
                      {profileStore.publicTags.map((tag) => (
                        <ListItem
                          button
                          key={tag.id}
                          onClick={() => toggleTagId(Number(tag.id))}
                          selected={selectedTagIds.includes(Number(tag.id))}
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
        )}
      </Box>
    </Dialog>
  )
}

export default FollowDialog
