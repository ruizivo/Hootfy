import { useState, useEffect } from 'preact/hooks';
import { fetchConfig, saveConfig, ConfigType } from '../../services/api';


export default function Config() {
  const [config, setConfig] = useState<ConfigType>({
    interval: 5,
    webhook_global: '',
    urls: []
  });


  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const configData = await fetchConfig();
      setConfig(configData);
    } catch (error) {
      console.error('Erro ao carregar configuração:', error);
    }
  };

  const handleSaveConfig = async () => {
    try {
      await saveConfig(config);
      alert('Configuração salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar configuração:', error);
      alert('Erro ao salvar configuração');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">

      <div className="config-form">
        <div className="form-group">
          <label>Intervalo de Verificação (minutos):</label>
          <input
            type="number"
            value={config.interval}
            onChange={(e: Event) => {
              const target = e.target as HTMLInputElement;
              setConfig({ ...config, interval: parseInt(target.value, 10) });
            }}
          />
        </div>

        <div className="form-group">
          <label>Webhook Global:</label>
          <input
            type="text"
            value={config.webhook_global}
            onChange={(e: Event) => {
              const target = e.target as HTMLInputElement;
              setConfig({ ...config, webhook_global: target.value });
            }}
          />
        </div>

        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleSaveConfig}>Salvar Configurações</button>
      </div>

      
      
    </div>
  );
};
