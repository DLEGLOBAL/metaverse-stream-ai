
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavigationItem as NavItemType } from './navigationData';

interface NavigationItemProps {
  item: NavItemType;
  isCurrentPath: boolean;
  collapsed: boolean;
  theme: string;
}

export const NavigationItem = ({ item, isCurrentPath, collapsed, theme }: NavigationItemProps) => {
  if (item.external) {
    return (
      <li>
        <a
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center px-3 py-2 rounded-lg transition-colors",
            theme === 'dark'
              ? "text-gray-300 hover:bg-meta-slate/40 hover:text-white"
              : "text-gray-700 hover:bg-gray-100",
            collapsed ? "justify-center" : ""
          )}
        >
          <span className="flex-shrink-0">{item.icon}</span>
          <span 
            className={cn(
              "ml-3 transition-opacity duration-200",
              collapsed ? "hidden opacity-0" : "block opacity-100"
            )}
          >
            {item.label}
          </span>
          
          {!collapsed && (
            <svg 
              className="ml-auto h-4 w-4 opacity-70" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          )}
        </a>
      </li>
    );
  }
  
  return (
    <li>
      <Link
        to={item.path}
        className={cn(
          "flex items-center px-3 py-2 rounded-lg transition-colors",
          isCurrentPath 
            ? "bg-meta-teal text-meta-dark-blue" 
            : theme === 'dark'
              ? "text-gray-300 hover:bg-meta-slate/40 hover:text-white"
              : "text-gray-700 hover:bg-gray-100",
          collapsed ? "justify-center" : ""
        )}
      >
        <span className="flex-shrink-0">{item.icon}</span>
        <span 
          className={cn(
            "ml-3 transition-opacity duration-200",
            collapsed ? "hidden opacity-0" : "block opacity-100"
          )}
        >
          {item.label}
        </span>
      </Link>
    </li>
  );
};
