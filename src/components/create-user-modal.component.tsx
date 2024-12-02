import { Box, Modal, Typography } from "@mui/material"
import { CreateUserForm } from "./create-user-form.component"
import { IUser } from "@/pages"

interface IProps {
  readonly onCreateUser: (user: IUser) => void
}

export function CreateUserModal({ onCreateUser }: IProps) {
  return (
    <Modal
      open={true}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: { xs: "none", md: "blur(5px)" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "100%", md: "400px" },
          height: { xs: "100%", md: "auto" },
          padding: 4,
          backgroundColor: "background.paper",
          borderRadius: { xs: 0, md: 2 },
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
          Concise Connect
        </Typography>
        <CreateUserForm
          onSuccess={(user) => {
            onCreateUser(user)
          }}
        />
      </Box>
    </Modal>
  )
}
