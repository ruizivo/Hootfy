interface UserProfileProps {
  collapsed: boolean;
}

export default function UserProfile({ collapsed }:UserProfileProps) {
  return (
    <div className="p-4 border-t border-gray-700 flex items-center">
      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
        <span className="text-sm font-bold">U</span>
      </div>
      {!collapsed && (
        <div className="ml-3">
          <p className="text-sm font-medium">Usuário</p>
          <p className="text-xs text-gray-400">Administrador</p>
        </div>
      )}
    </div>
  );
}