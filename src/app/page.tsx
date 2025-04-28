// import Image from "next/image";
import { roboto, openSans } from "@/ui/fonts";
import Slideshow from "@/components/Slideshow";


export default function Home() {
  return (
    <div className="w-full flex flex-col flex-grow">
      {/* First container - image and welcome */}
      <div className='flex flex-col min-[1200px]:flex-row items-center'>
          <Slideshow />
      </div>

      {/* Second container - containing books written, etc */}
      <div className="p-8 flex flex-col md:flex-row sm:flex-col justify-between bg-[#f5efe0] gap-8">
        {/* 4 Books Section */}
        <div className="md:w-1/3">
            <h1 className={`${openSans.className} font-bold text-black text-lg md:text-xl text-center mb-8`}>4 Books</h1>
            <ol className={`${roboto.className} list-decimal text-black list-outside pl-5 space-y-2 mb-4`}>
                <li>A Basic Understanding on SOGIESC</li>
                <li>Charter of Demands on Legal Recognition of Gender Identity</li>
                <li>Ministry of Home Affairs’ directive on ‘other gender’</li>
                <li>A Bill regarding Gender Identity, 2021 (Draft)</li>
            </ol>
        </div>

        {/* 5 Writ Petitions Section */}
        <div className="md:w-1/3">
            <h1 className={`${openSans.className} font-bold text-black text-lg md:text-xl text-center mb-8`}>5 Writ Petitions</h1>
            <p className={`${roboto.className} text-black leading-relaxed mb-4`}>
                5 writ petitions at the Supreme Court of Nepal challenging the law and demanding an 
                amendment ensuring rights for queer people.
            </p>
        </div>

        {/* 17 Workshops Section */}
        <div className="md:w-1/3">
            <h1 className={`${openSans.className} font-bold text-black text-lg md:text-xl text-center mb-8`}>17 Workshops</h1>
            <p className={`${roboto.className} text-black leading-relaxed mb-4`}>
                17 workshops on SOGIESC for young students in partnerships with youth groups.
            </p>
        </div>
      </div>

      {/* Partners */}
      <div className="p-4 flex md:flex-row sm:flex-col justify-center items-center bg-[#e4f3ee]">
          <h1 className={`${openSans.className} font-bold text-black text-lg md:text-xl text-center mb-8`}> Our Partners </h1>
      </div>
        
      {/* Projects and Activities */}
      <div className="p-4 flex md:flex-row sm:flex-col justify-center items-center bg-[#e0e5f5]">
          <h1 className={`${openSans.className} font-bold text-black text-lg md:text-xl text-center mb-8`}> Our Projects and Activities </h1>
      </div>
    </div>
  );
}
