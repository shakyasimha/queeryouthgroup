// import Image from "next/image";
import { roboto, openSans } from "@/ui/fonts";
import Slideshow from "@/components/Slideshow";

export default function Home() {
  return (
    <main className="bg-[#F5EFE0] w-full flex flex-col items-center justify-start px-4 pt-4">
      {/* First container - image and welcome */}
      <section className="w-full max-w-7xl">
        <Slideshow />
      </section>

      {/* You can add a Welcome section, About, etc. below this */}
      <section className="mt-8 mb-8 text-center">
        <h1 className="text-[#333] text-3xl font-bold mb-2">Queer Youth Group</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Welcome to Queer Youth Group. Here you'll find news about our events and initiatives.
        </p>
      </section>
    </main>
  );
}
