/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import { TAuthor } from '../author/author.interface'
import { TUser } from './user.interface'
import { User } from './user.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { Author } from '../author/author.model'

const createAuthorIntoDb = async (payload: TAuthor) => {
  const userData: Partial<TUser> = {}

  // set author role
  userData.role = 'author'

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    userData.email = payload.email
    userData.password = payload.password

    // create user (transaction-1)
    const newUser = await User.create([userData], { session })

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    // set _id as user
    payload.user = newUser[0]._id

    const newAuthor = await Author.create([payload], { session })

    if (!newAuthor.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create author')
    }

    await session.commitTransaction()
    session.endSession()

    return newAuthor
  } catch (error: any) {
    await session.abortTransaction()
    session.endSession()

    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
  }
}

export const UserServices = {
  createAuthorIntoDb,
}
