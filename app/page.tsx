import Image from "next/image";
import Link from "next/link";
import ObjectDetection from "@/components/ObjectDetection";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24 font-sans antialiased">
      <div className="flex flex-col items-center justify-center z-10 max-w-5xl w-full">
        <ObjectDetection />
      </div>
    </main>
  );
}
