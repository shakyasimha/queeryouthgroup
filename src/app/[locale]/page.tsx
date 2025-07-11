// import Image from "next/image";
// import { roboto, openSans, alegreyaSans } from "@/ui/fonts";
import Slideshow from "@/components/Slideshow";
import Welcome from "@/components/Welcome";
import Notice from "@/components/Notice";

export default function Home() {
  return (
    <main className="bg-[#FAF9FC] w-full flex flex-col items-center justify-start px-4 pt-4">
      {/* First container - image and welcome */}
      <section className="w-full max-w-7xl">
        <Slideshow />
      </section>

      {/* You can add a Welcome section, About, etc. below this */}
      <Welcome />

      {/* Notice section */}
      <div className="mb-32 mt-16 text-center">
        <Notice />
      </div>
    </main>
  );
}
