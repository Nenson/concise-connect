import { db } from "@/server/db"
import { User } from "@prisma/client"
import {
  IUserCreateInput,
  IUserFetchManyInput,
  IUserFetchOneInput,
} from "./user.validation-schemas"

export interface IUserCreateOutput {
  readonly data: User | null
  readonly error: {
    readonly code: string
    readonly message: string
  } | null
}

export async function createUser(
  input: IUserCreateInput
): Promise<IUserCreateOutput> {
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

export async function fetchUser(input: IUserFetchOneInput) {
  const user = await db.user.findFirst({
    where: {
      nickName: input.nickName,
    },
  })

  return {
    data: user,
    error: null,
  }
}

export interface IUserFetchManyOutput {
  readonly data: User[]
  readonly error: null
}

export async function fetchUsers(
  input: IUserFetchManyInput
): Promise<IUserFetchManyOutput> {
  const users = await db.user.findMany({
    where: {
      id: {
        not: input.excludeId,
      },
    },
  })

  return {
    data: users,
    error: null,
  }
}
