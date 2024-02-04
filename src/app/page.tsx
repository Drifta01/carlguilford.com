import { seedData } from "@/mock-data/mock-utils";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        className=" border-purple-500 border rounded-lg"
        alt="Screenshots of the dashboard project showing desktop version"
      />
    </section>
  );
}
