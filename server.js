const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const http = require('http');
const app = express();

var PROXY_LOL_TARGET_URL = 'https://na1.api.riotgames.com';
var PROXY_RIOT_TARGET_URL = 'https://americas.api.riotgames.com';

app.use(
  '/lol',
  createProxyMiddleware({
    target: PROXY_LOL_TARGET_URL,
    changeOrigin: true
  })
);

app.use(
  '/riot',
  createProxyMiddleware({
    target: PROXY_RIOT_TARGET_URL,
    changeOrigin: true
  })
);

const port = '5000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {});