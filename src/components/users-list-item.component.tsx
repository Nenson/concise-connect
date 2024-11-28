import { Avatar, Box, ListItem, Typography } from "@mui/material"

interface Props {
  nickName: string
}

export function UsersListItem({ nickName }: Props) {
  return (
    <ListItem
      sx={{
        display: "flex",
        gap: 1,
        padding: 2,
      }}
    >
      <Avatar sizes="small" sx={{ width: 28, height: 28 }}>
        {nickName.slice(0, 1)}
      </Avatar>
      <Typography color="primary">{nickName}</Typography>
    </ListItem>
  )
}
