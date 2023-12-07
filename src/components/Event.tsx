"use client";
import Link from "next/link";
import React, { useContext } from "react";
import SelectedEventsContext from "@/context/SelectedEventsContext";
import { Event } from "@/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EventCard({ event }: { event: Event }) {
  const { addEvent }: any = useContext(SelectedEventsContext);
  const { selectedEvents }: any = useContext(SelectedEventsContext);

  const checkIfAlreadyRegistered = (event: Event) => {
    return selectedEvents.some(
      (selectedEvent: Event) => selectedEvent.id === event.id
    );
  };

  const registerEvent = () => {
    try {
      addEvent({
        id: event.id,
        event_name: event.event_name,
        event_category: event.event_category,
        start_time: event.start_time,
        end_time: event.end_time,
      });
    } catch (error) {
      console.error(error);
      toast.error("Error adding event");
      return;
    }
  };

  const startDate = new Date(event.start_time);
  const endDate = new Date(event.end_time);

  const formattedDate = startDate.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedStartTime = startDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
  });

  const durationInMinutes = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (60 * 1000)
  );

  return (
    <div
      className="card border p-4 shadow-md bg-white rounded-md"
      data-testid={`${event.id}`}
    >
      <Link href={`/events/${event.id}`}>
        <h1 className="text-xl font-bold mb-2">{event.event_name}</h1>
        <p className="text-gray-600 mb-2">{event.event_category}</p>
        <p className="text-gray-600 mb-2" suppressHydrationWarning>
          Date: {formattedDate}
        </p>
        <p className="text-gray-600 mb-2" suppressHydrationWarning>
          Start Time: {formattedStartTime}
        </p>
        <p className="text-gray-600 mb-2">
          Duration: {durationInMinutes} minutes
        </p>
      </Link>
      <button
        data-testid={`${event.id}-register-button`}
        onClick={registerEvent}
        disabled={checkIfAlreadyRegistered(event)}
        className={`w-full bg-blue-500 text-white py-2 rounded-md ${
          checkIfAlreadyRegistered(event)
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-blue-600"
        }`}
      >
        {checkIfAlreadyRegistered(event) ? "Registered" : "Register"}
      </button>
    </div>
  );
}
