// board/page.tsx

import { useTranslations } from 'next-intl';
import { alegreyaSans } from "@/ui/fonts";
import Card from "@/components/Card";

interface BoardMember {
  name: string;
  role?: string;
  pronoun?: string;
  email?: string;
  image?: string;
}

interface BoardPageData {
  title: string;
  members: BoardMember[];
}

export default function BoardPage() {
  const t = useTranslations();
  const boardPage: BoardPageData = t.raw('BoardPage') as BoardPageData;
  const boardTitle: string = boardPage.title;

  // Split members into groups for the 1+3+1 layout
  const firstRowMember = boardPage.members[0];
  const secondRowMembers = boardPage.members.slice(1, 4); // Next 3 members
  const thirdRowMember = boardPage.members[4]; // Last member

  // Alternative grid approach
  return (
    <div className={`${alegreyaSans.className} w-full flex flex-col flex-grow bg-white items-center`}>
      <div className="text-center text-2xl">
        <h1 className={`${alegreyaSans.className} text-black font-bold py-4 mt-4`}>
          {boardTitle}
        </h1>
      </div>

      {/* Grid layout for 1+3+1 pattern */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 mb-8 w-full max-w-6xl">
        {/* Row 1: Single centered card spanning all columns on mobile, 1 column on desktop */}
        {firstRowMember && (
          <div className="md:col-span-3 flex justify-center">
            <Card 
              image={firstRowMember.image || null}
              name={firstRowMember.name}
              role={firstRowMember.role || ''}
              pronoun={firstRowMember.pronoun}
              email={firstRowMember.email || ''}
            />
          </div>
        )}

        {/* Row 2: Three cards */}
        {secondRowMembers.map((member: BoardMember, index: number) => (
          <div key={index} className="flex justify-center">
            <Card 
              image={member.image || null}
              name={member.name}
              role={member.role || ''}
              pronoun={member.pronoun}
              email={member.email || ''}
            />
          </div>
        ))}

        {/* Row 3: Single centered card spanning all columns */}
        {thirdRowMember && (
          <div className="md:col-span-3 flex justify-center">
            <Card 
              image={thirdRowMember.image || null}
              name={thirdRowMember.name}
              role={thirdRowMember.role || ''}
              pronoun={thirdRowMember.pronoun}
              email={thirdRowMember.email || ''}
            />
          </div>
        )}
      </div>
    </div>
  );
}