import { alegreyaSans } from "@/ui/fonts";
import Card from "@/components/Card";

export default function Page() {
  return (
    <div className={`${alegreyaSans.className} w-full flex flex-col flex-grow bg-white items-center`}>
      <div className="text-center text-2xl">
          <h1 className={`${alegreyaSans.className} text-black font-bold py-4 mt-4`}>Our Team</h1>
      </div>

      {/* First row of team */}
      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 p-4 mb-4">
        <Card 
          image="images/rukshana.jpg"
          name="Rukshana Kapali"
          role="CEO"
        />

        <Card 
          image="images/rita.jpg"
          name="Rita Chalise"
          role="Finance Officer"
        />

        <Card 
          image="images/nangboong.jpg"
          name="Nangboong Rai"
          role="Information and Communication Officer"
        />
      </div>

      {/* Second row of team */}
      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 p-4 mb-8">
        <Card  
          image="images/nishant.jpg"
          name="Nishant Shah"
          role="Executive Officer Assistance"
        />

        <Card 
          image="images/chhesing.jpg"
          name="Chhesang Ghising"
          role="Program Officer"
        />

        <Card 
          image="images/sudip.jpg"
          name="Sudip Chaudhary"
          role="Office Assistance"
        />

        <Card 
          image="images/ankita.jpg"
          name="Ankita Regmi"
          role="Legal Assistant (Trainee)"
        />
      </div>
    </div>
  )
}
