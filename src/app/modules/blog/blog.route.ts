import express from 'express'
import { BlogController } from './blog.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.post('/', auth(USER_ROLE.user), BlogController.createBlog)

router.get('/', BlogController.getBlogs)

router.get('/:id', BlogController.getSingleBlog)

router.put('/:id', auth(USER_ROLE.user), BlogController.updateBlog)

router.delete('/:id', auth(USER_ROLE.admin, USER_ROLE.user), BlogController.deleteBlog)

export const BlogRoutes = router
