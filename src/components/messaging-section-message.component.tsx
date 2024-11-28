import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  TextField,
  Typography,
} from "@mui/material"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import SendIcon from "@mui/icons-material/Send"

interface Props {
  fromUserId: number
  toUserId: number
  text: string
  createdAt: Date
}

export function MessagingSectionMessage({
  fromUserId,
  toUserId,
  text,
  createdAt,
}: Props) {
  return (
    <ListItem sx={{ justifyContent: fromUserId === 2 ? "flex-end" : "unset" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: fromUserId === 2 ? "flex-end" : "unset",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar
            sizes="small"
            sx={{ width: 28, height: 28, order: fromUserId === 2 ? 2 : 1 }}
          >
            H
          </Avatar>
          <Typography variant="body2" sx={{ order: fromUserId === 2 ? 1 : 2 }}>
            {fromUserId}
          </Typography>
        </Box>
        <Typography variant="caption">
          {`${createdAt.getHours()}:${createdAt.getMinutes()}`}
        </Typography>
        <Typography variant="body1">{text}</Typography>
      </Box>
    </ListItem>
  )
}
