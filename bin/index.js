#!/usr/bin/env node
import { compareVersions } from '../lib/compare.js';
import { compareConfigs } from '../lib/configCompare.js';

const args = process.argv.slice(2);

let v1 = null;
let v2 = null;
let config1 = null;
let config2 = null;
let isJson = false;

// Parse args
for (let i = 0; i < args.length; i++) {
  const arg = args[i];

  if (arg === '--json') {
    isJson = true;
  } else if (arg === '--config') {
    config1 = args[i + 1];
    config2 = args[i + 2];
    i += 2;
  } else if (!v1) {
    v1 = arg;
  } else if (!v2) {
    v2 = arg;
  }
}

// 🧠 Validate
if (!v1 && !config1) {
  console.error("❌ Usage: twverdiff <v1> <v2> [--config <file1> <file2>] [--json]");
  process.exit(1);
}

(async () => {
  if (v1 && v2) {
    compareVersions(v1, v2, { json: isJson });
  }

  if (config1 && config2) {
    await compareConfigs(config1, config2, { json: isJson });
  }
})();
