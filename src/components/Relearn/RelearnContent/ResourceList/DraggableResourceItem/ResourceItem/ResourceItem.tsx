import EventIcon from "@mui/icons-material/Event"
import { Box, Link, useTheme } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import MySeeMore from "components/_UI/Text/MySeeMore/MySeeMore"
import { useSaveResourceMutation } from "hooks/relearn/useSaveResourceMutation"
import { useAxios } from "hooks/utils/useAxios"
import useHover from "hooks/utils/useHover"
import { useMyMediaQuery } from "hooks/utils/useMyMediaQuery"
import { DateTime } from "luxon"
import { useState } from "react"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import useResourceDialogStore from "store/zustand/domain/resources/useResourceDialogStore"
import useSnackbarStore from "store/zustand/useSnackbarStore"
import Icons from "utils/styles/Icons"
import { urls } from "utils/urls"
import { ResourceDto } from "../../../../../../types/domain/relearn/ResourceDto"
import Txt from "../../../../../_UI/Text/Txt"
import RatingButton from "../../../../../_common/RatingButton/RatingButton"
import ResourceThumbnail from "../../../../../_common/ResourceThumbnail/ResourceThumbnail"
import ResourceMoreIcon from "../ResourceMoreIcon/ResourceMoreIcon"
import ResourceCompletedLabel from "./ResourceCompletedLabel/ResourceCompletedLabel"
import ResourceDurationLabel from "./ResourceDurationLabel/ResourceDurationLabel"
import S from "./ResourceItem.styles"
import ResourceItemTaskCheckbox from "./ResourceItemTaskCheckbox/ResourceItemTaskCheckbox"
import ShowMoreTextField from "./ShowMoreTextField/ShowMoreTextField"

interface Props {
  resource: ResourceDto
  showTag?: boolean
  index?: number
}

// PE 1/3
function ResourceItem(props: Props) {
  const { setSuccessMessage } = useSnackbarStore()
  const { handleMouseEnter, handleMouseLeave, isHovering } = useHover()

  const { isMobile } = useMyMediaQuery()

  const { setResources } = useRelearnStore()

  const { setInitialValue: setEditingResource } = useResourceDialogStore()

  const axios = useAxios()

  const [isSaving, setIsSaving] = useState(false)
  const { mutate } = useSaveResourceMutation()
  const handleSaveRating = (rating: number | null) => {
    const resource = { ...props.resource, rating } as ResourceDto

    setIsSaving(true)
    mutate(resource, {
      onSuccess: () => {
        if (resource.rating) {
          setSuccessMessage("Resource rated!")
        } else {
          setSuccessMessage("Rating removed!")
        }
      },
      onSettled: () => {
        setIsSaving(false)
      },
    })
  }

  const onChangeTaskChecked = (checked: boolean) => {
    const resource = {
      ...props.resource,
      completedAt: checked ? new Date().toISOString() : "",
      rating: null,
    } as ResourceDto

    axios
      .post<ResourceDto[]>(urls.api.relearn.resource, resource)
      .then((res) => {
        setResources(res.data)

        if (checked) {
          setSuccessMessage("Task completed!")
        } else {
          setSuccessMessage("Task uncompleted!")
        }
      })
  }

  const hasDueDate =
    props.resource.dueDate.length > 0 && props.resource.completedAt.length === 0

  const theme = useTheme()

  return (
    <S.ResourceItemRoot
      onClick={(e) => {
        if (e.altKey) {
          e.preventDefault() // avoids downloading URL by accident
          setEditingResource(props.resource)
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="resource-item"
    >
      <Box mr={2}>
        <ResourceThumbnail
          resourceUrl={props.resource.url}
          thumbnailSrc={props.resource.thumbnail}
          linkable={true}
        />
      </Box>

      <S.Content>
        <S.TitleLinkMoreWrapper>
          <S.TitleLinkWrapper>
            <MySeeMore
              maxLines={2}
              buttonsText={{
                seeMore: "Expand",
                seeLess: "Hide",
              }}
            >
              {props.resource.title}
            </MySeeMore>

            {props.resource.url.length > 0 && (
              <Link
                href={props.resource.url}
                target="_blank"
                onClick={(e) => {
                  if (e.altKey) return
                  e.stopPropagation()
                }}
                style={{
                  maxWidth: isMobile ? 200 : 400,
                  overflow: "hidden",
                  marginRight: 16,
                }}
              >
                <Txt noWrap style={{ maxWidth: "inherit" }}>
                  {props.resource.url}
                </Txt>
              </Link>
            )}
          </S.TitleLinkWrapper>
          <ResourceMoreIcon
            index={props.index}
            resource={props.resource}
            isHovered={isHovering || isMobile}
          />
        </S.TitleLinkMoreWrapper>

        <S.IconsRow>
          <S.IconsWrapper>
            {hasDueDate && (
              <S.DueDateWrapper>
                <EventIcon fontSize="inherit" style={{ marginRight: 4 }} />
                {DateTime.fromISO(props.resource.dueDate).toFormat("LLL dd")}
              </S.DueDateWrapper>
            )}

            {props.resource.completedAt.length > 0 && !isMobile && (
              <ResourceCompletedLabel
                completedAt={props.resource.completedAt}
              />
            )}

            <ResourceDurationLabel duration={props.resource.estimatedTime} />

            {props.showTag && Boolean(props.resource.tag?.id) && (
              <FlexVCenter style={{ gap: 4 }}>
                <Icons.Label style={{ color: props.resource.tag?.color }} />
                <Txt variant="body2" noWrap style={{ width: 150 }}>
                  {props.resource.tag?.name}
                </Txt>
              </FlexVCenter>
            )}
          </S.IconsWrapper>

          {props.resource.url?.length > 0 ? (
            <RatingButton
              rating={props.resource.rating || 0}
              onChange={handleSaveRating}
              isLoading={isSaving}
            />
          ) : (
            <ResourceItemTaskCheckbox
              resource={props.resource}
              onChange={onChangeTaskChecked}
            />
          )}
        </S.IconsRow>

        {props.resource.publicReview?.length > 0 && (
          <S.PublicReviewWrapper>
            <FlexVCenter style={{ gap: 4 }}>
              <Icons.Public
                style={{
                  color: theme.palette.text.secondary,
                }}
              />
              <Txt color="textSecondary">Public notes</Txt>
            </FlexVCenter>

            <ShowMoreTextField text={props.resource.publicReview} />
          </S.PublicReviewWrapper>
        )}

        {props.resource.privateNote?.length > 0 && (
          <S.PrivateNoteWrapper>
            <FlexVCenter style={{ gap: 4 }}>
              {" "}
              <Icons.Lock
                style={{
                  color: theme.palette.text.secondary,
                }}
              />
              <Txt color="textSecondary">Private notes</Txt>
            </FlexVCenter>

            <ShowMoreTextField text={props.resource.privateNote} />
          </S.PrivateNoteWrapper>
        )}
      </S.Content>
    </S.ResourceItemRoot>
  )
}

export default ResourceItem
