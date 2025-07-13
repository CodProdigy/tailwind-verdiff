import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function compareVersions(v1, v2, options = {}) {
  try {
    const basePath = path.join(__dirname, '..', 'tailwind-data');

    const v1Data = JSON.parse(fs.readFileSync(path.join(basePath, `${v1}.json`), 'utf-8'));
    const v2Data = JSON.parse(fs.readFileSync(path.join(basePath, `${v2}.json`), 'utf-8'));

    const set1 = new Set(v1Data);
    const set2 = new Set(v2Data);

    const added = [...set2].filter(cls => !set1.has(cls));
    const removed = [...set1].filter(cls => !set2.has(cls));

    if (options.json) {
      console.log(JSON.stringify({
        from: v1,
        to: v2,
        added,
        removed
      }, null, 2));
      return;
    }

    // Colored CLI output (default)
    console.log(chalk.cyan(`\n🔍 Comparing TailwindCSS ${v1} → ${v2}\n`));

    if (added.length) {
      console.log(chalk.green(`🟢 ${added.length} classes added:`));
      added.forEach(c => console.log(chalk.green(`+ ${c}`)));
    } else {
      console.log(chalk.green('✅ No new classes.'));
    }

    console.log('\n');

    if (removed.length) {
      console.log(chalk.red(`🔴 ${removed.length} classes removed:`));
      removed.forEach(c => console.log(chalk.red(`- ${c}`)));
    } else {
      console.log(chalk.green('✅ No classes removed.'));
    }

    console.log();
  } catch (err) {
    console.error(chalk.red("❌ Error comparing versions:"), err.message);
  }
}
