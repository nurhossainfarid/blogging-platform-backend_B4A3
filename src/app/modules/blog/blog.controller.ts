import { TUserResponse } from '../../interface/global'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { User } from '../user/user.model'
import { BlogService } from './blog.service'
import httpStatus from 'http-status'

const createBlog = catchAsync(async (req, res) => {
  const userEmail = req.user.email
  const findUser = (await User.isUserExistsByEmail(userEmail)) as TUserResponse
  const result = await BlogService.createBlogIntoDB({
    ...req.body,
    author: findUser._id,
  })

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  })
})

const getBlogs = catchAsync(async (req, res) => {
  const searchTerm = req.query
  const result = await BlogService.getBlogsFromDB(searchTerm)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: result,
  })
})

const getSingleBlog = catchAsync(async (req, res) => {
  const result = await BlogService.getSingleBlogFromDB(req.params.id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog fetched successfully',
    data: result,
  })
})

const updateBlog = catchAsync(async (req, res) => {
  const result = await BlogService.updateBlogInDB(req.params.id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  })
})

const deleteBlog = catchAsync(async (req, res) => {
  await BlogService.deleteBlogFromDB(req.params.id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
  })
})

export const BlogController = {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
}
