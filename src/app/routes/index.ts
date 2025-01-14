import { Router } from 'express'
import { AuthorRoutes } from '../modules/author/author.route'
import { UserRoutes } from '../modules/user/user.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/authors',
    route: AuthorRoutes,
  },
]

moduleRoutes.forEach((r) => router.use(r.path, r.route))

export default router
