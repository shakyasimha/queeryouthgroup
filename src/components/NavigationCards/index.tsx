// components/NavigationCards.tsx

import React from "react";
import { alegreyaSans } from "@/ui/fonts";
import Link from 'next/link';
import { ReactNode } from 'react';

export interface NavigationLink {
    title: string;
    route: string;
    description: string;
    icon?: ReactNode | string;
    external?: boolean; // For external links
    badge?: string; // Optional badge/tag
}

interface NavigationCardsProps {
    title: string;
    subtitle?: string;
    links?: NavigationLink[]; // Make this optional with default
    className?: string;
    cardClassName?: string;
    // More flexible grid system
    gridCols?: {
        default?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        '2xl'?: number;
    };
    // Theme variants for different sections
    variant?: 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'accent';
    // Custom color scheme (overrides variant)
    colorScheme?: {
        gradient: string;
        border: string;
        hoverBorder: string;
        iconGradient: string;
        titleHover: string;
        linkColor: string;
        background?: string;
    };
    // Layout options
    layout?: 'cards' | 'compact' | 'minimal';
    showIcons?: boolean;
    showArrow?: boolean;
    centerContent?: boolean;
    // Container options
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full';
    padding?: 'sm' | 'md' | 'lg' | 'xl';
}

// Individual Navigation Card Props
interface NavigationCardProps {
    title: string;
    href: string;
    description?: string;
    icon?: ReactNode | string;
    external?: boolean;
    badge?: string;
    className?: string;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'accent';
    size?: 'sm' | 'md' | 'lg';
    layout?: 'vertical' | 'horizontal';
    showArrow?: boolean;
}

// Theme variants for different sections
const themeVariants = {
    primary: {
        gradient: "from-blue-50 to-indigo-50",
        border: "border-blue-200",
        hoverBorder: "hover:border-blue-300",
        iconGradient: "from-blue-400 to-indigo-500",
        titleHover: "group-hover:text-blue-600",
        linkColor: "text-blue-600",
        background: "bg-white"
    },
    secondary: {
        gradient: "from-emerald-50 to-teal-50",
        border: "border-emerald-200",
        hoverBorder: "hover:border-emerald-300",
        iconGradient: "from-emerald-400 to-teal-500",
        titleHover: "group-hover:text-emerald-600",
        linkColor: "text-emerald-600",
        background: "bg-white"
    },
    tertiary: {
        gradient: "from-purple-50 to-pink-50",
        border: "border-purple-200",
        hoverBorder: "hover:border-purple-300",
        iconGradient: "from-purple-400 to-pink-500",
        titleHover: "group-hover:text-purple-600",
        linkColor: "text-purple-600",
        background: "bg-white"
    },
    neutral: {
        gradient: "from-gray-50 to-slate-50",
        border: "border-gray-200",
        hoverBorder: "hover:border-gray-300",
        iconGradient: "from-gray-400 to-slate-500",
        titleHover: "group-hover:text-gray-700",
        linkColor: "text-gray-600",
        background: "bg-white"
    },
    accent: {
        gradient: "from-orange-50 to-red-50",
        border: "border-orange-200",
        hoverBorder: "hover:border-orange-300",
        iconGradient: "from-orange-400 to-red-500",
        titleHover: "group-hover:text-orange-600",
        linkColor: "text-orange-600",
        background: "bg-white"
    }
};

const defaultGridCols = {
    default: 1,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
    '2xl': 5
};

const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full'
};

const paddingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-20'
};

const sizeClasses = {
    sm: {
        card: "p-4",
        icon: "w-8 h-8",
        title: "text-base",
        description: "text-xs",
        spacing: "mb-2"
    },
    md: {
        card: "p-6",
        icon: "w-12 h-12",
        title: "text-lg",
        description: "text-sm",
        spacing: "mb-4"
    },
    lg: {
        card: "p-8",
        icon: "w-16 h-16",
        title: "text-xl",
        description: "text-base",
        spacing: "mb-6"
    }
};

