import { data } from "@/utils/data";
import { ToastContainer, toast } from "react-toastify";

export default async function Page({
  params: { event },
}: {
  params: { event: number };
}) {
  const eventData = await getEvent(event);
  const [eventDetails] = await Promise.all([eventData]);
  if (!eventDetails) {
    toast.error("Event not found");
    return null;
  }
  return (
    <div>
      <h1>This is my event page</h1>
      <p>{eventDetails.event_name}</p>
    </div>
  );
}

async function getEvent(eventId: number) {
  const { events } = data;

  const eventDetails = events.find((event) => {
    return event.id == eventId;
  });
  return eventDetails;
}
