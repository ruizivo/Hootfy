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

type UrlItem = {
  url: string;
  active: boolean;
};

export type ConfigType = {
  interval: number;
  webhook_global: string;
  urls: UrlItem[];
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

export const addUrl = (urlData: UrlData) => fetchJson<void>(`${API_BASE}/url`, {
  method: 'POST',
  body: JSON.stringify(urlData)
});

export const removeUrl = (urlData: UrlData) => fetchJson<void>(`${API_BASE}/url`, {
  method: 'DELETE',
  body: JSON.stringify(urlData)
});

export const runMonitor = () => fetchJson<MonitorResult[]>(`${API_BASE}/monitor`);

export const fetchMonitorResults = () => fetchJson<MonitorResult[]>(`${API_BASE}/history`);


export interface MonitorResult {
  id: number;
  dataHora: string;
  url: string;
  status: string;
  responseTime: string;
  timestamp: string;
}