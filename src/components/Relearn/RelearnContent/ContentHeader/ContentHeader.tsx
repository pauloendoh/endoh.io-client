import { Box, makeStyles, Tab, Tabs, Typography } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import { useDrop } from "react-dnd"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom"
import { Dispatch } from "redux"
import useRelearnStore from "store/zustand/domain/useRelearnStore"
import { removeTag } from "../../../../store/relearn/relearnActions"
import { ApplicationState } from "../../../../store/store"
import { ResourceDto } from "../../../../types/domain/relearn/ResourceDto"
import { TagDto } from "../../../../types/domain/relearn/TagDto"
import { SkillDto } from "../../../../types/domain/skillbase/SkillDto"
import pageUrls from "../../../../utils/url/urls/pageUrls"
import Flex from "../../../_UI/Flexboxes/Flex"
import SelectedResourcesOptions from "./SelectedResourcesOptions/SelectedResourcesOptions"
import SkillChips from "./SkillChips/SkillChips"

// PE 2/3
function ContentHeader(props: Props) {
  const classes = useStyles()
  const location = useLocation()
  const { selectedResourceIds } = useRelearnStore()

  const [tag, setTag] = useState<TagDto>(null)
  const [height, setHeight] = useState(0)

  const rootRef = useRef<HTMLDivElement>()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const newHeight = rootRef.current.clientHeight
    if (height !== newHeight) {
      setHeight(newHeight)
    }
  })

  // PE 2/3
  useEffect(() => {
    const { pathname } = location

    // /relearn
    if (pathname === pageUrls.relearn.index) {
      setTag(null)
    }
    // /relearn/tag/:id
    else if (pathname.startsWith(pageUrls.relearn.tag)) {
      const tagId = Number(pathname.split("/").pop())

      if (tagId) {
        const currentTag = props.allTags.find((t) => t.id === tagId)
        if (currentTag) {
          setTag(currentTag)
          document.title = currentTag.name + " - Endoh.io"
        }
      }
    }

    // if you click in a tag or if you add/edit a tag
  }, [location, props.allTags])

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

  const [scrollInterval, setScrollInterval] = useState<NodeJS.Timer>(null)

  useEffect(() => {
    if (isOver) {
      setScrollInterval(
        setInterval(() => {
          window.scrollBy(0, -10)
        }, 10)
      )
    } else {
      clearInterval(scrollInterval)
      setScrollInterval(null)
    }
  }, [isOver])

  return (
    <div className={classes.root} ref={rootRef}>
      <Flex justifyContent="space-between" width="100%">
        <Typography variant="h5">{tag ? tag.name : "Untagged"}</Typography>
      </Flex>

      <Box mt={2} />
      <SkillChips />

      {selectedResourceIds.length > 0 ? (
        <SelectedResourcesOptions />
      ) : (
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
            label={`${props.todoResources.length} Resources`}
          />
          <Tab
            className={classes.tab}
            id="completed-resources-tab-button"
            label={`${props.completedResources.length} Completed`}
          />
        </Tabs>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "sticky",
    background: theme.palette.background.default,
    zIndex: theme.zIndex.appBar,
    top: 73,
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

const mapStateToProps = (state: ApplicationState) => ({
  allTags: state.relearn.tags,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeTag: (id: number) => dispatch(removeTag(id)),
})

interface OwnProps {
  onTabChange: (newTabIndex: number) => void
  tabIndex: number
  todoResources: ResourceDto[]
  completedResources: ResourceDto[]
  skills: SkillDto[]
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(ContentHeader)
