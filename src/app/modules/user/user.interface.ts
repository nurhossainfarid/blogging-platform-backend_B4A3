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
  // eslint-disable-next-line no-unused-vars
  isUserExistsByEmail(email: string): Promise<TUser>

  // instance method for user id
  // eslint-disable-next-line no-unused-vars
  isUserExistById(id: string): Promise<TUser>

  // instance method for check password is matched
  // eslint-disable-next-line no-unused-vars
  isPasswordMatched(newPassword: string): Promise<void>
}
