import { Box, Divider, List, Typography } from "@mui/material"
import { UsersListItem } from "./users-list-item.component"
import { RouterOutputs } from "@/utils/trpc"

interface IProps {
  readonly users: RouterOutputs["user"]["fetchMany"]["data"]
}

export function UsersList({ users }: IProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: { xs: 20, md: 4 },
        backgroundColor: "#d6d4d4",
      }}
    >
      <Box
        sx={{
          padding: 4,
          backgroundColor: "#333333",
        }}
      >
        <Typography variant="h4" color="white">
          People
        </Typography>
      </Box>
      <Divider />
      <List
        sx={{
          overflowY: "auto",
          maxHeight: "100%",
          padding: 0,
          "li:nth-child(odd)": { background: "rgba(76, 175, 80, 0.3)" },
          "li:nth-child(even)": { background: "rgba(100, 200, 10, 0.3)" },
        }}
      >
        {(users || []).map((user) => (
          <UsersListItem key={user.id} nickName={user.nickName} />
        ))}
      </List>
    </Box>
  )
}
