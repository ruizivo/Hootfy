import { MonitorResult } from "../../services/api";

interface MonitorTableProps {
  results: MonitorResult[];
}

export default function MonitorTable({ results }:MonitorTableProps) {
  if (!results || results.length === 0) {
    return <p>Nenhum resultado disponível. Execute o monitoramento.</p>;
  }

  return (
    <div class="monitor-table">
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Status</th>
            <th>Tempo de Resposta</th>
            <th>Última Verificação</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index} class={result.status === 'online' ? 'online' : 'offline'}>
              <td>{result.url}</td>
              <td>{result.status}</td>
              <td>{result.responseTime ? `${result.responseTime}ms` : 'N/A'}</td>
              <td>{new Date(result.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
