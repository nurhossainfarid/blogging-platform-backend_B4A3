import { Model, Types } from 'mongoose'

export type TUser = {
  email: string
  name: string
  password: string
  role: 'admin' | 'user'
  gender?: 'male' | 'female' | 'others'
  dateOfBirth?: string
  contactNo?: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress?: string
  permanentAddress?: string
  profileImg?: string
  Blogs: Types.ObjectId[]
  needsPasswordChange: boolean
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
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): boolean
}
