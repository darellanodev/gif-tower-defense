# Gif Tower Defense Game

![git tower defense banner](https://github.com/darellanodev/gif-tower-defense/blob/main/img_github_readme/banner.png?raw=true)

This is an attempt to rewrite my old game Gif Tower Defense (2012) originally made with processingjs now using p5.js, Typescript, Jest and Parcel, for learning purposes.

## THIS APPLICATION IS UNDER ACTIVE DEVELOPMENT, BUT STILL CONSIDERED BETA

## Github repository

- <https://github.com/darellanodev/gif-tower-defense>

## Technologies

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?style=flat&logo=p5dotjs&logoColor=white)](https://p5js.org)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white)](https://jestjs.io)
[![pnpm](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=flat&logo=pnpm&logoColor=f69220)](https://pnpm.io)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=black)](https://prettier.io)
[![Parcel](https://img.shields.io/badge/Parcel-21374B?style=flat&logo=parcel&logoColor=white)](https://parceljs.org/)

## Screenshots

![git tower defense screenshots](https://github.com/darellanodev/gif-tower-defense/blob/main/img_github_readme/screenshots.png?raw=true)

## Run the game on web browser

- Use a web server like XAMPP and open index.html through localhost.
- Alternatively, you can use the "Live Server" extension in VSCode to open index.html.

## Execute the unit tests

- Execute `run_tests.sh` to run the filtered test (see package.json for testf script)
- Execute `run_all_tests.sh` to run all the tests
- Also you can run `run_tests_watch.sh` or `npm run testw` command to use jest in watch mode

## Build to web

- Execute `run.sh` or `npm run build` command
- Wait until the process finish
- Open index.html in VSCode and use Open with live server option (from Live Server VSCode extension)

## Utility to convert old levels data to new levels data format

- Run `npm run oldlevelsconverter`

## How to contribute

Check out the contribution guidelines [here](./CONTRIBUTING.md).

## Discord channel

Join the discord channel: [![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?logo=discord&logoColor=white)](https://discord.gg/c2ZpxKsJ)

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
