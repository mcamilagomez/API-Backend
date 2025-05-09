import { UserModel } from "../userModel/user.model"
import { UserType } from "../userModel/user.model"

export const updateUserAction = async (userId: string, updateData: Partial<UserType>): Promise<UserType | null> => {
  // Excluir los campos de permisos para evitar que se actualicen
  const { canCreate, canDeleteUsers, canEditUsers, canDeleteBooks, canEditBooks, ...filteredData } = updateData

  const updatedUser = await UserModel.findByIdAndUpdate(userId, filteredData, { new: true })
  return updatedUser
}
