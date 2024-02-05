import { seedData } from "@/mock-data/mock-utils";
import { Button } from "antd";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex max-h[50vh] flex-col items-center justify-between p-24">
      <Image
        src="/next.svg"
        width={300}
        height={200}
        className=" border-purple-500 border-2 rounded-lg"
        alt="Screenshots of the dashboard project showing desktop version"
      />
      <Button color="primary" size="large">
        Try again
      </Button>
    </section>
  );
}
