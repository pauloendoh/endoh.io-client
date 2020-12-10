import { Box, Link, makeStyles, Typography } from "@material-ui/core"
import FlexVCenter from "../../../../../components/shared/Flexboxes/FlexVCenter"
import React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import Flex from "../../../../../components/shared/Flexboxes/Flex"
import { ResourceDto } from "../../../../../dtos/relearn/ResourceDto"
import { ApplicationState } from "../../../../../store/store"
import { isValidUrl } from "../../../../../utils/isValidUrl"
import RateButton from "./RateButton"

function ResourceItem(props: Props) {
  const classes = useStyles()
  return (
    <Flex p={2} borderBottom="1px solid rgb(255 255 255 / 0.1)">
      {props.resource.thumbnail?.length > 0 && <Box>Thumbnail :D</Box>}
      <Box flexGrow={1}>
        <Typography variant="h6">{props.resource.title}</Typography>
        {isValidUrl(props.resource.url) && (
          <Link className={classes.link} href={props.resource.url} target="_blank">
            {props.resource.url}
          </Link>
        )}

        <Flex my={2}>
          <FlexVCenter>
            <Box pr={2}>{props.resource.estimatedTime}</Box>
            <Box pl={2} borderLeft="1px solid rgb(255 255 255)">
              {props.resource.dueDate}
            </Box>
          </FlexVCenter>

          <Flex ml="auto">
            <RateButton resource={props.resource} />

            {/* <Box ml={2}>| Delete</Box> */}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}

const useStyles = makeStyles((theme) => ({
  link: {
    // fontSize: 12
  },
}))

const mapStateToProps = (state: ApplicationState) => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

interface OwnProps {
  resource: ResourceDto
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(ResourceItem)
