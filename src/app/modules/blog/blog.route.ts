import express from 'express'
import { BlogController } from './blog.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.post('/create-blog', auth(USER_ROLE.user), BlogController.createBlog)

router.get('/', BlogController.getBlogs)

router.get('/:id', BlogController.getSingleBlog)

// router.delete('/:id', BlogController.deleteAuthor)

export const BlogRoutes = router
