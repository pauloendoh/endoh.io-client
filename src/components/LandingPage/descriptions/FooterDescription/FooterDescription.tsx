import GitHubIcon from "@mui/icons-material/GitHub"
import InstagramIcon from "@mui/icons-material/Instagram"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import TwitterIcon from "@mui/icons-material/Twitter"
import {
  Avatar,
  Box,
  createStyles,
  Hidden,
  IconButton,
  Theme
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import Flex from "components/_UI/Flexboxes/Flex"
import FlexCol from "components/_UI/Flexboxes/FlexCol"
import Txt from "components/_UI/Text/Txt"
import pauloendoh from "static/images/pauloendoh.jpg"

// PE 2/3 - DRY - separate social links in a const array and map it
const FooterDescription = () => {
  const classes = useStyles()

  // my birthday is 1995-12-20
  // get my correct age
  const getMyAge = () => {
    const today = new Date()
    const birthDate = new Date("1995-12-20")
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <Flex>
      <Avatar
        alt="Paulo Endoh"
        src={pauloendoh}
        className={classes.largeAvatar}
      />
      <FlexCol ml={2} gap={2}>
        <FlexCol gap={1}>
          <Txt style={{ fontWeight: "bold" }}>Paulinn</Txt>
          <Txt>
            {getMyAge()} years old computer science graduate from São Paulo
          </Txt>
        </FlexCol>

        <Hidden smDown>
          <Txt>
            Relearn is developed with ReactJS, Node, PostgreSQL, TypeORM,
            Typescript and MaterialUI.
            <br />
            Designed in Figma and hosted in Heroku.
          </Txt>
        </Hidden>

        <Box>
          <IconButton
            size="small"
            href="https://twitter.com/paulinn1001"
            target="_blank"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            size="small"
            href="https://www.instagram.com/paulinn1001/"
            target="_blank"
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            size="small"
            href="https://www.linkedin.com/in/pauloendoh/"
            target="_blank"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            size="small"
            href="https://github.com/pauloendoh"
            target="_blank"
          >
            <GitHubIcon />
          </IconButton>
        </Box>

   
      </FlexCol>
    </Flex>
  )
}

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    largeAvatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  })
)

export default FooterDescription
