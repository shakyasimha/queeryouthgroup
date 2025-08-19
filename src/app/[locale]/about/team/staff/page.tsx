// staff/page.tsx

import { useTranslations } from 'next-intl';
import { alegreyaSans } from "@/ui/fonts";
import Card from "@/components/Card";

interface StaffMember {
  name: string;
  image?: string;
}

interface Staff {
  title: string;
  members: StaffMember[];
}

export default function StaffPage() {
  const t = useTranslations('TeamPage');
  const staff: Staff = t.raw('staff');
  const staffTitle: string = staff.title;

  return (
    <div className={`${alegreyaSans.className} w-full flex flex-col flex-grow bg-white items-center`}>
      <div className="text-center text-2xl">
        <h1 className={`${alegreyaSans.className} text-black font-bold py-4 mt-4`}>
          {staffTitle}
        </h1>
      </div>

      {/* Staff Members */}
      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 p-4 mb-8">
        {staff.members.map((member: StaffMember, index: number) => (
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