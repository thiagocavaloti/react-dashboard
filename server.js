/* eslint-disable no-console */
const jsonServer = require('json-server');
const express = require('express');
const next = require('next');
const util = require('util');
const exec = util.promisify(require('child_process').exec);


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    exec('json-server --watch db.json --port 3004');
    server.get('*', (req, res) => handle(req, res));
    server.use('/api', jsonServer.router('db.json'));

    server.listen(process.env.API_PORT, (err) => {
      if (err) throw err;
      console.log(` Ready on http://localhost:${process.env.API_PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
