import { Route as rootRoute } from './routes/__root'
import { Route as IndexRoute } from './routes/index'
import { Route as AuthRoute } from './routes/auth'
import { Route as CommandRoute } from './routes/command'

// ✅ CORRECT: TanStack Router v1 syntax
const routeTree = {
  root: rootRoute,
  children: [IndexRoute, AuthRoute, CommandRoute],
}

export { routeTree }
