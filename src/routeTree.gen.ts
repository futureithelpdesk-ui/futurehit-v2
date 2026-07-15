import { Route as rootRoute } from './routes/__root'
import IndexRoute from './routes/index'
import AuthRoute from './routes/auth'
import CommandRoute from './routes/command'

const rootRouteChildren = {
  IndexRoute,
  AuthRoute,
  CommandRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
