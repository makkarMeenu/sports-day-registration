import { SelectedEventsProvider } from "@/context/SelectedEventsContext";

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SelectedEventsProvider>{children}</SelectedEventsProvider>;
}
