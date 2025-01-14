import { Types } from 'mongoose'

export type TAuthorName = {
  firstName: string
  middleName: string
  lastName: string
}

export type TAuthor = {
  email: string
  user: Types.ObjectId
  name: TAuthorName
  password: string
  gender: 'male' | 'female' | 'others'
  dateOfBirth?: string
  contactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  profileImg?: string
  Blogs: Types.ObjectId[]
  isDeleted: boolean
}
