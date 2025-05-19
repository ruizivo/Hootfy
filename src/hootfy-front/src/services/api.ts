const API_BASE = '/api';

type FetchOptions = RequestInit & {
  headers?: Record<string, string>;
};

async function fetchJson<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

// Tipos de dados (exemplos genéricos; você pode substituir pelos tipos reais se souber)

// type UrlItem = {
//   url: string;
//   active: boolean;
// };


export interface UrlEntry {
  url: string;
  active: boolean;
  webhook: string | null;
  remove_elements: string[];
  include_elements: string[];
  enable_screenshot: boolean;
}

interface StorageConfig {
  s3: {
    region: string;
    bucket_name: string;
    folder: string;
  };
}

export type ConfigType = {
  schedule: string;
  webhook_global: string;
  remove_elements_global: string[];
  storage_type: string;
  storage_config: StorageConfig;
  urls: UrlEntry[];
};


export interface Config {
  [key: string]: unknown;
}

export interface UrlData {
  url: string;
  [key: string]: unknown;
}

// export interface MonitorResult {
//   [key: string]: unknown;
// }

// Funções exportadas com tipagem
// export const fetchConfig = () => fetchJson<Config>(`${API_BASE}/config`);

export async function fetchConfig(): Promise<ConfigType> {
  return await fetchJson<ConfigType>(`${API_BASE}/config`);
}

export const saveConfig = (config: Config) => fetchJson<void>(`${API_BASE}/config`, {
  method: 'POST',
  body: JSON.stringify(config)
});

export const addUrl = (urlData: UrlEntry) => fetchJson<void>(`${API_BASE}/url`, {
  method: 'POST',
  body: JSON.stringify(urlData)
});

export const editUrl = (index: number, urlData: UrlEntry) => fetchJson<void>(`${API_BASE}/url/${index}`, {
  method: 'PUT',
  body: JSON.stringify(urlData)
});

export const removeUrl = (index: number) => fetchJson<void>(`${API_BASE}/url/${index}`, {
  method: 'DELETE'
});

export const removeReport = (report: ReportResult) => fetchJson<void>(`${API_BASE}/report/`, {
  method: 'DELETE',
  body: JSON.stringify(report)
});


export const runMonitor = () => fetchJson<ReportResult[]>(`${API_BASE}/monitor`);

export const fetchMonitorResults = () => fetchJson<ReportResult[]>(`${API_BASE}/history`);


export interface ReportResult {
  id: number;
  date: string;
  url: string;
  path:string;
  status: string;
  responseTime: string;
  timestamp: string;
}