import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 font-sans">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-xl mb-8">Learn more about our company and mission.</p>
        <Image
          src="/placeholder.jpg"
          alt="About us image"
          width={400}
          height={300}
          className="rounded-lg shadow-md mb-8"
        />
        <p className="mb-8 max-w-2xl">
          We are a passionate team dedicated to creating innovative solutions 
          using cutting-edge technologies like Next.js and React.
        </p>
        <Link href="/" className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
          Back to Home
        </Link>
      </main>
      <footer className="mt-16 text-sm text-gray-500">
        © 2024 Your Company Name. All rights reserved.
      </footer>
    </div>
  );
}
