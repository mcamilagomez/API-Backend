import createUserAction from "../userActions/create.user.action"
import { loginUserAction } from "../userActions/read.user.action"
import { UserModel, UserType } from "../userModel/user.model"
import { CreateUserType } from "../user.types"
import { updateUserAction } from "../userActions/update.user.action"
import { disableUserAction } from "../userActions/delete.user.action"
import { Request, Response } from 'express'


export const loginUser = async (req: Request, res: Response) => {
  return await loginUserAction(req, res)
}


async function createUser(userData: CreateUserType): Promise<UserType> {
  const createdUser = await createUserAction(userData)
  return createdUser
}

async function updateUser(userId: string, updateData: Partial<UserType>): Promise<UserType | null> {
  return await updateUserAction(userId, updateData)
}


async function disableUser(userId: string): Promise<UserType | null> {
  return await disableUserAction(userId)
}

export { createUser, updateUser, disableUser }
