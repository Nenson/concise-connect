import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { IUser } from "@/pages"
import { trpc } from "@/utils/trpc"

interface MessagingContextData {
  readonly user: IUser
  readonly users: IUser[]
  readonly selectedUser: IUser | null
  readonly setSelectedUser: (userId: number) => void
}

interface Props {
  readonly children: ReactNode
  readonly user: IUser
}

const MessagingContext = createContext({})

export const MessagingContextProvider = ({ children, user }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [selectedUserId, setSelectedUserId] = useState(
    searchParams.get("user") ? Number(searchParams.get("user")) : null
  )

  const { data: users } = trpc.user.fetchMany.useQuery({
    excludeId: user?.id,
  })

  const { data: usersSubscription } = trpc.user.onCreate.useSubscription({
    excludeId: user?.id,
  })

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setSelectedUser = (userId: number) => {
    setSelectedUserId(userId)
    router.push(pathname + "?" + createQueryString("user", String(userId)))
  }

  const usersData = usersSubscription?.data || users?.data || []

  const MessagingContextData: MessagingContextData = {
    user: user,
    users: usersData,
    selectedUser:
      usersData.find((user) => user.id === Number(selectedUserId)) || null,
    setSelectedUser,
  }

  return (
    <MessagingContext.Provider value={MessagingContextData}>
      {children}
    </MessagingContext.Provider>
  )
}

export const useMessagingContext = () =>
  useContext(MessagingContext) as MessagingContextData
