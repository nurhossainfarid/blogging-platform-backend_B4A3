import { Model } from 'mongoose'

export type TUser = {
  email: string
  password: string
  needsPasswordChange: boolean
  passwordChangedAt: Date
  role: 'admin' | 'author'
  isBlocked: boolean
  isDeleted: boolean
}

export interface UserModel extends Model<TUser> {
  // instance method for user exist
  isUserExistsByEmail(email: string): Promise<TUser>

  // instance method for check password is matched
  isPasswordMatched(newPassword: string): Promise<void>
}
