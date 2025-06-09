import { alegreyaSans } from "@/ui/fonts"
import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full flex flex-col flex-grow bg-white items-center">
      <div className="text-center text-2xl">
          <h1 className={`${alegreyaSans.className} text-black font-bold py-4 mt-4`}>Our Team</h1>
      </div>

      {/* First row of team */}
      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 p-4">
        <div className="bg-[#F5EFE0] text-black w-[300px] h-[500px] rounded shadow">
          <div className="w-full h-full relative overflow-hidden rounded">
            <Image 
                key="aboutus"
                src="images/rukshana.jpg"
                alt="rukshana"
                width={300}
                height={300}
                className="object-cover"
            />

            <div className="font-bold ">
              Rukshana Kapali
            </div>
          </div>
        </div>
        <div className="bg-[#F5EFE0] text-black w-[300px] h-[500px] rounded shadow">
          <div className="w-full h-full relative overflow-hidden rounded">
            <Image 
                key="aboutus"
                src="images/nang.jpeg"
                alt="rukshana"
                width={300}
                height={300}
                className="object-cover"
            />

            <div className="font-bold ">
              Nangboong Rai
            </div>
          </div>
        </div>
        <div className="bg-[#F5EFE0] text-black w-[300px] h-[500px] rounded shadow">
          <div className="w-full h-full relative overflow-hidden rounded">
            <Image 
                key="aboutus"
                src="images/rita.jpg"
                alt="rukshana"
                width={300}
                height={300}
                className="object-cover"
            />

            <div className="font-bold ">
              Rita
            </div>
          </div>
        </div>
      </div>

      {/* Second row of team */}
      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 p-4">
        <div className="bg-[#F5EFE0] text-black w-[300px] h-[500px] rounded shadow">
          <div className="w-full h-full relative overflow-hidden rounded">
            <Image 
                key="aboutus"
                src="images/sudip.jpg"
                alt="rukshana"
                width={300}
                height={300}
                className="object-cover"
            />

            <div className="font-bold ">
              Ankit
            </div>
          </div>
        </div>
        <div className="bg-[#F5EFE0] text-black w-[300px] h-[500px] rounded shadow">
          <div className="w-full h-full relative overflow-hidden rounded">
            <Image 
                key="aboutus"
                src="images/chhesing.jpg"
                alt="rukshana"
                width={300}
                height={300}
                className="object-cover"
            />

            <div className="font-bold ">
              Chhesing
            </div>
          </div>
        </div>
        <div className="bg-[#F5EFE0] text-black w-[300px] h-[500px] rounded shadow">
          <div className="w-full h-full relative overflow-hidden rounded">
            <Image 
                key="aboutus"
                src="images/ankita.jpg"
                alt="rukshana"
                width={300}
                height={300}
                className="object-cover"
            />

            <div className="font-bold ">
              Ankita
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
