// team/page.tsx
// forcing dynamic rendering
export const dynamic = "force-dynamic";

import { useTranslations } from 'next-intl';
import { alegreyaSans } from "@/ui/fonts";
import Card from "@/components/Card";
import Link from 'next/link';

interface TeamLink {
  link: string;
  route: string;
}

interface TeamRootPageData {
  title: string;
  links: TeamLink[];
}

export default function TeamRootPage() {
  const t = useTranslations();
  const teamPage: TeamRootPageData = t.raw('TeamRootPage') as TeamRootPageData;

  return (
    <div className={`${alegreyaSans.className} w-full flex flex-col flex-grow bg-white items-center`}>
      <div className="text-center text-2xl">
        <h1 className={`${alegreyaSans.className} text-black font-bold py-4 mt-4`}>
          {teamPage.title}
        </h1>
      </div>

      {/* Team Navigation Cards */}
      <div className="flex flex-col items-center md:flex-row md:justify-center gap-4 p-4 mb-8">
        {teamPage.links.map((teamLink: TeamLink, index: number) => (
          <Link 
            key={index}
            href={teamLink.route}
            className="block"
          >
            <Card 
              image="/qyg-logo.svg"
              name={teamLink.link}
              role="Team Section"
              pronoun=""
              email=""
            />
          </Link>
        ))}
      </div>
    </div>
  );
}