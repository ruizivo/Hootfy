import { useState, useEffect } from 'preact/hooks';
import MonitorTable from './monitorTable';
import { fetchMonitorResults, runMonitor, MonitorResult} from '../../services/api';

export default function Monitor(){
  const [monitorResults, setMonitorResults] = useState<MonitorResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadMonitorHistory();
  }, []);

  const loadMonitorHistory = async (): Promise<void> => {
    try {
      const history = await fetchMonitorResults();
      setMonitorResults(history);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  };

  const handleRunMonitor = async (): Promise<void> => {
    setLoading(true);
    try {
      const results = await runMonitor();
      setMonitorResults(results);
    } catch (error) {
      console.error('Erro ao executar monitoramento:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="home">
      <div class="actions">
        <button onClick={handleRunMonitor} disabled={loading}>
          {loading ? 'Executando...' : 'Executar Monitoramento'}
        </button>
      </div>

      <MonitorTable results={monitorResults} />
    </div>
  );
};
