"use client";

import Header from "./Header";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main className="h-[calc(100vh-64px)]">{children}</main>
    </div>
  );
}