// Individual Navigation Card Component
export function NavigationCard({
    title,
    href,
    description,
    icon,
    external = false,
    badge,
    className = "",
    variant = 'primary',
    size = 'md',
    layout = 'vertical',
    showArrow = true
}: NavigationCardProps): React.JSX.Element {
    
    const theme = themeVariants[variant];
    const sizeConfig = sizeClasses[size];
    
    const LinkComponent = external ? 'a' : Link;
    const linkProps = external 
        ? { href, target: "_blank", rel: "noopener noreferrer" }
        : { href };

    const renderIcon = (): ReactNode => {
        if (icon) {
            if (typeof icon === 'string') {
                return (
                    <span className="text-white font-bold text-lg">
                        {icon}
                    </span>
                );
            }
            return icon;
        }
        
        // Default fallback - first letter of title
        return (
            <span className="text-white font-bold text-lg">
                {title.charAt(0)}
            </span>
        );
    };

    if (layout === 'horizontal') {
        return (
            <LinkComponent 
                {...linkProps}
                className={`group block w-full ${className}`}
            >
                <div className={`
                    bg-gradient-to-r ${theme.gradient} 
                    border ${theme.border} rounded-lg ${sizeConfig.card} 
                    hover:shadow-lg ${theme.hoverBorder} 
                    transition-all duration-300 transform hover:-translate-y-1
                    flex items-center space-x-4
                `}>
                    {/* Icon */}
                    <div className="flex-shrink-0">
                        <div className={`${sizeConfig.icon} bg-gradient-to-br ${theme.iconGradient} rounded-full flex items-center justify-center`}>
                            {renderIcon()}
                        </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-grow min-w-0">
                        {/* Badge */}
                        {badge && (
                            <div className="mb-1">
                                <span className={`inline-block px-2 py-1 text-xs font-medium ${theme.linkColor} bg-current bg-opacity-10 rounded-full`}>
                                    {badge}
                                </span>
                            </div>
                        )}
                        
                        <h3 className={`${alegreyaSans.className} ${sizeConfig.title} font-semibold text-gray-900 ${theme.titleHover} transition-colors truncate`}>
                            {title}
                        </h3>
                        
                        {description && (
                            <p className={`${sizeConfig.description} text-gray-600 leading-relaxed mt-1`}>
                                {description}
                            </p>
                        )}
                    </div>
                    
                    {/* Arrow */}
                    {showArrow && (
                        <div className="flex-shrink-0">
                            <span className={`${theme.linkColor} text-sm font-medium group-hover:translate-x-1 transition-transform`}>
                                {external ? '↗' : '→'}
                            </span>
                        </div>
                    )}
                </div>
            </LinkComponent>
        );
    }

    // Vertical layout (default)
    return (
        <LinkComponent 
            {...linkProps}
            className={`group block w-full ${className}`}
        >
            <div className={`
                bg-gradient-to-br ${theme.gradient} 
                border ${theme.border} rounded-lg ${sizeConfig.card} h-full
                hover:shadow-lg ${theme.hoverBorder} 
                transition-all duration-300 transform hover:-translate-y-1
            `}>
                {/* Icon */}
                <div className={`flex justify-center ${sizeConfig.spacing}`}>
                    <div className={`${sizeConfig.icon} bg-gradient-to-br ${theme.iconGradient} rounded-full flex items-center justify-center`}>
                        {renderIcon()}
                    </div>
                </div>
                
                {/* Badge */}
                {badge && (
                    <div className="flex justify-center mb-2">
                        <span className={`inline-block px-2 py-1 text-xs font-medium ${theme.linkColor} bg-current bg-opacity-10 rounded-full`}>
                            {badge}
                        </span>
                    </div>
                )}
                
                <h3 className={`${alegreyaSans.className} ${sizeConfig.title} font-semibold text-gray-900 text-center mb-2 ${theme.titleHover} transition-colors`}>
                    {title}
                </h3>
                
                {description && (
                    <p className={`${sizeConfig.description} text-gray-600 text-center leading-relaxed`}>
                        {description}
                    </p>
                )}
                
                {showArrow && (
                    <div className="mt-4 text-center">
                        <span className={`${theme.linkColor} text-sm font-medium group-hover:underline`}>
                            {external ? 'Visit →' : 'Learn More →'}
                        </span>
                    </div>
                )}
            </div>
        </LinkComponent>
    );
}

// Optional: Container component for consistent spacing
export function NavigationCardContainer({ 
    children, 
    className = "" 
}: { 
    children: ReactNode; 
    className?: string; 
}) {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
            {children}
        </div>
    );
}

