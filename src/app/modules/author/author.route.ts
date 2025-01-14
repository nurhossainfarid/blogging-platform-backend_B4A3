import express from 'express'
import { AuthorController } from './author.controller'

const router = express.Router()

router.get('/', AuthorController.getAllAuthors)

router.get('/:id', AuthorController.getSingleAuthor)

router.delete('/:id', AuthorController.deleteAuthor)

export const AuthorRoutes = router
