import { Types } from 'mongoose'

export type TUserResponse = {
  _id: string
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
