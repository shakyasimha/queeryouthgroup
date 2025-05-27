import { alegreyaSans, roboto } from "@/ui/fonts"
import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full flex flex-col flex-grow bg-[#fafafc] items-center">
      <div className="text-center text-2xl">
          <h1 className={`${alegreyaSans.className} text-black font-bold py-4 mt-4`}>Our Team</h1>
      </div>

      {/* First row of team */}
      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 p-4">
        <div className="bg-white text-black w-[300px] h-[500px] border rounded shadow">
          <div className="w-full h-full relative overflow-hidden rounded">
            <Image 
                key="aboutus"
                src="images/rukshana.jpg"
                alt="rukshana"
                width={300}
                height={300}
                className="object-cover"
            />
          </div>
        </div>
        <div className="bg-white text-black w-[300px] h-[500px] p-4 border rounded shadow">
          Two
        </div>
        <div className="bg-white text-black w-[300px] h-[500px] p-4 border rounded shadow">
          Three
        </div>
      </div>

      {/* Second row of team */}
      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 p-4">
        <div className="bg-white text-black w-[300px] h-[500px] p-4 border rounded shadow">
          Four
        </div>
        <div className="bg-white text-black w-[300px] h-[500px] p-4 border rounded shadow">
          Five
        </div>
        <div className="bg-white text-black w-[300px] h-[500px] p-4 border rounded shadow sm:mb-4">
          Six
        </div>
      </div>
    </div>
  )
}
