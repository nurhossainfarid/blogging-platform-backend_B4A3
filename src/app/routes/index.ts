import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { BlogRoutes } from '../modules/blog/blog.route'
import { AuthRoutes } from '../modules/auth/auth.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
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
