import { useMessagingContext } from "@/contexts/messaging.context"
import { RouterOutputs } from "@/utils/trpc"
import { Avatar, Box, ListItem, Typography } from "@mui/material"
import { format } from "date-fns"

type Message = RouterOutputs["message"]["fetchMany"]["data"][number]

interface Props {
  message: Message
}

export function MessagingSectionMessage({ message }: Props) {
  const { user } = useMessagingContext()
  const { fromUserId, text, createdAt, fromUser } = message

  return (
    <ListItem
      sx={{ justifyContent: fromUserId === user.id ? "flex-end" : "unset" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: fromUserId === user.id ? "flex-end" : "unset",
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
            sx={{
              width: 28,
              height: 28,
              order: fromUserId === user.id ? 2 : 1,
            }}
          >
            {fromUserId === user.id
              ? user.nickName.slice(0, 1).toUpperCase()
              : fromUser.nickName.slice(0, 1).toUpperCase()}
          </Avatar>
          <Typography
            variant="body2"
            sx={{ order: fromUserId === user.id ? 1 : 2 }}
          >
            {fromUserId === user.id ? user.nickName : fromUser.nickName}
          </Typography>
        </Box>
        <Typography variant="caption">
          {format(createdAt, "dd-MM-yyyy hh:ss")}
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: fromUserId === user.id ? "right" : "unset" }}
        >
          {text}
        </Typography>
      </Box>
    </ListItem>
  )
}
