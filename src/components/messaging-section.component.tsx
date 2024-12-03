import { Box, Divider, List, Typography } from "@mui/material"
import { MessagingSectionMessage } from "./messaging-section-message.component"

import { MessagingSectionCreateMessageForm } from "./messaging-section-create-message-form.component"
import { useMessagingContext } from "@/contexts/messaging.context"
import { trpc } from "@/utils/trpc"

export function MessagingSection() {
  const { user, selectedUser } = useMessagingContext()

  const { data: messages } = trpc.message.fetchMany.useQuery({
    toUserId: user.id,
    fromUserId: selectedUser?.id,
  })

  const { data: messagesSubscription } = trpc.message.onCreate.useSubscription({
    toUserId: user.id,
    fromUserId: selectedUser?.id,
  })

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
          {selectedUser &&
            (messagesSubscription?.data || messages?.data || []).map(
              (message) => <MessagingSectionMessage message={message} />
            )}
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
          {selectedUser && (
            <MessagingSectionCreateMessageForm
              userId={user.id}
              selectedUserId={selectedUser.id}
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}
