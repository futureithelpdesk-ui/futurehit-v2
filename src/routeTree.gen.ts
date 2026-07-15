import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { Route as rootRoute } from './routes/__root'
import { Route as IndexRoute } from './routes/index'
import { Route as AuthRoute } from './routes/auth'
import { Route as CommandRoute } from './routes/command'

const routeTree = rootRoute.addChildren([
  IndexRoute,
  AuthRoute,
  CommandRoute,
])

export { routeTree }
