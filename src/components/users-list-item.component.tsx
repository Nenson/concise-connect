import { Avatar, ListItem, Typography } from "@mui/material"

interface IProps {
  readonly nickName: string
  readonly isSelected: boolean
  readonly onSelect: () => void
}

export function UsersListItem({ nickName, isSelected, onSelect }: IProps) {
  return (
    <ListItem
      onClick={() => {
        onSelect()
      }}
      sx={{
        display: "flex",
        gap: 1,
        padding: 2,
        ":hover": {
          cursor: "pointer",
          background: "rgba(76, 175, 80, 0.5) !important",
        },
        background: isSelected ? "rgba(76, 175, 80, 0.5) !important" : "unset",
      }}
    >
      <Avatar sizes="small" sx={{ width: 28, height: 28 }}>
        {nickName.slice(0, 1).toUpperCase()}
      </Avatar>
      <Typography color="primary">{nickName}</Typography>
    </ListItem>
  )
}
