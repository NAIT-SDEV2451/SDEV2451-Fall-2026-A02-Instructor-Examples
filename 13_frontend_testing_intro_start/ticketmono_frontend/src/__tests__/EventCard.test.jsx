// import what we need from vitest
import { describe, it, test, expect } from "vitest";
// this is going to give us the ability to select items in the component
import { screen } from "@testing-library/react";

import EventCard from '../components/EventCard'

// import my mock events
import { mockEvents } from "../test/handlers";

// render with providers remember is going to be how we use
// react testing libraries' render.
import { renderWithProvders } from "../test/renderWithProviders";

describe("EventCard", () => { // this is like a section of tests
  // get the first event
  const event = mockEvents[0]

  test("renders the event name", () => {
    // first we render the component
    renderWithProvders( // the args here are jsx.
      <EventCard event={event} />
    )
    // let's select the title element
    const titleElement = screen.getByText(event.name)
    //  note event.name here is 'Indie Rock Night' you can also do
    // const titleElement = screen.getByText('Indie Rock Night')

    // I want to see if it's present.
    expect(titleElement).toBeInTheDocument()
  })

  // test that the venue name and address are in the document.
  // note "it and test" do the same thing, there's no difference.
  it("renders the venue name and address", ()=> {
    // first we render the component
    renderWithProvders( // the args here are jsx.
      <EventCard event={event} />
    )
    // selecting the elements
    const venueNameElement = screen.getByText(event.venue.name)
    const addressElement = screen.getByText(event.venue.address)

    expect(venueNameElement).toBeInTheDocument()
    expect(addressElement).toBeInTheDocument()
  })

  test("links to the event detail page", () => {
    renderWithProvders(<EventCard event={event} />)

    // just a note here. you can select items in different ways with
    // screen these are called queries and you can take a look here
    // https://testing-library.com/docs/queries/about/
    // to learn more about them.
    const link = screen.getByRole('link', {name: "Get Tickets"})

    expect(link).toHaveAttribute('href', '/events/1')
  })

})