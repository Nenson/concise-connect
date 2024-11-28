import {
  Box,
  Divider,
  List,
  TextField,
  IconButton,
  Typography,
} from "@mui/material"
import { MessagingSectionMessage } from "./messaging-section-message.component"

import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import SendIcon from "@mui/icons-material/Send"

export function MessagingSection() {
  const dummyMessages = [
    {
      id: 1,
      fromUserId: 1,
      toUserId: 2,
      text: "Hello, how are you?",
      date: new Date(),
    },
    {
      id: 2,
      fromUserId: 2,
      toUserId: 1,
      text: "I'm fine, thank you!",
      date: new Date(),
    },
    {
      id: 3,
      fromUserId: 1,
      toUserId: 2,
      text: "What are you doing?",
      date: new Date(),
    },
    {
      id: 4,
      fromUserId: 2,
      toUserId: 1,
      text: "I'm working on a project.",
      date: new Date(),
    },
    {
      id: 5,
      fromUserId: 1,
      toUserId: 2,
      text: "Hello, how are you?",
      date: new Date(),
    },
    {
      id: 6,
      fromUserId: 2,
      toUserId: 1,
      text: "I'm fine, thank you!",
      date: new Date(),
    },
    {
      id: 7,
      fromUserId: 1,
      toUserId: 2,
      text: "What are you doing?",
      date: new Date(),
    },
    {
      id: 8,
      fromUserId: 2,
      toUserId: 1,
      text: "I'm working on a project.",
      date: new Date(),
    },
    {
      id: 9,
      fromUserId: 1,
      toUserId: 2,
      text: "Hello, how are you?",
      date: new Date(),
    },
    {
      id: 10,
      fromUserId: 2,
      toUserId: 1,
      text: "I'm fine, thank you!",
      date: new Date(),
    },
    {
      id: 11,
      fromUserId: 1,
      toUserId: 2,
      text: "What are you doing?",
      date: new Date(),
    },
    {
      id: 12,
      fromUserId: 2,
      toUserId: 1,
      text: "I'm working on a project.",
      date: new Date(),
    },
    {
      id: 13,
      fromUserId: 1,
      toUserId: 2,
      text: "Hello, how are you?",
      date: new Date(),
    },
    {
      id: 14,
      fromUserId: 2,
      toUserId: 1,
      text: "I'm fine, thank you!",
      date: new Date(),
    },
    {
      id: 15,
      fromUserId: 1,
      toUserId: 2,
      text: "What are you doing?",
      date: new Date(),
    },
    {
      id: 16,
      fromUserId: 2,
      toUserId: 1,
      text: "I'm working on a project.",
      date: new Date(),
    },
  ]

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: { xs: 20, md: 12 },
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
          Messages
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <List
          sx={{
            overflowY: "auto",
            flexGrow: 1,
            padding: 0,
          }}
        >
          {dummyMessages.map((user) => (
            <MessagingSectionMessage
              key={user.id}
              fromUserId={user.fromUserId}
              toUserId={user.toUserId}
              text={user.text}
              createdAt={user.date}
            />
          ))}
        </List>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            width: "100%",
            padding: 2,
            flexShrink: 0,
          }}
        >
          <TextField
            variant="filled"
            placeholder="Type your message..."
            fullWidth={true}
            multiline={true}
            rows={4}
            sx={{
              flexGrow: 20,
              "& .MuiInputBase-root": {
                padding: "16px 40px 16px 16px",
              },
            }}
          />
          <IconButton
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
            }}
          >
            <HelpOutlineIcon />
          </IconButton>
          <IconButton
            color="primary"
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
