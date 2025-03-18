import { Divider, Menu, MenuItem } from "@mui/material"

import { Box, ListItemIcon, Typography } from "@mui/material"
import React, { useMemo } from "react"
import { Link } from "react-router-dom"

type Item = {
  icon?: React.ReactNode
  label: string
  onClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
  href?: string
  selected?: boolean
  disabled?: boolean
}

type Props = {
  target: React.ReactNode
  items: Item[] | Item[][]
}

export const MySimpleMenu = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleOpenMore = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMore = () => {
    setAnchorEl(null)
  }

  const itemSections = useMemo(() => {
    if (props.items.length > 0 && Array.isArray(props.items[0])) {
      return props.items as Item[][]
    } else {
      return [props.items as Item[]]
    }
  }, [props.items])

  return (
    <Box>
      <Box
        style={{
          cursor: "pointer",
        }}
        onClick={(e) => {
          handleOpenMore(e)
        }}
      >
        {props.target}
      </Box>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={!!anchorEl}
        onClose={(e) => {
          const event = e as any
          event.preventDefault()
          handleCloseMore()
        }}
      >
        {itemSections.map((items, i) => {
          const key = items.map((item) => item.label).join("-")

          return (
            <Box key={key}>
              {i !== 0 && <Divider />}

              {items.map((item, j) => (
                <MenuItem
                  key={j}
                  component={item.href ? Link : "li"}
                  to={item.href}
                  selected={item.selected}
                  disabled={item.disabled}
                  onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                    handleCloseMore()
                    item.onClick?.(e)
                  }}
                >
                  {!!item.icon && (
                    <ListItemIcon
                      style={{
                        minWidth: "unset",
                        marginRight: 16,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                  )}
                  <Typography variant="inherit" noWrap>
                    {item.label}
                  </Typography>
                </MenuItem>
              ))}
            </Box>
          )
        })}
      </Menu>
    </Box>
  )
}
