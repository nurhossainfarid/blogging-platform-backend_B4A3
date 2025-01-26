import config from '../../config'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.service'
import httpStatus from 'http-status'

const registrationUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registrationUser(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  })
})

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body)
  const { refreshToken, token } = result

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  })

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Login successful!',
    success: true,
    data: { token },
  })
})

// const changePassword = catchAsync(async (req, res) => {
//   const { ...passwordData } = req.body

//   const result = await AuthServices.changePassword(req.user, passwordData)

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Password is changed successfully!',
//     data: result,
//   })
// })

// const refreshToken = catchAsync(async (req, res) => {
//   const { refreshToken } = req.cookies

//   const result = await AuthServices.refreshToken(refreshToken)

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Access token is retrieved successfully!',
//     data: result,
//   })
// })

export const AuthController = {
  registrationUser,
  loginUser,
  // changePassword,
  // refreshToken,
}
