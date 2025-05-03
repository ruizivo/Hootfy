
interface StatCardProps {
  title: string;
  value: string | number;
  label: string;
  icon: preact.ComponentChildren;
  color: 'blue' | 'red' | 'green' | 'yellow' | 'purple';
}


export default function StatCard({title, value, label, icon, color }: StatCardProps) {
  const colorMap = {
    blue: 'text-blue-600',
    red: 'text-red-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    purple: 'text-purple-600',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      <div className="flex justify-between items-center">
        <div>
          <p className={`text-3xl font-bold ${colorMap[color]}`}>{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}