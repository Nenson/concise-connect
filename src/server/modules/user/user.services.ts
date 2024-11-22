import { db } from "@/server/db"

interface IUserCreateInput {
  readonly nickName: string
}

export async function createUser(input: IUserCreateInput) {
  const existingUser = await db.user.findFirst({
    where: {
      nickName: input.nickName,
    },
  })

  if (existingUser) {
    return {
      data: null,
      error: {
        code: "BAD_REQUEST",
        message: "User already exists",
      },
    }
  }

  const createdUser = await db.user.create({
    data: {
      nickName: input.nickName,
    },
  })

  return {
    data: createdUser,
    error: null,
  }
}

export async function fetchUsers() {
  const users = await db.user.findMany()

  return {
    data: users,
    error: null,
  }
}
