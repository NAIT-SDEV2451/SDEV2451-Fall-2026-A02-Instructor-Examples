// import what we need from vitest
import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
// this is going to give us the ability to select items in the component
import { screen, waitFor } from "@testing-library/react";

// we're going to perform actions as a user, we're going to need
import userEvent from '@testing-library/user-event'

// we're going to be changing some responses from our mock server.
import {http, HttpResponse } from 'msw'

// import our login page.
import LoginPage from "../pages/auth/LoginPage";
import { renderWithProvders } from "../test/renderWithProviders";
import { server } from "../test/server";

const LOGIN_URL = "http://localhost:8000/api/v1/auth/login/"

// vitest mocking guide: https://vitest.dev/guide/mocking
// we're going to create a mock function
// we have full control over this and we can look at how many times
// and how it was called in the code.
const mockNavigate = vi.fn()

// let's replace useNavigate from react router dom with our piece
vi.mock('react-router-dom', async (importOriginal) => {
  // actual import of the package
  // note: all of the api for react router dom.
  const actual = await importOriginal()
  // we're only going to replace use navigate with our mock
  return {
    ...actual, // everything here is the actual
    useNavigate: () => mockNavigate // this is the replacement!
  }
})

describe("LoginPage", () => {
  // set up the user event so we can make events as if we were a user.
  const user = userEvent.setup()

  // we're going ot clean up the mock before each test
  beforeEach(()=> {
    mockNavigate.mockClear() // just clears any calls/data in it.
  })

  // minor clear the localStorage
  afterEach(()=> {
    // clean up the local storage so no token are present.
    localStorage.clear()
  })

  // if the user has the right credentials
  // they should be logged in.
  test("navigates to the home page after a successful login", async ()=> {
    // render with providers
    renderWithProvders(<LoginPage />)

    // type the credentials in
    const usernameField = screen.getByPlaceholderText("Enter your username")
    const passwordField = screen.getByPlaceholderText("Enter your password")

    // typing is done with the user which is from the userEvent.setup()
    await user.type(usernameField, "gary")
    await user.type(passwordField, "fakepasswordlol")

    // click the submit button
    const submitButton = screen.getByRole("button", {name: "Log In"})

    await user.click(submitButton)

    // wait for a mock to be called with a certain argument.
    await waitFor(() => {
      // if it's successful I want to test that my mock
      // was called with the args of "/"
      expect(mockNavigate).toHaveBeenCalledWith("/")
    })
  })

  // if they don't have the right credentials
  // then the user should be notified.
  test("does not navigate when the login fails", async () => {
    // make our server return a failed or unoauthorized resposne.
    server.use(
      http.post(LOGIN_URL, () => {
        return HttpResponse.json(
          { detail: "No active account for this user."},
          { status: 401 }
        )
      })
    )
    renderWithProvders(<LoginPage />)

    // type the credentials
    // click the submit button.
    const usernameField = screen.getByPlaceholderText("Enter your username")
    const passwordField = screen.getByPlaceholderText("Enter your password")

    // typing is done with the user which is from the userEvent.setup()
    await user.type(usernameField, "non_existant_user")
    await user.type(passwordField, "fakepasswordlol")

    // click the submit button
    const submitButton = screen.getByRole("button", {name: "Log In"})

    await user.click(submitButton)

    // check to see the message is shown.
    await waitFor(()=> {
      const errorMessage = screen.getByText("No active account for this user.")
      expect(errorMessage).toBeInTheDocument()
    })

    // we can check to see if the mock wasn't called
    // because it's only called onSuccess!
    expect(mockNavigate).not.toHaveBeenCalled()
  })

})

