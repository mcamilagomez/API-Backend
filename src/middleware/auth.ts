import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from '../Backend/userBackend/userModel/user.model'

const secretKey = process.env.JWT_SECRET
if (!secretKey) {
  throw new Error("JWT_SECRET is not defined in the environment variables.")
}

export interface AuthenticatedRequest extends Request { 
  user?: {
    id: string
    canCreate: boolean
    canDeleteUsers: boolean
    canEditUsers: boolean
    canDeleteBooks: boolean
    canEditBooks: boolean
  }
}

export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Access token missing or invalid' })
  }

  try {
    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, secretKey) as { id: string }
    
    // Obtener el usuario desde la base de datos
    const user = await UserModel.findById(decodedToken.id)
    if (!user || !user.isActive) {
      return res.status(404).json({ message: 'User not found or inactive' })
    }

    // Añadir la información del usuario y permisos al objeto `req.user`
    req.user = {
      id: user._id.toString(),
      canCreate: user.canCreate,
      canDeleteUsers: user.canDeleteUsers,
      canEditUsers: user.canEditUsers,
      canDeleteBooks: user.canDeleteBooks,
      canEditBooks: user.canEditBooks,
      
    }

    next()
  } catch (error) {
    return res.status(403).json({ message: 'Token is invalid or expired' })
  }
}

// Middleware para verificar los permisos
export const checkPermissions = (permissionType: 'canCreate' | 'canDeleteUsers' | 'canEditUsers') => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' })
    }
    // Verificar si el usuario tiene el permiso específico
    if (!req.user[permissionType]) {
      return res.status(403).json({ message: `Forbidden: Missing ${String(permissionType)} permission` })
    }

    next()
  }
}
//Permisos para editar users, si el usuario intenta modificar su propio perfil, se permite sin permiso especial 
//Si no es su perfil, verificar el permiso `canEdit`
export const checkEditPermissions = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.id
  const targetUserId = req.params.userId

  // Si el usuario intenta modificar su propio perfil, se permite sin permiso especial
  if (userId === targetUserId) {
    return next()
  }

  // Si no es su perfil, verificar el permiso `canEdit`
  if (!req.user?.canEditUsers) {
    return res.status(403).json({ message: 'Forbidden: Insufficient permissions to edit other users' })
  }

  next()
}
export const checkDisablePermissions = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.id
  const targetUserId = req.params.userId

  // Permitir que el usuario inhabilite su propio perfil sin permiso adicional
  if (userId === targetUserId) {
    return next()
  }

  // Verificar el permiso `canDelete` para inhabilitar a otros
  if (!req.user?.canDeleteUsers) {
    return res.status(403).json({ message: 'Forbidden: Insufficient permissions to disable other users' })
  }

  next()
}
export const checkBookEditPermissions = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Verificar que el usuario tenga el permiso `canEditBooks`
  if (!req.user?.canEditBooks) {
    return res.status(403).json({ message: 'Forbidden: Insufficient permissions to edit books' })
  }

  next()
}
export const checkBookDeletePermissions = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Verificar que el usuario tenga el permiso `canDeleteBooks`
  if (!req.user?.canDeleteBooks) {
    return res.status(403).json({ message: 'Forbidden: Insufficient permissions to disable books' })
  }

  next()
}