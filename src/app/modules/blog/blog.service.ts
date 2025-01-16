/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError'
import { TBlog } from './blog.interface'
import httpStatus from 'http-status'
import { Blog } from './blog.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { blogSearchItem } from './blog.constant'
import { User } from '../user/user.model'
import mongoose from 'mongoose'

const createBlogIntoDB = async (payload: TBlog) => {
  // check author is exist
  const isUserExist = await User.findById(payload.author)

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Author is not found')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const result = await Blog.create([payload], { session })

    await User.updateOne(
      { _id: payload.author },
      { $push: { Blogs: result[0]._id } },
      { session },
    )

    await session.commitTransaction()
    session.endSession()
    return result
  } catch (error: any) {
    await session.abortTransaction()
    session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, error.message)
  }
}

const getBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogsQuery = new QueryBuilder(Blog.find(), query)
    .search(blogSearchItem)
    .filter()
    .sort()
    .pagination()
    .fields()

  const result = await blogsQuery.modelQuery
  return result
}

const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id)
  return result
}

export const BlogService = {
  createBlogIntoDB,
  getBlogsFromDB,
  getSingleBlogFromDB,
}
