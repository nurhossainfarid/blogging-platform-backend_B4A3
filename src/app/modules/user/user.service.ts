import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { userSearchTerm } from './user.constant'
import { TUser } from './user.interface'
import { User } from './user.model'
import httpStatus from 'http-status'

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchTerm)
    .filter()
    .sort()
    .pagination()
    .fields()

  const result = await userQuery.modelQuery
  return result
}

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id).populate('Blogs')

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Your account was already deleted!',
    )
  }
  return result
}

const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(id, { isDeleted: true })
  return result
}

const updateUserFromDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true })
  return result
}

const blockUserIntoDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  )
  return result
}

export const UserServices = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
  blockUserIntoDB,
}
