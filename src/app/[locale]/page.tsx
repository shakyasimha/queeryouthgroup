// import Image from "next/image";
// import { roboto, openSans, alegreyaSans } from "@/ui/fonts";
import Slideshow from "@/components/Slideshow";
import Welcome from "@/components/Welcome";
import Notice from "@/components/Notice";
import VisionTab from "@/components/VisionTab";
import PublicationsCarousel from "@/components/Report";
import Donations from "@/components/Donations";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <main className="bg-[#FAF9FC] w-full flex flex-col items-center justify-start px-4 pt-4">
      {/* First container - image and welcome */}
      <section className="w-full max-w-7xl">
        <Slideshow />
      </section>

      {/* You can add a Welcome section, About, etc. below this */}
      <Reveal>
        <Welcome />  
      </Reveal>

      {/* Visions, Goals, Mission */}
      <Reveal>
        <VisionTab />
      </Reveal>

      {/* Notice section */}
      <Reveal>
        <div className="mb-16 mt-16 text-center">
          <Notice />
        </div>
      </Reveal>

      {/* Publications */}
      <Reveal>
        <div className="mb-16 text-center">
          <PublicationsCarousel /> 
        </div>  
      </Reveal> 
      
      {/* QR code for donations */}
      <Reveal>
        <div className="mb-32 text-center">
          <Donations />
        </div>
      </Reveal>
    </main>
  );
}
