import { Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"

import { Box, Tab, Tabs, Typography } from "@mui/material"
import FlexVCenter from "components/_UI/Flexboxes/FlexVCenter"
import { MySimpleMenu } from "components/_UI/MySimpleMenu/MySimpleMenu"
import { useSaveTagMutation } from "hooks/react-query/relearn/useSaveTagMutation"
import { useMyPathParams } from "hooks/utils/react-router/useMyPathParams"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { useDrop } from "react-dnd"
import { useLocation } from "react-router-dom"
import useRelearnStore from "store/zustand/domain/resources/useRelearnStore"
import useResponsiveStore from "store/zustand/useResponsiveStore"
import { urls } from "utils/urls"
import { ResourceDto } from "../../../../types/domain/relearn/ResourceDto"
import { TagDto } from "../../../../types/domain/relearn/TagDto"
import Flex from "../../../_UI/Flexboxes/Flex"
import SelectedResourcesOptions from "./SelectedResourcesOptions/SelectedResourcesOptions"

interface Props {
  onTabChange: (newTabIndex: number) => void
  tabIndex: number
  todoResources: ResourceDto[]
  completedResources: ResourceDto[]
}

// PE 2/3
function ContentHeader(props: Props) {
  const { tags: allTags } = useRelearnStore()

  const classes = useStyles()
  const location = useLocation()
  const { selectedResourceIds } = useRelearnStore()

  const [tag, setTag] = useState<TagDto | null>(null)
  const [height, setHeight] = useState(0)

  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const newHeight = rootRef.current?.clientHeight ?? 0
    if (height !== newHeight) {
      setHeight(newHeight)
    }
  }, [rootRef.current?.clientHeight])

  const { tagId } = useMyPathParams()

  // PE 1/3 -- useMemo instead?
  useEffect(() => {
    const { pathname } = location

    // /relearn
    if (pathname === urls.pages.resources.index) {
      setTag(null)
    }
    // /relearn/tag/:id
    else if (pathname.startsWith(urls.pages.resources.tag)) {
      const tagId = Number(pathname.split("/").pop())

      if (tagId) {
        const foundTag = allTags.find((t) => t.id === tagId)
        if (foundTag) {
          setTag(foundTag)
          document.title = foundTag.name + " - Relearn"
        }
      }
    }

    // if you click in a tag or if you add/edit a tag
  }, [location, allTags])

  // PE 2/3
  const handleChangeTab = (
    event: React.ChangeEvent<{}>,
    newTabIndex: number
  ) => {
    props.onTabChange(newTabIndex)
  }

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "CARD",
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }))
  dropRef(rootRef)

  const [scrollInterval, setScrollInterval] = useState<NodeJS.Timer | null>(
    null
  )

  useEffect(() => {
    if (isOver) {
      setScrollInterval(
        setInterval(() => {
          window.scrollBy(0, -10)
        }, 10)
      )
    } else if (scrollInterval) {
      clearInterval(scrollInterval)
      setScrollInterval(null)
    }
  }, [isOver])

  const isResponsiveSearching = useResponsiveStore(
    (s) => s.isResponsiveSearching
  )

  const { mutate: submitSaveTag, isLoading } = useSaveTagMutation()
  const handleChangeSorting = (sortingBy: "default" | "priority") => {
    if (!tag) {
      alert("No tag selected!")
      return
    }
    if (tag) {
      submitSaveTag({
        ...tag,
        id: tag.id,
        sortingBy,
      })
    }
  }

  const sortingMenuLabel = useMemo(() => {
    if (isLoading || !tag) {
      return "Loading..."
    }

    return tag?.sortingBy === "default"
      ? "Default sorting"
      : "Sorting by priority"
  }, [tag])

  return (
    <div
      className={classes.root}
      ref={rootRef}
      style={{
        position: isResponsiveSearching ? "unset" : undefined,
      }}
    >
      <Flex justifyContent="space-between" width="100%">
        <Typography variant="h5">{tag ? tag.name : "Untagged"}</Typography>
      </Flex>

      <Box mt={2} />

      {selectedResourceIds.length > 0 ? (
        <SelectedResourcesOptions />
      ) : (
        <FlexVCenter justifyContent={"space-between"}>
          <Tabs
            className={classes.tabs}
            value={props.tabIndex}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChangeTab}
            aria-label="disabled tabs example"
          >
            <Tab
              className={classes.tab}
              label={`${props.todoResources.length} Bookmarked`}
            />
            <Tab
              className={classes.tab}
              id="completed-resources-tab-button"
              label={`${props.completedResources.length} Completed`}
            />
          </Tabs>

          <MySimpleMenu
            target={
              <Typography
                sx={{
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {sortingMenuLabel}
              </Typography>
            }
            items={[
              [
                {
                  label: "Default sorting",
                  selected: tag?.sortingBy === "default",
                  disabled: tag?.sortingBy === "default",
                  onClick: () => handleChangeSorting("default"),
                },
                {
                  label: "Sorting by priority",
                  selected: tag?.sortingBy === "priority",
                  disabled: tag?.sortingBy === "priority",
                  onClick: () => handleChangeSorting("priority"),
                },
              ],
            ]}
          />
        </FlexVCenter>
      )}
    </div>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    position: "sticky",
    background: theme.palette.background.default,
    zIndex: theme.zIndex.appBar - 2,
    top: 72,
    paddingTop: 24,
    marginTop: -8,
  },
  tabs: {
    minHeight: 32,
  },
  tab: {
    padding: 0,
    minWidth: "inherit",
    width: "inherit",
    "&:nth-child(2)": {
      marginLeft: 16,
    },
  },
  outerChip: {
    cursor: "inherit",
    marginBottom: 2,
    marginTop: 2,
    marginRight: 4,
  },
}))

export default ContentHeader
