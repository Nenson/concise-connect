import { Box, Divider, List, Typography } from "@mui/material"
import { UsersListItem } from "./users-list-item.component"

export function UsersList() {
  const dummyUsers = [
    { id: 1, nickName: "John Doe" },
    { id: 2, nickName: "Jane Doe" },
    { id: 3, nickName: "John Doe" },
    { id: 4, nickName: "Jane Doe" },
    { id: 5, nickName: "John Doe" },
    { id: 6, nickName: "Jane Doe" },
    { id: 7, nickName: "John Doe" },
    { id: 8, nickName: "Jane Doe" },
    { id: 9, nickName: "John Doe" },
    { id: 10, nickName: "Jane Doe" },
  ]

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
        {dummyUsers.map((user) => (
          <UsersListItem key={user.id} nickName={user.nickName} />
        ))}
      </List>
    </Box>
  )
}
