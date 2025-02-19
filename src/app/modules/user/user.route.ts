import express from 'express'
import { UserController } from './user.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.constant'

const router = express.Router()

router.get('/', auth(USER_ROLE.admin), UserController.getAllUsers)

router.get('/:id', UserController.getSingleUser)

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.deleteUser,
)

router.put(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.updateUserFromDB,
)

router.patch(
  '/:id/block',
  auth(USER_ROLE.admin),
  UserController.blockUserIntoDB,
)

export const UserRoutes = router
