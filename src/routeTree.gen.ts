import { Route as rootRoute } from './routes/__root'
import { Route as IndexRoute } from './routes/index'
import { Route as AuthRoute } from './routes/auth'
import { Route as CommandRoute } from './routes/command'

const rootRouteChildren = {
  IndexRoute,
  AuthRoute,
  CommandRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
