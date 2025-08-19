// board/page.tsx

import { useTranslations } from 'next-intl';
import { alegreyaSans } from "@/ui/fonts";
import Card from "@/components/Card";

export default function BoardPage() {
  const t = useTranslations('TeamPage');
  const boardMembers = t.raw('departments.boardMembers.members');
  const boardTitle = t('departments.boardMembers.title');

  return (
    <div className={`${alegreyaSans.className} w-full flex flex-col flex-grow bg-white items-center`}>
      <div className="text-center text-2xl">
        <h1 className={`${alegreyaSans.className} text-black font-bold py-4 mt-4`}>
          {boardTitle}
        </h1>
      </div>

      {/* Board Members */}
      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 p-4 mb-8">
        {boardMembers.map((member: any, index: number) => (
          <Card 
            key={index}
            image={member.image || null}
            name={member.name}
            role={member.role || ''}
            pronoun={member.pronoun}
            email={member.email || ''}
          />
        ))}
      </div>
    </div>
  );
}