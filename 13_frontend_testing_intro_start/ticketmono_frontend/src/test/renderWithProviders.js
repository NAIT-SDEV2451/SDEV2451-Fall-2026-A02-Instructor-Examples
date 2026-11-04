// our app.js renders components that need context providers
// so we're going to create a helper to do this.
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// we don't really have a browser but we do need router functionality
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import { AuthProvider } from "../contexts/AuthContext";

// this is going to replace render from testing library so nothing breaks.
// note here that the ui is going to be a component to render.
export function renderWithProvders(ui, {initialEntries = ["/"]} = {}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {retry: false},
      mutations: {retry: false},
    }
  })

  return render( // testing library render!
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MemoryRouter initialEntries={initialEntries}>
          {ui /* this is the component we're going to render. */}
        </MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>
  )

}