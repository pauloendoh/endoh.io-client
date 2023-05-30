import { forwardRef } from "react"
import { Link } from "react-router-dom"

type Props = React.ComponentProps<typeof Link>

const MyRouterLink = forwardRef<HTMLAnchorElement, Props>((props, ref) => (
  <Link
    ref={ref}
    {...props}
    style={{
      textDecoration: "none",
      color: "inherit",
      ...props.style,
    }}
  />
))

export default MyRouterLink
