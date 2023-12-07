import Event from "@/components/Event";
import { data } from "@/utils/data";

export default function EventList() {
  const { events } = data;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 p-5">
      {events.map((event) => {
        return <Event key={event.id} event={event} />;
      })}
    </div>
  );
}
