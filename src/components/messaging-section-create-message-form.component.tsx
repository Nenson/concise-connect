import { Box, TextField, IconButton } from "@mui/material"
import { z } from "zod"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import SendIcon from "@mui/icons-material/Send"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { trpc } from "@/utils/trpc"
import { useRef } from "react"

const validationSchema = z.object({
  messageText: z.string().min(1).max(5000),
})

type FormData = z.infer<typeof validationSchema>

interface IProps {
  readonly userId: number
  readonly selectedUserId: number
}

export function MessagingSectionCreateMessageForm({
  userId,
  selectedUserId,
}: IProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      messageText: "",
    },
  })

  const formRef = useRef<HTMLFormElement | null>(null)

  const { mutate: createMessage } = trpc.message.create.useMutation()

  const messageText = watch("messageText")
  const messageTextLengthExceeded = Boolean(
    errors.messageText?.type === "too_big"
  )

  return (
    <Box
      ref={formRef}
      component="form"
      autoComplete="off"
      noValidate={true}
      onSubmit={handleSubmit((data) =>
        createMessage({
          fromUserId: userId,
          toUserId: selectedUserId,
          text: data.messageText,
        })
      )}
      sx={{
        width: "100%",
      }}
    >
      <Controller
        name="messageText"
        control={control}
        render={({ field }) => (
          <>
            <TextField
              {...field}
              id="create-message-form-messageText"
              variant="filled"
              placeholder="Type your message..."
              fullWidth={true}
              multiline={true}
              rows={4}
              onKeyDown={(e) => {
                if (selectedUserId && e.key === "Enter") {
                  e.preventDefault()
                  formRef.current && formRef.current.requestSubmit()
                }
              }}
              sx={{
                flexGrow: 20,
                "& .MuiInputBase-root": {
                  padding: "16px 40px 16px 16px",
                },
                border: messageTextLengthExceeded ? "1px solid red" : "none",
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
              type="submit"
              disabled={!messageText || messageTextLengthExceeded}
              sx={{
                position: "absolute",
                bottom: 16,
                right: 16,
              }}
            >
              <SendIcon />
            </IconButton>
          </>
        )}
      />
    </Box>
  )
}
