# Gif Tower Defense Game

![git tower defense banner](https://github.com/darellanodev/gif-tower-defense/blob/main/img/github_readme/banner.png?raw=true)

This is an attempt to rewrite my old game Gif Tower Defense (2012) originally made with processingjs now using p5.js, Typescript, Jest and Parcel, for learning purposes. _(THIS APPLICATION IS IN AN EARLY STAGE OF DEVELOPMENT)_

![git tower defense screenshots](https://github.com/darellanodev/gif-tower-defense/blob/main/img/github_readme/screenshots.png?raw=true)

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

## Next tasks (moving to github issues...)

- Code improvements:

  - [ ] Use singleton pattern for the following classes

    - [ ] HudProgressBarWave
    - [ ] HudProgressBarBoss

  - [ ] Group into subfolders:

    - [ ] Buttons
    - [ ] ProgressBar

  - [ ] Extract getTilePosition from Path class to a new class because it is not related with the Path concept
  - [ ] Make Button a child of ButtonTransparent and perhaps rename Button to ButtonImage
  - [ ] Make the towers with an instance manager concept like the enemies or the magics
  - [ ] Review static methods to convert them to normal methods
  - [ ] Separate low level code of high level code

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
