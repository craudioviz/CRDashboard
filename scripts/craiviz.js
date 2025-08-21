#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const logFile = path.resolve(__dirname, '../logs/cliAudit.log');
const args = process.argv.slice(2);
const [verb, subcommand, ...flags] = args;

function log(action, status = 'OK') {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] ${verb} ${subcommand} ${flags.join(' ')} :: ${status}\n`;
  fs.appendFileSync(logFile, entry);
}

function fail(reason) {
  log('ERROR', reason);
  console.error(`❌ CLI Error: ${reason}`);
  process.exit(1);
}

function dispatch() {
  try {
    const modulePath = path.resolve(__dirname, 'modules', `${verb}.js`);
    require(modulePath)(subcommand, flags, log, fail);
  } catch (err) {
    fail(`Unknown verb or missing module: ${verb}`);
  }
}

dispatch();
