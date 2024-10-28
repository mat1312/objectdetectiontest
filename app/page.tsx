import Image from "next/image";
import Link from "next/link";
import ObjectDetection from "@/components/ObjectDetection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <ObjectDetection />
    </main>
  );
}
