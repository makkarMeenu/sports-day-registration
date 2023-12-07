import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[100%]">
      <div className="fixed h-[100%] bg-cover bg-center w-[100%]">
        <Image
          layout="fill"
          objectFit="cover"
          src={
            "https://cultmtl.com/wp-content/uploads/2023/05/EFBF4B5C-2829-4B45-9326-5EA930E3A2E4.jpeg"
          }
          alt="Mountains with snow"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Link href="/events">
          <div className="text-xl m-5 arrow py-3 px-6 rounded-sm text-white bg-blue-500 hover:bg-blue-600">
            Register now
          </div>
        </Link>
      </div>
    </div>
  );
}
