# tailwind-verdiff

> 🧩 A handy **npm CLI tool** to compare Tailwind versions & configs.

![npm version](https://img.shields.io/npm/v/tailwind-verdiff)
![npm downloads](https://img.shields.io/npm/dw/tailwind-verdiff)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

**tailwind-verdiff** is a simple CLI tool to **compare Tailwind CSS versions and config files** side by side.  
It helps developers safely **upgrade Tailwind**, spot breaking changes, and track config differences with zero guesswork.


---

## 🚀 Features

- ✅ Compare **utility class names** across Tailwind CSS versions
- ✅ Diff **two Tailwind config files**
- ✅ Combined version + config diff in one command
- ✅ JSON output for CI or custom scripts
- ✅ Lightweight, fast, and works with any project

---

## 📦 Installation

Use it instantly with `npx` — no install needed:

```bash
npx tailwind-verdiff 2.2.19 3.4.1
```

Or install globally for repeated use:

```bash
npm install -g tailwind-verdiff
```

---

## ⚙️ Usage

### 🔹 1. Compare Tailwind versions

Check what utility classes were **added** or **removed**:

```bash
twverdiff 2.2.19 3.4.1
```

---

### 🔹 2. Compare Tailwind config files

Check what config keys were **added**, **removed**, or **changed**:

```bash
twverdiff --config config-old.cjs config-new.cjs
```

---

### 🔹 3. Compare both versions & configs at once

Do both in a single command:

```bash
twverdiff 2.2.19 3.4.1 --config config-old.cjs config-new.cjs
```

---

### 🔹 4. Get JSON output

Useful for CI, logs, or advanced scripts:

```bash
twverdiff 2.2.19 3.4.1 --json
twverdiff --config config-old.cjs config-new.cjs --json
twverdiff 2.2.19 3.4.1 --config config-old.cjs config-new.cjs --json
```

---

## 🗂 Example Output

```bash
🛠 Comparing TailwindCSS 2.2.19 → 3.4.1
142 new utility classes
19 classes removed

🛠 Comparing Tailwind config files:
Keys added: darkMode, theme.extend.spacing.80
Keys changed: theme.extend.colors.primary
```

---

## ✅ Why use tailwind-verdiff?

> Upgrading Tailwind in a big project?  
> Stop hoping — **know exactly what changed**.

No more:
- Guessing what classes were deprecated or renamed
- Digging through huge changelogs
- Breaking your UI because of config mismatches

---

## 💻 Development

Clone the repo:

```bash
git clone https://github.com/CodProdigy/tailwind-verdiff.git
cd tailwind-verdiff
npm install
```

Run it locally:

```bash
node bin/index.js 2.2.19 3.4.1
node bin/index.js --config config-old.cjs config-new.cjs
```

Test the CLI globally:

```bash
npm link
twverdiff 2.2.19 3.4.1
```

---

## 📜 License

MIT — free to use, modify, and share.

---

## ⭐ Contribute

Found a bug? Got an idea?  
PRs and issues are welcome! Let’s make Tailwind upgrades stress-free for everyone.

---

Made with ❤️ by [Aditya Pillai](https://github.com/CodProdigy)
