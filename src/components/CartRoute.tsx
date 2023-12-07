// CartRoute component
import React, { useContext } from "react";
import Link from "next/link";
import SelectedEventsContext from "@/context/SelectedEventsContext";

const CartRoute = () => {
  const { selectedEvents }: any = useContext(SelectedEventsContext);

  return (
    <div className="flex items-center cursor-pointer">
      <div className="relative">
        <Link href="/cart">
          <div className="hover:text-gray-300 transition duration-300 ml-2">
            Cart
          </div>
        </Link>
        {selectedEvents.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4 -mt-2 -mr-2 flex items-center justify-center text-white text-xs">
            {selectedEvents.length}
          </span>
        )}
      </div>
    </div>
  );
};

export default CartRoute;
