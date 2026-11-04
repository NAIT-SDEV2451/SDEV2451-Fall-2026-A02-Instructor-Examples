// note docs here: https://mswjs.io/docs/quick-start
// the actual "mock " server that we're using.
import { setupServer } from 'msw/node'
// import our endpoints
import { handlers } from './handlers'

// we're going to spread the endpoints as args to
// the setup server function
export const server = setupServer(...handlers)
