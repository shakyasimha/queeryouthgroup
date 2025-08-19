// alumni/page.tsx

import { useTranslations } from 'next-intl';
import { alegreyaSans } from "@/ui/fonts";

export default function AlumniPage() {
  const t = useTranslations('TeamPage');
  const alumniList = t.raw('alumni.list');
  const alumniTitle = t('alumni.title');

  return (
    <div className={`${alegreyaSans.className} w-full flex flex-col flex-grow bg-white items-center`}>
      <div className="text-center text-2xl">
        <h1 className={`${alegreyaSans.className} text-black font-bold py-4 mt-4`}>
          {alumniTitle}
        </h1>
      </div>

      {/* Alumni List */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-[#f5efe0] rounded-lg p-6 shadow">
          <ul className="space-y-3">
            {alumniList.map((alumniName: string, index: number) => (
              <li 
                key={index}
                className="text-lg text-black border-b border-gray-200 pb-2 last:border-b-0"
              >
                {alumniName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}