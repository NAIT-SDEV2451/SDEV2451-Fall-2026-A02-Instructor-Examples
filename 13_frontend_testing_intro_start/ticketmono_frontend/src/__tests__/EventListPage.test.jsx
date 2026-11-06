// import what we need from vitest
import { describe, it, test, expect } from "vitest";
// this is going to give us the ability to select items in the component
import { screen, waitFor } from "@testing-library/react";

// we're going to need some msw to swap the server
// endpoints.
import {http, HttpResponse} from 'msw'

import EventsListPage from "../pages/attendee/EventsListPage";
import { renderWithProvders } from "../test/renderWithProviders";
import { server } from '../test/server'

// we'll use this is a bit later on
const EVENTS_URL = "http://localhost:8000/api/v1/events/"

// For react testing library in general you can take a look at the docs
// here: https://testing-library.com/docs/
// for screen and querying elements you can take a look here:
// https://testing-library.com/docs/queries/about/
// Docs for matchers (the second part of the expect after the dot)
// are here: https://github.com/testing-library/jest-dom
// Vitest docs right here:
// https://vitest.dev/guide/


describe("EventsListPage", () => {

  it("Shows a loading spinner while events not loaded yet", () => {
    // render the component
    // you can have a "container" which is a way you can query
    // the dom of your component.

    const { container } = renderWithProvders(<EventsListPage />)

    // see if the loading spinner element is present.
    expect(container.querySelector(".loading-spinner")).toBeInTheDocument()

  })

  // remember that it and test does the same thing.
  test("renders every event once the loading finished", async () => {
    renderWithProvders(<EventsListPage />)

    // we're going to wait to see if an item is loaded.
    await waitFor(()=> {
      // we're going to wait for the fake events
      // from the mock backend
      const event_one = screen.getByText('Indie Rock Night')
      const event_two = screen.getByText('Comedy Open Mic')

      expect(event_one).toBeInTheDocument()
      expect(event_two).toBeInTheDocument()
    })
  })

  test("shows an error message if the request fails", async () => {
    // let's swap the handler for an error response.
    server.use(
      http.get(EVENTS_URL, () => {
        return HttpResponse.json(
          {detail: "Server Error"},
          {status: 500}
        )
      })
    )

    // render the component here
    renderWithProvders(<EventsListPage />)

    // wait to see if failed events happens.
    await waitFor(()=> {
      // get the error element
      const errorElement = screen.getByText("Failed to load events. Please try again later.")
      expect(errorElement).toBeInTheDocument()
    })
  })


})