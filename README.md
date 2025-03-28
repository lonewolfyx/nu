# nu

A command-line tool that automatically updates your npm packages to their latest versions.

## Installation

```bash
npm install -g nu
```

## Usage

Navigate to your project directory and run:

```shellscript
nu
```

## Output

```plaintext
nu

Checking for outdated packages...
Found 13 outdated packages:
dependencies:
  @vueuse/core 13.0.0 -> 13.0.0
  pinia 3.0.1 -> 3.0.1
  vue-cropper 0.6.5 -> 0.6.5

devDependencies:
  @vitejs/plugin-legacy 5.4.3 -> 6.0.2
  @vitejs/plugin-vue 5.2.3 -> 5.2.3
  tailwindcss 4.0.17 -> 4.0.17
  vite 6.2.3 -> 6.2.3

All packages updated successfully!
```
