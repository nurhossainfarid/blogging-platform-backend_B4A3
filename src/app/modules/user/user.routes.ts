import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { createAuthorValidation } from '../author/author.validation'

const router = express.Router()

router.post(
  '/create-author',
  validateRequest(createAuthorValidation),
  UserController.createAuthor,
)

export const UserRoutes = router