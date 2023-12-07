"use client";
import Link from "next/link";
import React, { useContext } from "react";
import SelectedEventsContext from "@/context/SelectedEventsContext";
import { Event } from "@/types";
import { toast } from "react-toastify";

export default function SelectedEventCard({ event }: { event: Event }) {
  const { removeEvent }: any = useContext(SelectedEventsContext);

  const removeEventListener = () => {
    try {
      removeEvent({
        id: event.id,
        event_name: event.event_name,
        event_category: event.event_category,
        start_time: event.start_time,
        end_time: event.end_time,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel registration. Please try again."); // Display toast for the error
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
    <div className="card border p-4 shadow-md bg-white rounded-md">
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
        onClick={removeEventListener}
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
      >
        Cancel Registration
      </button>
    </div>
  );
}
