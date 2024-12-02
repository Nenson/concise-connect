import { ApplicationToolbar } from "@/components/application-toolbar.component"
import { CreateUserModal } from "@/components/create-user-modal.component"
import { MessagingSection } from "@/components/messaging-section.component"
import { UsersList } from "@/components/users-list.component"
import { MessagingContextProvider } from "@/contexts/messaging.context"
import { trpc } from "@/utils/trpc"
import { Box } from "@mui/material"
import Head from "next/head"
import { useEffect, useState } from "react"

export interface IUser {
  readonly id: number
  readonly nickName: string
}

export default function Home() {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = window.localStorage.getItem("user")

      if (user) {
        setUser(JSON.parse(user))
      }
    }
  })

  const setUserToLocalStorage = (userData: IUser) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("user", JSON.stringify(userData))
    }
  }

  const { data: users, refetch } = trpc.user.fetchMany.useQuery({
    excludeId: user?.id,
  })

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
          {user ? (
            <>
              <ApplicationToolbar user={user} />
              <MessagingContextProvider>
                <UsersList users={users?.data || []} />
                <MessagingSection />
              </MessagingContextProvider>
            </>
          ) : (
            <CreateUserModal
              onCreateUser={(userData) => {
                setUser(userData)
                setUserToLocalStorage(userData)
                refetch()
              }}
            />
          )}
        </Box>
      </main>
    </>
  )
}
