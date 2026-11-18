// note docs here: https://mswjs.io/docs/quick-start
// our vite.config.js points to the file
// what this file does is run the server before all of the test.
import { afterAll, beforeAll, afterEach } from "vitest";

// we're going import the matchers so that they are available.
// docs here: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"

// import the server we've created
import { server } from "./server";

// run the server before the tests
beforeAll(()=> server.listen({ onUnhandledRequest: "warn"}))

// clean up the server after each tests
afterEach(()=> server.resetHandlers())

// close the server after its done.
afterAll(()=> server.close())
