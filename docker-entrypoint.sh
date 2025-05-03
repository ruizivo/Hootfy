#!/bin/sh

# Inicia o servidor backend em segundo plano
echo "Iniciando servidor Node.js..."
node src/web/server.js &

# Pequena pausa para garantir que o Node.js inicie
sleep 3

# Inicia o NGINX como processo principal
echo "Iniciando Nginx..."
nginx -g 'daemon off;'


# #!/bin/sh
# set -e

# # Mensagem de inicialização
# echo "Iniciando serviços..."

# # Verificar se os diretórios necessários existem
# mkdir -p /run/nginx
# mkdir -p /var/log/nginx

# # Iniciar servidor Node.js em segundo plano
# echo "Iniciando servidor Node.js..."
# cd /app && node src/web/server.js &
# NODE_PID=$!

# # Aguardar pelo servidor Node.js iniciar (2 segundos)
# echo "Aguardando servidor Node.js iniciar..."
# sleep 2

# # Verificar se o processo Node.js está rodando
# if ! kill -0 $NODE_PID 2>/dev/null; then
#   echo "ERRO: O servidor Node.js falhou ao iniciar!"
#   exit 1
# fi

# # Iniciar NGINX
# echo "Iniciando Nginx..."
# nginx -g "daemon off;" &
# NGINX_PID=$!

# # Função para encerrar corretamente os processos
# clean_up() {
#   echo "Recebido sinal para encerrar..."
#   kill -TERM $NODE_PID
#   kill -TERM $NGINX_PID
#   wait $NODE_PID
#   wait $NGINX_PID
#   echo "Todos os serviços foram encerrados"
#   exit 0
# }

# # Registrar sinais para encerramento adequado
# trap clean_up SIGTERM SIGINT

# # Monitorar processos
# echo "Serviços iniciados com sucesso. Monitorando processos..."
# wait