// Original NavigationCards component (for bulk usage)
export default function NavigationCards({
    title,
    subtitle,
    links = [], // Provide default empty array
    className = "",
    cardClassName = "",
    gridCols = defaultGridCols,
    variant = 'primary',
    colorScheme,
    layout = 'cards',
    showIcons = true,
    showArrow = true,
    centerContent = true,
    maxWidth = '6xl',
    padding = 'md'
}: NavigationCardsProps): React.JSX.Element {
    
    // Use custom colorScheme or variant theme
    const theme = colorScheme || themeVariants[variant];
    
    // Add safety check for links array
    const safeLinks = Array.isArray(links) ? links : [];
    
    const getGridClass = (): string => {
        const { 
            default: defaultCols = 1, 
            sm = 1, 
            md = 2, 
            lg = 3, 
            xl = 4, 
            '2xl': xl2 = 5 
        } = gridCols;
        
        let gridClass = `grid grid-cols-${defaultCols}`;
        if (sm) gridClass += ` sm:grid-cols-${sm}`;
        if (md) gridClass += ` md:grid-cols-${md}`;
        if (lg) gridClass += ` lg:grid-cols-${lg}`;
        if (xl) gridClass += ` xl:grid-cols-${xl}`;
        if (xl2) gridClass += ` 2xl:grid-cols-${xl2}`;
        
        return `${gridClass} gap-6`;
    };

    const renderIcon = (link: NavigationLink, index: number): ReactNode => {
        if (!showIcons) return null;

        if (link.icon) {
            if (typeof link.icon === 'string') {
                return (
                    <span className="text-white font-bold text-lg">
                        {link.icon}
                    </span>
                );
            }
            return link.icon;
        }
        
        // Default fallback - first letter of title
        return (
            <span className="text-white font-bold text-lg">
                {link.title.charAt(0)}
            </span>
        );
    };

    const renderCard = (link: NavigationLink, index: number) => {
        const LinkComponent = link.external ? 'a' : Link;
        const linkProps = link.external 
            ? { href: link.route, target: "_blank", rel: "noopener noreferrer" }
            : { href: link.route };

        const cardContent = (
            <div className={`
                ${layout === 'cards' ? `bg-gradient-to-br ${theme.gradient} border ${theme.border} rounded-lg p-6 h-full hover:shadow-lg ${theme.hoverBorder} transition-all duration-300 transform hover:-translate-y-1` : ''}
                ${layout === 'compact' ? `bg-white border ${theme.border} rounded-lg p-4 h-full hover:shadow-md ${theme.hoverBorder} transition-all duration-200` : ''}
                ${layout === 'minimal' ? `p-4 h-full hover:bg-gray-50 rounded-lg transition-all duration-200` : ''}
                ${cardClassName}
            `}>
                {/* Icon */}
                {showIcons && (
                    <div className={`flex ${centerContent ? 'justify-center' : 'justify-start'} ${layout === 'compact' ? 'mb-2' : 'mb-4'}`}>
                        <div className={`
                            ${layout === 'cards' ? 'w-12 h-12' : 'w-10 h-10'} 
                            bg-gradient-to-br ${theme.iconGradient} rounded-full flex items-center justify-center
                        `}>
                            {renderIcon(link, index)}
                        </div>
                    </div>
                )}
                
                {/* Badge */}
                {link.badge && (
                    <div className={`flex ${centerContent ? 'justify-center' : 'justify-start'} mb-2`}>
                        <span className={`inline-block px-2 py-1 text-xs font-medium ${theme.linkColor} bg-current bg-opacity-10 rounded-full`}>
                            {link.badge}
                        </span>
                    </div>
                )}
                
                <h3 className={`
                    ${alegreyaSans.className} 
                    ${layout === 'compact' ? 'text-base' : 'text-lg'} 
                    font-semibold text-gray-900 
                    ${centerContent ? 'text-center' : 'text-left'} 
                    mb-2 ${theme.titleHover} transition-colors
                `}>
                    {link.title}
                </h3>
                
                <p className={`
                    ${layout === 'compact' ? 'text-xs' : 'text-sm'} 
                    text-gray-600 
                    ${centerContent ? 'text-center' : 'text-left'} 
                    leading-relaxed
                `}>
                    {link.description}
                </p>
                
                {showArrow && (
                    <div className={`mt-4 ${centerContent ? 'text-center' : 'text-left'}`}>
                        <span className={`${theme.linkColor} ${layout === 'compact' ? 'text-xs' : 'text-sm'} font-medium group-hover:underline`}>
                            {link.external ? 'Visit →' : 'Learn More →'}
                        </span>
                    </div>
                )}
            </div>
        );

        return (
            <LinkComponent 
                key={`nav-${index}-${link.route.replace(/[^a-zA-Z0-9]/g, '-')}`}
                {...linkProps}
                className="group block"
            >
                {cardContent}
            </LinkComponent>
        );
    };

    return (
        <div className={`
            w-full ${theme.background} border-t border-gray-200 
            ${paddingClasses[padding]} 
            ${className}
        `}>
            <div className={`${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8`}>
                {/* Header */}
                {(title || subtitle) && (
                    <div className={`${centerContent ? 'text-center' : 'text-left'} mb-8`}>
                        {title && (
                            <h2 className={`${alegreyaSans.className} text-2xl font-bold text-gray-900 mb-2`}>
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-gray-600">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* Navigation Cards Grid */}
                <div className={getGridClass()}>
                    {safeLinks.length > 0 ? (
                        safeLinks.map(renderCard)
                    ) : (
                        <div className="col-span-full text-center text-gray-500 py-8">
                            No navigation links available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}