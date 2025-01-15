import { Router } from 'express'
import { AuthorRoutes } from '../modules/author/author.route'
import { UserRoutes } from '../modules/user/user.routes'
import { BlogRoutes } from '../modules/blog/blog.route'
import { AuthRoutes } from '../modules/auth/auth.route'

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
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },

]

moduleRoutes.forEach((r) => router.use(r.path, r.route))

export default router
