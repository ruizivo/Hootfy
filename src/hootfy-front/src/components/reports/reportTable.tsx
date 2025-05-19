import { Download, Trash2 } from "lucide-preact";
import { fetchMonitorResults, removeReport, ReportResult } from "../../services/api";
import HtmlViewer from "./htmlViewer";
import { useEffect, useState } from "preact/hooks";
import { useTranslation } from "react-i18next";


export default function ReportTable() {

  const [monitorResults, setMonitorResults] = useState<ReportResult[]>([]);
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

  const handleDelete = async (report: ReportResult) => {
      try {
          await removeReport(report);
          loadMonitorHistory();
      } catch (error) {
          console.error('Erro ao remover Report:', error);
          alert('Erro ao remover Report');
      }
  };

  if (!monitorResults || monitorResults.length === 0) {
    return <p>Nenhum resultado disponível. Execute o monitoramento.</p>;
  }

  return (
    <div class="space-y-4">
      {monitorResults.map((result, index) => (
        <div
          key={index}
          class={`rounded border shadow-sm p-6 bg-white border-gray-200`}
        >
          <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <div class="flex flex-col">
              <span class="text-sm text-gray-500">URL</span>
              <span class="font-medium text-gray-800">{result.url}</span>
            </div>
            <div class="flex flex-col"> 
              <span class="text-sm text-gray-500">{t('labels.verification_date')}</span>
              <span class="text-gray-700">
                {new Date(result.timestamp).toLocaleString()}
              </span>
            </div>
            <div class="flex flex-col">
              <span class="text-sm text-gray-500">Download</span>
              <a href={result.path} class="text-gray-700 flex items-center" target="_blank" download> <Download/></a>
            </div>
            <div class="flex flex-col">
              <Trash2 class="cursor-pointer " onClick={() => handleDelete(result)} />
            </div>
          </div>

          <div class="mt-4">
            <HtmlViewer path={result.path} />
          </div>
        </div>
      ))}
    </div>
  );
};
