import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'
import httpStatus from 'http-status'

const createAuthor = catchAsync(async (req, res) => {
  const { author: authorData } = req.body

  const result = await UserServices.createAuthorIntoDb(authorData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author is created successfully',
    data: result,
  })
});

export const UserController = {
    createAuthor,
}
