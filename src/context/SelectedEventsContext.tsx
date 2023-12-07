"use client";
import { createContext, useEffect, useState } from "react";
import { Event } from "../types";
import { ToastContainer, toast } from "react-toastify";
// Define the context
const SelectedEventsContext: any = createContext<any>(null);

// Create the provider component
export const SelectedEventsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // State to store selected events
  const [selectedEvents, setSelectedEvents] = useState([]);

  // useEffect to initialize state from localStorage
  useEffect(() => {
    setSelectedEventsToState();
  }, []);

  // Function to set selected events from localStorage to state
  const setSelectedEventsToState = () => {
    const selectedEventsFromLocalStorage =
      localStorage.getItem("selectedEvents");

    if (selectedEventsFromLocalStorage) {
      setSelectedEvents(JSON.parse(selectedEventsFromLocalStorage));
    }
  };

  // Function to check if two events have overlapping times
  const haveOverlappingTimes = (event1: Event, event2: Event) => {
    const startTime1 = new Date(event1.start_time).getTime();
    const endTime1 = new Date(event1.end_time).getTime();
    const startTime2 = new Date(event2.start_time).getTime();
    const endTime2 = new Date(event2.end_time).getTime();
    return startTime1 < endTime2 && endTime1 > startTime2;
  };

  // Function to add an event
  const addEvent = async (event: Event) => {
    // Check if the maximum limit of 3 events is reached
    const isMaxEventsReached = selectedEvents.length >= 3;

    // Check if the event overlaps with any existing event in selectedEvents
    const timeOverlaps = selectedEvents.some((selectedEvent: Event) =>
      haveOverlappingTimes(selectedEvent, event)
    );

    // If the event doesn't overlap and the maximum limit is not reached, add it
    if (!timeOverlaps && !isMaxEventsReached) {
      const newSelectedEvents = [...selectedEvents, event];
      localStorage.setItem("selectedEvents", JSON.stringify(newSelectedEvents));
      toast.success("Registered successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      setSelectedEventsToState();
      console.log("hello");
    } else {
      // Show alert if the event overlaps or the maximum limit is reached
      if (isMaxEventsReached) {
        toast.error("You can only register a maximum of 3 events.", {
          position: toast.POSITION.TOP_CENTER,
          toastId: "success1",
        });
      } else if (timeOverlaps) {
        toast.error(
          "The event overlaps with an existing event. Please choose a different time.",
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }
    }
  };

  // Function to remove an event
  const removeEvent = async (event: Event) => {
    const newSelectedEvents = selectedEvents.filter(
      (selectedEvent: Event) => selectedEvent.id !== event.id
    );
    localStorage.setItem("selectedEvents", JSON.stringify(newSelectedEvents));
    setSelectedEventsToState();
    toast.success("Successfully canceled registration");
  };

  // Provide the context value to the children
  return (
    <SelectedEventsContext.Provider
      value={{ selectedEvents, addEvent, removeEvent }}
    >
      {children}
    </SelectedEventsContext.Provider>
  );
};

// Export the context
export default SelectedEventsContext;
