import GitHubIcon from "@mui/icons-material/GitHub"
import InstagramIcon from "@mui/icons-material/Instagram"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import TwitterIcon from "@mui/icons-material/Twitter"
import {
  Avatar,
  createStyles,
  Hidden,
  IconButton,
  Link,
  Theme,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import Txt from "components/_UI/Text/Txt"
import pauloendoh from "static/images/pauloendoh.jpg"
import S from "./FooterDescription.styles"

// PE 2/3 - DRY - separate social links in a const array and map it
const FooterDescription = () => {
  const classes = useStyles()

  return (
    <S.FooterDescription>
      <Avatar
        alt="Paulo Endoh"
        src={pauloendoh}
        className={classes.largeAvatar}
      />
      <S.Content>
        <S.TextWrapper>
          <Txt style={{ fontWeight: "bold" }}>Paulo Ricardo Endoh</Txt>
          <Txt>25 years old computer science student from São Paulo</Txt>
        </S.TextWrapper>

        <Hidden smDown>
          <Txt>
            Endoh.io is developed with ReactJS, Node, PostgreSQL, TypeORM,
            Typescript and MaterialUI.
            <br />
            Designed in Figma and hosted in Heroku.
          </Txt>
        </Hidden>

        <S.SocialIconsWrapper>
          <IconButton
            size="small"
            href="https://twitter.com/pauloendoh_"
            target="_blank"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            size="small"
            href="https://www.instagram.com/pauloendoh/"
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
        </S.SocialIconsWrapper>

        <Link href="mailto:pauloendoh@gmail.com">
          <Txt>pauloendoh@gmail.com</Txt>
        </Link>
      </S.Content>
    </S.FooterDescription>
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
