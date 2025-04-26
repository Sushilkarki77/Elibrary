import React from 'react';
import {  Users, Search, Home, Tag, LogOut, LayoutDashboard, Folder } from 'lucide-react';
// icon: 'layout-dashboard' | 'users' | 'search' | 'home' | 'folder';


interface AppIconProps {
  icon: 'dashboard' | 'users' | 'search' | 'home' | 'folder' | 'LogOut';
  size?: number;
  color?: string;
}

const AppIcon: React.FC<AppIconProps> = ({ icon, size = 18, color = 'black' }) => {
  const icons: Record<string, React.ElementType> = {
    dashboard: LayoutDashboard,
    users: Users,
    search: Search,
    home: Home,
    LogOut: LogOut,
    category: Tag,
    folder: Folder
  };

  const IconComponent = icons[icon];

  return <IconComponent size={size} color={color} />;
};

export default AppIcon;
