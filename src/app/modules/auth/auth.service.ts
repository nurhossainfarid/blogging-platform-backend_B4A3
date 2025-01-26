import AppError from '../../errors/AppError'
import { TLoginUser, TRegisterUser } from './auth.interface'
import httpStatus from 'http-status'
import { createToken } from './auth.utils'
import config from '../../config'
import { User } from '../user/user.model'

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload.email)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid credentials')
  }

  // check the user already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!')
  }

  // check the user already blocked
  const userStatus = user?.isBlocked
  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!')
  }

  // checking if the password is correct
  const isPasswordMatch = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  )

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials')
  }

  // create token and sent to the client
  const jwtPayload = {
    email: user.email,
    role: user.role,
  }

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )

  return {
    token,
    refreshToken,
  }
}

// const changePassword = async (
//   userData: JwtPayload,
//   payload: { oldPassword: string; newPassword: string },
// ) => {
//   // checking if the user is exist
//   const user = await UserModel.isUserExistsById(userData.userId)

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!')
//   }

//   // check the user already deleted
//   const isDeleted = user?.isDeleted

//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!')
//   }

//   // check the user already blocked
//   const userStatus = user?.status

//   if (userStatus === 'blocked') {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!')
//   }

//   // checking if the password is correct
//   const isPasswordMatch = await UserModel.isPasswordMatched(
//     payload.oldPassword,
//     user?.password,
//   )

//   if (!isPasswordMatch) {
//     throw new AppError(httpStatus.UNAUTHORIZED, 'Password do not matched!')
//   }

//   // hash new password
//   const newHashedPassword = await bcrypt.hash(
//     payload.newPassword,
//     Number(config.bcrypt_salt_rounds),
//   )

//   await UserModel.findOneAndUpdate(
//     {
//       id: userData.userId,
//       role: userData.role,
//     },
//     {
//       password: newHashedPassword,
//       needsPasswordChange: false,
//       passwordChangedAt: new Date(),
//     },
//   )

//   return null
// }

// const refreshToken = async (token: string) => {
//   const decoded = jwt.verify(
//     token,
//     config.jwt_refresh_secret as string,
//   ) as JwtPayload

//   const { email, iat } = decoded

//   // checking if the user is exist
//   const user = await User.isUserExistsByEmail(email)

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!')
//   }

//   // check the user already deleted
//   const isDeleted = user?.isDeleted
//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!')
//   }

//   // check the user already blocked
//   const userStatus = user?.isBlocked
//   if (userStatus) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!')
//   }

//   const isJWTIssued = User.isJWTIssuedBeforePasswordChange(
//     user.passwordChangedAt,
//     iat as number,
//   )

//   if (user.passwordChangedAt && isJWTIssued) {
//     throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
//   }

//   const jwtPayload = {
//     userId: user.id,
//     role: user.role,
//   }

//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     config.jwt_access_expires_in as string,
//   )

//   return {
//     accessToken,
//   }
// }

const registrationUser = async (payload: TRegisterUser) => {
  const user = await User.isUserExistsByEmail(payload.email)

  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This user is already exists!')
  }

  const { _id, email, name } = await User.create(payload)

  return {
    _id,
    email,
    name,
  }
}

export const AuthServices = {
  loginUser,
  registrationUser,
}
