import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    // List of all the locales that are supported
    locales: ['en', 'ne'],

    // Used when no locale matches
    defaultLocale: 'en',

    // Always show locale in English
    localePrefix: 'always',
});