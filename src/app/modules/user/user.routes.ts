import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { createAuthorValidationSchema } from '../author/author.validation'

const router = express.Router()

router.post(
  '/create-author',
  validateRequest(createAuthorValidationSchema),
  UserController.createAuthor,
)

export const UserRoutes = router
