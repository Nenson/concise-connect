import { ApplicationToolbar } from "@/components/application-toolbar.component"
import { CreateUserModal } from "@/components/create-user-modal.component"
import { MessagingSection } from "@/components/messaging-section.component"
import { UsersList } from "@/components/users-list.component"
import { Box } from "@mui/material"
import Head from "next/head"
import { useState } from "react"
import { useCookies } from "react-cookie"

export default function Home() {
  const [cookies] = useCookies(["user"])
  const [showModal, setShowModal] = useState(Boolean(!cookies.user))

  return (
    <>
      <Head>
        <title>Concise Connect</title>
        <meta name="description" content="Real-time chat application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <ApplicationToolbar />
          <UsersList />
          <MessagingSection />
        </Box>
        <CreateUserModal open={showModal} onClose={() => setShowModal(false)} />
      </main>
    </>
  )
}
