// team/page.tsx
// forcing dynamic rendering
export const dynamic = "force-dynamic";

import { useTranslations, useLocale } from 'next-intl';
import { alegreyaSans, notoSansDevanagari } from "@/ui/fonts";
import { NavigationCard } from '@/components/NavigationCards';

interface TeamLink {
  title: string;
  route: string;
  description: string;
  icon: string;
}

interface TeamRootPageData {
  title: string;
  subtitle: string;
  links: TeamLink[];
}

export default function TeamRootPage() {
  const t = useTranslations();
  const locale = useLocale();
  const teamPage: TeamRootPageData = t.raw('TeamRootPage') as TeamRootPageData;

  // Pick font depending on locale
  const headerFont = locale === "ne" ? notoSansDevanagari.className : alegreyaSans.className;

  return (
    <div className={`w-full flex flex-col flex-grow bg-white items-center`}>
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto px-4 py-8">
        <h1 className={`${headerFont} text-black font-bold text-3xl md:text-4xl mb-4`}>
          {teamPage.title}
        </h1>
        {teamPage.subtitle && (
          <p className="text-gray-600 text-lg leading-relaxed">
            {teamPage.subtitle}
          </p>
        )}
      </div>
      
      {/* Navigation Cards */}
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {teamPage.links.map((link, index) => (
            <NavigationCard
              key={`team-${index}-${link.route}`}
              title={link.title}
              href={link.route}
              description={link.description}
              icon={link.icon}
              variant="tertiary"
              size="md"
              className="h-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
