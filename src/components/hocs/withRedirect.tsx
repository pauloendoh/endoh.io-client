import React, { useState } from "react"
import { Redirect } from "react-router-dom"

export interface IWithRedirectProps {
  redirectTo?: (url: string) => void
}

// um hoc é uma função que recebe um functional component e retorna um outro functional component
export const withRedirect = <Props extends object>(
  Component: React.FC<Props & IWithRedirectProps>
) => {
  const ResultComponent = (props: Props & IWithRedirectProps) => {
    const [url, setUrl] = useState("")

    return (
      <React.Fragment>
        <Component {...props} redirectTo={(url: string) => setUrl(url)} />

        {url.length > 0 && <Redirect to={url} />}
      </React.Fragment>
    )
  }

  return ResultComponent
}

