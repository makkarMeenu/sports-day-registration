"use client";
import SelectedEvent from "@/components/SelectedEvent";
import SelectedEventsContext from "@/context/SelectedEventsContext";
import type { Event } from "@/types";
import React, { useContext } from "react";

const Cart = () => {
  const { selectedEvents }: any = useContext(SelectedEventsContext);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 p-5">
      {selectedEvents.map((event: Event) => {
        return <SelectedEvent key={event.id} event={event} />;
      })}
    </div>
  );
};

export default Cart;
