# Hootfy
## Descrição
Um sistema versátil de monitoramento de mudanças em páginas web, com suporte para múltiplos ambientes de execução.

## Recursos
- Monitoramento de múltiplas URLs
- Configuração flexível
- Notificações via webhook
- Suporte a diferentes tipos de armazenamento
- Execução em CLI, Web e AWS Lambda
- Docker support

## Configuração

### Variáveis de Ambiente
- `DB_TYPE`: Tipo de armazenamento (file, sqlite_local, sqlite_external, postgres)
- `GLOBAL_WEBHOOK_URL`: URL global para notificações
- `APP_MODE`: Modo de execução (cli, web, lambda)

### Instalação
```bash
npm install
cp .env.example .env
npm start
```

## Execução

### CLI
```bash
npm run cli
```

### Web
```bash
npm run web
```

### Docker
```bash
docker-compose up
```

### AWS Lambda
Configure o handler `lambda/lambda-handler.js`

## Contribuição
Pull requests são bem-vindos.

## Licença
GPL