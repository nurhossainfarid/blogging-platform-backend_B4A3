import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BlogService } from './blog.service'
import httpStatus from 'http-status'

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogService.createBlogIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog created successfully',
    data: result,
  })
})

const getBlogs = catchAsync(async (req, res) => {
  const result = await BlogService.getBlogsFromDB(req.query)

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

export const BlogController = {
  createBlog,
  getBlogs,
  getSingleBlog,
}
