const client = require('prom-client');

// Coletar métricas padrão do Node.js
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Histogram para medir duração das requisições HTTP
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duração das requisições HTTP em milissegundos',
  labelNames: ['method', 'route', 'code'],
});

module.exports = {
  client,
  httpRequestDurationMicroseconds,
};