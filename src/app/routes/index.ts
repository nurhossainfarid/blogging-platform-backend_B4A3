import { Router } from 'express'
import { AuthorRoutes } from '../modules/author/author.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/authors',
    route: AuthorRoutes,
  },
]

moduleRoutes.forEach((r) => router.use(r.path, r.route))

export default router
