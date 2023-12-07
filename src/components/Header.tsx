// Header component
import Link from "next/link";
import CartRoute from "./CartRoute";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between z-1 h-16">
      <Link href="/">
        <h1 className="text-2xl font-bold cursor-pointer">
          Sports Day Registration
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <Link
          href="/events"
          className="hover:text-gray-300 transition duration-300"
        >
          Events
        </Link>
        <CartRoute />
      </div>
    </header>
  );
}
