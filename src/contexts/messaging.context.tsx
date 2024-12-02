import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/router"

interface MessagingContextData {
  readonly selectedUserId: string | null
  readonly setSelectedUser: (userId: string) => void
}

interface Props {
  readonly children: ReactNode
}

const MessagingContext = createContext({})

export const MessagingContextProvider = ({ children }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [selectedUserId, setSelectedUserId] = useState(searchParams.get("user"))

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setSelectedUser = (userId: string) => {
    setSelectedUserId(userId)
    router.push(pathname + "?" + createQueryString("user", userId))
  }

  const MessagingContextData: MessagingContextData = {
    selectedUserId,
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
