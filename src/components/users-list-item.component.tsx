import { Avatar, ListItem, Typography } from "@mui/material"

interface IProps {
  readonly nickName: string
}

export function UsersListItem({ nickName }: IProps) {
  return (
    <ListItem
      sx={{
        display: "flex",
        gap: 1,
        padding: 2,
      }}
    >
      <Avatar sizes="small" sx={{ width: 28, height: 28 }}>
        {nickName.slice(0, 1).toUpperCase()}
      </Avatar>
      <Typography color="primary">{nickName}</Typography>
    </ListItem>
  )
}
