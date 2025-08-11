import { useTranslations } from 'next-intl';
import { alegreyaSans } from "@/ui/fonts";
import Card from "@/components/Card";

export default function TeamPage() {
  const t = useTranslations('TeamPage');
  const members = t.raw('members');
  const rows = t.raw('rows');

  return (
    <div className={`${alegreyaSans.className} w-full flex flex-col flex-grow bg-white items-center`}>
      <div className="text-center text-2xl">
        <h1 className={`${alegreyaSans.className} text-black font-bold py-4 mt-4`}>
          {t('title')}
        </h1>
      </div>

      {/* First row of team */}
      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 p-4 mb-4">
        {rows.first.map((memberKey: string) => {
          const member = members[memberKey];
          return (
            <Card 
              key={memberKey}
              image={member.image}
              name={member.name}
              role={member.role}
            />
          );
        })}
      </div>

      {/* Second row of team */}
      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 p-4 mb-8">
        {rows.second.map((memberKey: string) => {
          const member = members[memberKey];
          return (
            <Card 
              key={memberKey}
              image={member.image}
              name={member.name}
              role={member.role}
            />
          );
        })}
      </div>
    </div>
  );
}