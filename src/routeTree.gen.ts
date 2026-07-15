import { rootRoute } from './routes/__root'
import { indexRoute } from './routes/index'
import { authRoute } from './routes/auth'
import { commandRoute } from './routes/command'

export const routeTree = rootRoute.addChildren([
  indexRoute,
  authRoute,
  commandRoute,
])
