import { useState, useEffect } from 'preact/hooks';
import { fetchMonitorResults, runMonitor, ReportResult} from '../../services/api';
import { useTranslation } from 'react-i18next';

export default function Monitor(){
  // @ts-ignore
  const [monitorResults, setMonitorResults] = useState<ReportResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();

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
      //const results = 
      await runMonitor();
      loadMonitorHistory();
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
          {loading ? t('buttons.running') : t('buttons.monitoring') }
        </button>
      </div>

      
    </div>
  );
};
