import { Menu, X } from 'lucide-preact';

interface SidebarHeaderProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

export default function SidebarHeader({ collapsed, toggleSidebar }:SidebarHeaderProps) {
  return (
    <div className="p-4 flex items-center justify-between border-b border-gray-700">
      {!collapsed && <h1 className="text-xl font-bold">Hootfy</h1>}

      <span onClick={toggleSidebar} className="p-1 rounded-md hover:bg-gray-700 cursor-pointer ">
        {collapsed ? <Menu size={20} /> : <X size={20} />}
      </span>
    </div>
  );
}