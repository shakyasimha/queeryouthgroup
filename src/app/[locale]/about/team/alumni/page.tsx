// alumni/page.tsx

import { useTranslations } from 'next-intl';
import { alegreyaSans } from "@/ui/fonts";
import Card from "@/components/Card";

interface AlumniMember {
  name: string;
  image?: string;
}

interface AlumniPageData {
  title: string;
  members: AlumniMember[];
}

export default function AlumniPage() {
  const t = useTranslations();
  const alumniPage: AlumniPageData = t.raw('AlumniPage') as AlumniPageData;
  const alumniTitle: string = alumniPage.title;

  return (
    <div className={`${alegreyaSans.className} w-full flex flex-col flex-grow bg-white items-center`}>
      <div className="text-center text-2xl">
        <h1 className={`${alegreyaSans.className} text-black font-bold py-4 mt-4`}>
          {alumniTitle}
        </h1>
      </div>

      {/* Alumni Members - Center aligned on mobile, flex-wrap on larger screens */}
      <div className="flex flex-col items-center md:flex-row md:flex-wrap md:justify-center gap-4 p-4 mb-8">
        {alumniPage.members.map((member: AlumniMember, index: number) => (
          <Card 
            key={index}
            image={member.image || null}
            name={member.name}
          />
        ))}
      </div>
    </div>
  );
}