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
}

interface NavigationCardsProps {
    title: string;
    subtitle?: string;
    links: NavigationLink[];
    className?: string;
    cardClassName?: string;
    gridCols?: {
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
    };
    colorScheme?: {
        gradient: string;
        border: string;
        hoverBorder: string;
        iconGradient: string;
        titleHover: string;
        linkColor: string;
    };
}

const defaultColorScheme = {
    gradient: "from-pink-50 to-purple-50",
    border: "border-pink-200",
    hoverBorder: "hover:border-pink-300",
    iconGradient: "from-pink-400 to-purple-500",
    titleHover: "group-hover:text-pink-600",
    linkColor: "text-pink-600"
};

const defaultGridCols = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 5
};

export default function NavigationCards({
    title,
    subtitle,
    links,
    className = "",
    cardClassName = "",
    gridCols = defaultGridCols,
    colorScheme = defaultColorScheme
}: NavigationCardsProps): React.JSX.Element {
    
    const getGridClass = (): string => {
        const { sm = 1, md = 2, lg = 3, xl = 5 } = gridCols;
        return `grid grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg} xl:grid-cols-${xl} gap-6`;
    };

    const renderIcon = (link: NavigationLink, index: number): ReactNode => {
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

    return (
        <div className={`w-full bg-white border-t border-gray-200 py-12 ${className}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className={`${alegreyaSans.className} text-2xl font-bold text-gray-900 mb-2`}>
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-gray-600">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Navigation Cards */}
                <div className={getGridClass()}>
                    {links.map((link: NavigationLink, index: number) => (
                        <Link 
                            key={`nav-${index}-${link.route}`}
                            href={link.route}
                            className="group block"
                        >
                            <div className={`bg-gradient-to-br ${colorScheme.gradient} border ${colorScheme.border} rounded-lg p-6 h-full hover:shadow-lg ${colorScheme.hoverBorder} transition-all duration-300 transform hover:-translate-y-1 ${cardClassName}`}>
                                {/* Icon */}
                                <div className="flex justify-center mb-4">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${colorScheme.iconGradient} rounded-full flex items-center justify-center`}>
                                        {renderIcon(link, index)}
                                    </div>
                                </div>
                                
                                <h3 className={`${alegreyaSans.className} text-lg font-semibold text-gray-900 text-center mb-2 ${colorScheme.titleHover} transition-colors`}>
                                    {link.title}
                                </h3>
                                
                                <p className="text-sm text-gray-600 text-center leading-relaxed">
                                    {link.description}
                                </p>
                                
                                <div className="mt-4 text-center">
                                    <span className={`${colorScheme.linkColor} text-sm font-medium group-hover:underline`}>
                                        Learn More →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}