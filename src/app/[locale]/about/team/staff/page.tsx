// staff/page.tsx

import { useTranslations } from 'next-intl';
import { alegreyaSans } from "@/ui/fonts";
import Card from "@/components/Card";

interface StaffMember {
  name: string;
  role: string;
  pronoun: string;
  email: string;
  image?: string;
}

interface Department {
  title: string;
  members: { [key: string]: StaffMember };
}

interface StaffPageData {
  title: string;
  departments: { [key: string]: Department };
}

export default function StaffPage() {
  const t = useTranslations();
  const staffPage: StaffPageData = t.raw('StaffPage') as StaffPageData;
  const staffTitle: string = staffPage.title;

  // Convert departments object to array for easier iteration
  const departmentsArray = Object.entries(staffPage.departments);

  return (
    <div className={`${alegreyaSans.className} w-full flex flex-col flex-grow bg-white items-center`}>
      <div className="text-center text-2xl">
        <h1 className={`${alegreyaSans.className} text-black font-bold py-4 mt-4`}>
          {staffTitle}
        </h1>
      </div>

      {/* Departments */}
      {departmentsArray.map(([departmentKey, department]) => (
        <div key={departmentKey} className="w-full max-w-6xl mb-8">
          {/* Department Title */}
          <div className="text-center mb-6">
            <h2 className={`${alegreyaSans.className} text-black font-semibold text-xl`}>
              {department.title}
            </h2>
          </div>

          {/* Department Members - Center aligned on mobile, flex-wrap on larger screens */}
          <div className="flex flex-col items-center md:flex-row md:flex-wrap md:justify-center gap-4 px-4">
            {Object.entries(department.members).map(([memberKey, member]) => (
              <Card 
                key={memberKey}
                image={member.image || null}
                name={member.name}
                role={member.role}
                pronoun={member.pronoun}
                email={member.email}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}