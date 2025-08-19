// board/page.tsx

import { useTranslations } from 'next-intl';
import { alegreyaSans } from "@/ui/fonts";
import Card from "@/components/Card";

interface Member {
  name: string;
  role?: string;
  pronoun?: string;
  email?: string;
  image?: string;
}

interface Department {
  title: string;
  members: Member[] | Record<string, Member>;
}

interface Departments {
  boardMembers: Department;
  executive: Department;
  legal: Department;
  finance: Department;
  program: Department;
  communication: Department;
}

export default function BoardPage() {
  const t = useTranslations('TeamPage');
  const departments: Departments = t.raw('departments') as Departments;
  const pageTitle: string = t('title');

  // Define the order of departments
  const departmentOrder: (keyof Departments)[] = [
    'boardMembers',
    'executive', 
    'legal',
    'finance',
    'program',
    'communication'
  ];

  return (
    <div className={`${alegreyaSans.className} w-full flex flex-col flex-grow bg-white items-center`}>
      <div className="text-center text-2xl">
        <h1 className={`${alegreyaSans.className} text-black font-bold py-4 mt-4`}>
          {pageTitle}
        </h1>
      </div>

      {/* Render each department */}
      {departmentOrder.map((deptKey) => {
        const department = departments[deptKey];
        if (!department) return null;

        return (
          <div key={deptKey} className="w-full max-w-6xl mb-12">
            {/* Department Title */}
            <div className="text-center mb-6">
              <h2 className={`${alegreyaSans.className} text-xl font-semibold text-black`}>
                {department.title}
              </h2>
            </div>

            {/* Department Members - Center aligned on mobile, flex-wrap on larger screens */}
            <div className="flex flex-col items-center md:flex-row md:flex-wrap md:justify-center gap-4 px-4">
              {/* Handle different data structures */}
              {Array.isArray(department.members) ? (
                // For boardMembers (array format)
                department.members.map((member: Member, index: number) => (
                  <Card 
                    key={index}
                    image={member.image || null}
                    name={member.name}
                    role={member.role || ''}
                    pronoun={member.pronoun}
                    email={member.email || ''}
                  />
                ))
              ) : (
                // For other departments (object format)
                Object.entries(department.members).map(([memberKey, member]) => (
                  <Card 
                    key={memberKey}
                    image={member.image || null}
                    name={member.name}
                    role={member.role || ''}
                    pronoun={member.pronoun}
                    email={member.email || ''}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}