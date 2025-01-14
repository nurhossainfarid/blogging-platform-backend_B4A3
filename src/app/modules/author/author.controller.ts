import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthorServices } from './author.service'
import httpStatus from 'http-status'

const getAllAuthors = catchAsync(async (req, res) => {
  const result = await AuthorServices.getAllAuthorsFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Authors are retrieved successfully',
    data: result,
  })
})

const getSingleAuthor = catchAsync(async (req, res) => {
  const result = await AuthorServices.getSingleAuthorFromDB(req.params.id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author is retrieved successfully',
    data: result,
  })
})

const deleteAuthor = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AuthorServices.deleteAuthorFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author is deleted successfully',
    data: result,
  })
})

export const AuthorController = {
  getAllAuthors,
  getSingleAuthor,
  deleteAuthor,
}
