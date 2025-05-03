import StatCard from '../components/ui/statCard';
import { Globe, AlertTriangle, PieChart } from 'lucide-preact';


export default function Dashboard() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard 
        title="Resumo de Sites"
        value="12"
        label="Sites monitorados"
        icon={<Globe className="text-blue-500" size={36} />}
        color="blue"
      />
      
      <StatCard 
        title="Alertas Recentes"
        value="3"
        label="Alertas não visualizados"
        icon={<AlertTriangle className="text-red-500" size={36} />}
        color="red"
      />
      
      <StatCard 
        title="Tempo de Resposta"
        value="320ms"
        label="Média de resposta"
        icon={<PieChart className="text-green-500" size={36} />}
        color="green"
      />
    </div>
  );
}