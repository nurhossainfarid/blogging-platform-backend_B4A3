import express from 'express'
import { BlogController } from './blog.controller'

const router = express.Router()

router.post('/create-blog', BlogController.createBlog)

router.get('/', BlogController.getBlogs)

router.get('/:id', BlogController.getSingleBlog)

// router.delete('/:id', BlogController.deleteAuthor)

export const BlogRoutes = router