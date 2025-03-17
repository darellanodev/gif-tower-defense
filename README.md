# Gif Tower Defense Game

![git tower defense banner](https://github.com/darellanodev/gif-tower-defense/blob/main/img_github_readme/banner.png?raw=true)

This is an attempt to rewrite my old game Gif Tower Defense (2012) originally made with processingjs now using p5.js, Typescript, Jest and Parcel, for learning purposes.

## THIS APPLICATION IS UNDER ACTIVE DEVELOPMENT, BUT STILL CONSIDERED BETA

## Github repository

- <https://github.com/darellanodev/gif-tower-defense>

## Technologies

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?style=flat&logo=p5dotjs&logoColor=white)](https://p5js.org)
[![Vitest](https://img.shields.io/badge/Vitest-6E78FF?style=flat&logo=vitest&logoColor=white)](https://vitest.dev)
[![pnpm](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=flat&logo=pnpm&logoColor=f69220)](https://pnpm.io)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=black)](https://prettier.io)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)

## Screenshots

![git tower defense screenshots](https://github.com/darellanodev/gif-tower-defense/blob/main/img_github_readme/screenshots.png?raw=true)

## Try it online

<https://darellanodev.github.io/tryitonline/giftowerdefense/index.html>

## Execute the unit tests

- Execute `run_tests.sh`

## Running in development mode

- Execute `run.sh` or `pnpm run dev`

## Build to web

- Execute `run_build.sh` or `pnpm run build` command.
- Wait until the process finish
- Open `dist/index.html` in VSCode and use Open with live server option (from Live Server VSCode extension)

## Utility to convert old levels data to new levels data format

- Run `pnpm run oldlevelsconverter`

## Utility to order levels by their ID

- Run `pnpm run sortLevels.ts` or execute the `run_sorter_levels.sh` script.

This will generate a `AllLevelsSorted.ts` file. After that, you can delete the `AllLevels.ts` file and rename `AllLevelsSorted.ts` to `AllLevels.ts`.

## How to contribute

Thank you for considering contributing! Please check out our detailed contribution guidelines [here](./CONTRIBUTING.md) to get started.

## Resources

<https://p5js.org/es/reference/>

## Customize keybindings.json in VSCode

You can use this settings into VSCode `keybindings.json`:

```json
  {
    "key": "ctrl+alt+t",
    "command": "workbench.action.terminal.sendSequence",
    "args": {
      "text": "./run_tests.sh\u000D"
    },
  },
  {
    "key": "ctrl+alt+r",
    "command": "workbench.action.terminal.sendSequence",
    "args": {
      "text": "./run.sh\u000D"
    },
  },
```
