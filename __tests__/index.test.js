import { render, screen, fireEvent } from "@testing-library/react";
import Home from "@/app/page";
import Event from "@/components/Event";
import { SelectedEventsProvider } from "@/context/SelectedEventsContext";

import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders a page having link with href /events", () => {
    render(<Home />);

    const link = screen.getByRole("link", { name: /register now/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/events");
  });
  test("renders event in card tile format", () => {
    const mockEvent = {
      id: 1,
      event_name: "Butterfly 100M",
      event_category: "Swimming",
      start_time: "2022-12-17 13:00:00",
      end_time: "2022-12-17 14:00:00",
    };
    render(
      <SelectedEventsProvider>
        <Event event={mockEvent} />
      </SelectedEventsProvider>
    );

    // Check if each event card is displayed
    const eventCard = screen.getByTestId(`${mockEvent.id}`);

    let duration = "60 minutes";

    // Check if event details are displayed in the card
    expect(eventCard).toHaveTextContent(mockEvent.event_name);
    expect(eventCard).toHaveTextContent(mockEvent.event_category);
    expect(eventCard).toHaveTextContent(duration);
  });

  test("after registering button changes to Registered", () => {
    const mockEvent = {
      id: 1,
      event_name: "Butterfly 100",
      event_category: "Swimming",
      start_time: "2022-12-17 13:00:00",
      end_time: "2022-12-17 14:00:00",
    };
    render(
      <SelectedEventsProvider>
        <Event event={mockEvent} />
      </SelectedEventsProvider>
    );

    const selectButton = screen.getByTestId(`${mockEvent.id}-register-button`, {
      name: "Register",
    });
    fireEvent.click(selectButton);

    const selectedEvent = screen.getByTestId(`${mockEvent.id}-register-button`);
    expect(selectedEvent).toBeInTheDocument();
  });
});
