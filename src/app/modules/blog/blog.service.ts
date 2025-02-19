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

const updateBlogInDB = async (id: string, payload: Partial<TBlog>) => {
  const result = await Blog.findByIdAndUpdate(id, payload, { new: true })
  return result
}

const deleteBlogFromDB = async (id: string) => {
  try {
    const blog = await Blog.findById(id)
    if (!blog) {
      throw new Error('Blog not found')
    }

    const result = await Blog.findByIdAndDelete(id)
    if (!result) {
      throw new Error('Failed to delete blog')
    }

    await User.findByIdAndUpdate(blog.author, { $pull: { blogs: id } })

    return result
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message)
  }
}

export const BlogService = {
  createBlogIntoDB,
  getBlogsFromDB,
  getSingleBlogFromDB,
  updateBlogInDB,
  deleteBlogFromDB,
}
