import { useEffect, useState } from "preact/hooks";
import { io, Socket } from 'socket.io-client';



export default function AlertsPage() {
  const [logs, setLogs] = useState<string[]>([]);

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = io();
    setSocket(s);

    s.on('progress', (msg: string) => {
      setLogs((prev) => [...prev, msg]);
    });

    s.on('completed', (msg: string) => {
      setLogs((prev) => [...prev, msg]);
    });

    return () => {
      s.off('progress');
      s.off('completed');
      s.disconnect();
    };
  }, []);

  const iniciarVerificacao = () => {
    if (socket) {
      socket.emit('start-verification');
      setLogs([]);
    } else {
      console.warn('Socket ainda não conectado');
    }
  };

  return (
    <div>
      <button onClick={iniciarVerificacao}>Iniciar Verificação</button>
      <ul>
        {logs.map((log, i) => (
          <li key={i}>{log}</li>
        ))}
      </ul>
    </div>
  );
}