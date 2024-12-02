import { Box, Modal, Typography } from "@mui/material"
import { CreateUserForm } from "./create-user-form.component"

interface IProps {
  readonly open: boolean
  readonly onClose: () => void
}

export function CreateUserModal({ open, onClose }: IProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
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
        <CreateUserForm onSuccess={onClose} />
      </Box>
    </Modal>
  )
}
