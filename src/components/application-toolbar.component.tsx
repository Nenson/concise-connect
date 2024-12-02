import { Avatar, Box } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import { RouterOutputs } from "@/utils/trpc"

interface IProps {
  readonly user: RouterOutputs["user"]["fetchMany"]["data"][number]
}

export function ApplicationToolbar({ user }: IProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        justifyContent: "space-between",
        alignItems: "center",
        padding: 4,
        width: { md: "6rem" },
        height: { xs: "6rem", md: "unset" },
        backgroundColor: "#333333",
      }}
    >
      <IconButton color="primary">
        <VolumeUpIcon />
      </IconButton>
      <Avatar>{user.nickName.slice(0, 1).toUpperCase()}</Avatar>
    </Box>
  )
}
