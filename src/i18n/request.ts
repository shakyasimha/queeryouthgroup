import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

// type for messages
type Message = typeof import('@/messages/en.json');

export default getRequestConfig(async ({requestLocale}) => {
    // Typically corresponds to the `[locale]` segment
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
    
    let messages;

    try {
        // Option 1: Using request (works consistently)
        messages = require(`@/messages/${locale}.json`);

        // Option 2: Using dynamic import (alternative)
        // messages = (await import(`@/messages/${locale}.json`)).default;
    } catch(error) {
        console.error(`Failed to load messages for locale ${locale}`);

        // Fallback to default locale messages
        messages = require(`@/messages/${routing.defaultLocale}.json`);
    }

    return {
        locale,
        messages
    };
});