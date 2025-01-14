import AppError from '../../errors/AppError'
import { Author } from '../author/author.model'
import { TBlog } from './blog.interface'
import httpStatus from 'http-status'
import { Blog } from './blog.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { blogSearchItem } from './blog.constant'

const createBlogIntoDB = async (payload: TBlog) => {
  // check author is exist
  const isAuthorExist = await Author.findById(payload.author)

  if (!isAuthorExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Author is not found')
  }

  const result = await Blog.create(payload)

  isAuthorExist.Blogs.push(result._id)
  await isAuthorExist.save()

  return result
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
