import _ from 'lodash';
import path from 'path';
import { pathToFileURL } from 'url';
import chalk from 'chalk';

function walkDiff(obj1, obj2, basePath = '') {
  const changes = [];

  const keys = _.union(Object.keys(obj1 || {}), Object.keys(obj2 || {}));

  keys.forEach(key => {
    const fullKey = basePath ? `${basePath}.${key}` : key;

    if (!(key in obj1)) {
      changes.push({ type: 'added', key: fullKey });
    } else if (!(key in obj2)) {
      changes.push({ type: 'removed', key: fullKey });
    } else {
      const val1 = obj1[key];
      const val2 = obj2[key];

      if (_.isPlainObject(val1) && _.isPlainObject(val2)) {
        changes.push(...walkDiff(val1, val2, fullKey));
      } else if (!_.isEqual(val1, val2)) {
        changes.push({ type: 'changed', key: fullKey });
      }
    }
  });

  return changes;
}

export async function compareConfigs(configPath1, configPath2, options = {}) {
  try {
    const config1 = await import(pathToFileURL(path.resolve(configPath1)));
    const config2 = await import(pathToFileURL(path.resolve(configPath2)));

    const obj1 = config1.default || config1;
    const obj2 = config2.default || config2;

    const changes = walkDiff(obj1, obj2);

    const added = changes.filter(c => c.type === 'added');
    const removed = changes.filter(c => c.type === 'removed');
    const changed = changes.filter(c => c.type === 'changed');

    if (options.json) {
      const output = {
        added: added.map(c => c.key),
        removed: removed.map(c => c.key),
        changed: changed.map(c => c.key)
      };
      console.log(JSON.stringify(output, null, 2));
      return;
    }

    console.log(chalk.cyan(`\n🛠 Comparing Tailwind config files:`));
    console.log(chalk.gray(`• ${configPath1}`));
    console.log(chalk.gray(`• ${configPath2}\n`));

    if (added.length) {
      console.log(chalk.green(` Keys added:`));
      added.forEach(c => console.log(chalk.green(`+ ${c.key}`)));
    } else {
      console.log(chalk.green(' No keys added.'));
    }

    console.log();

    if (removed.length) {
      console.log(chalk.red(` Keys removed:`));
      removed.forEach(c => console.log(chalk.red(`- ${c.key}`)));
    } else {
      console.log(chalk.green(' No keys removed.'));
    }

    console.log();

    if (changed.length) {
      console.log(chalk.yellow(` Keys changed:`));
      changed.forEach(c => console.log(chalk.yellow(`~ ${c.key}`)));
    } else {
      console.log(chalk.green(' No keys changed.'));
    }

    console.log();

  } catch (err) {
    console.error(chalk.red('❌ Failed to compare configs:'), err.message);
  }
}