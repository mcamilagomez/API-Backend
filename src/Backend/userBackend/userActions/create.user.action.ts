
import { CreateUserType } from "../user.types"
import { UserType, UserModel } from "../userModel/user.model"
// DECLARE ACTION FUNCTION
async function createUserAction(userData: CreateUserType): Promise<UserType> {
  const results = await UserModel.create(userData)

  return results
}

// EXPORT ACTION FUNCTION
export default createUserAction
