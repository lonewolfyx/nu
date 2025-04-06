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
Found 7 outdated packages:
dependencies:
  @vueuse/core 12.8.2 -> 13.0.0
  pinia 2.3.1 -> 3.0.1
  vue-cropper 0.6.5 -> 1.1.4

devDependencies:
  @vitejs/plugin-legacy 5.4.3 -> 6.0.2
  @lonewolfyx/tsconfig 0.0.4 -> 0.0.5
  @types/node 22.13.17 -> 22.14.0
  typescript 5.8.2 -> 5.8.3

All packages updated successfully!
```
