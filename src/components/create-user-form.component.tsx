import {
  Alert,
  AlertTitle,
  Box,
  Button,
  debounce,
  IconButton,
  TextField,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { trpc } from "@/utils/trpc"
import { useCallback, useEffect, useState } from "react"
import { IUser } from "@/pages"

const validationSchema = z.object({
  nickName: z
    .string({
      required_error: "Nickname is required",
    })
    .min(2, "Nickname should be at least 2 characters long")
    .max(15, "Nickname should be at most 15 characters long"),
})

type FormData = z.infer<typeof validationSchema>

interface IProps {
  readonly onSuccess: (user: IUser) => void
}

export function CreateUserForm({ onSuccess }: IProps) {
  const [showAlert, setShowAlert] = useState(false)

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      nickName: "",
    },
  })

  const nickName = watch("nickName")

  const { data: user, refetch } = trpc.user.fetchOne.useQuery(
    {
      nickName,
    },
    { enabled: false }
  )

  const handleRefetch = useCallback(
    debounce(() => refetch(), 250),
    []
  )

  useEffect(() => {
    if (nickName.length >= 2) {
      handleRefetch()
    }
  }, [nickName])

  const isNicknameDuplicate = Boolean(user?.data?.nickName)

  const { mutate: createUser } = trpc.user.create.useMutation({
    onSuccess: async (response) => {
      if (response.data) {
        if (showAlert) {
          setShowAlert(false)
        }

        onSuccess(response.data)
      }
    },
    onError: () => {
      return setShowAlert(true)
    },
  })

  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit((data) =>
        createUser({
          nickName: data.nickName,
        })
      )}
    >
      <Controller
        name="nickName"
        control={control}
        render={({ field }) => (
          <TextField
            id="create-user-form-nickName"
            {...field}
            label="Nickname"
            variant="outlined"
            autoFocus={true}
            required={true}
            fullWidth={true}
            error={Boolean(errors.nickName?.message || isNicknameDuplicate)}
            helperText={
              errors.nickName?.message
                ? errors.nickName?.message
                : isNicknameDuplicate
                ? "Nickname is already taken"
                : ""
            }
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth={true}
      >
        Enter
      </Button>
      {showAlert && (
        <Alert
          severity="error"
          action={
            <IconButton
              color="inherit"
              size="small"
              onClick={() => {
                setShowAlert(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ marginBottom: 2 }}
        >
          <AlertTitle>Error</AlertTitle>
          Something went wrong! Please try again.
        </Alert>
      )}
    </Box>
  )
}
