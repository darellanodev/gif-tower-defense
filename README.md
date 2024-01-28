# Gif Tower Defense Game

![git tower defense banner](https://github.com/darellanodev/gif-tower-defense/blob/main/img/github_readme/banner.png?raw=true)

This is an attempt to rewrite my old game Gif Tower Defense (2012) originally made with processingjs now using p5.js and Typescript, for learning purposes. _(THIS APPLICATION IS IN AN EARLY STAGE OF DEVELOPMENT)_

![git tower defense screenshots](https://github.com/darellanodev/gif-tower-defense/blob/main/img/github_readme/screenshots.png?raw=true)

## Run the game on web browser

- Use a web server like XAMPP and open index.html through localhost.
- Alternatively, you can use the "Live Server" extension in VSCode to open index.html.

## Execute the unit tests

- Execute `run_tests.sh` or `npm test` command

## Build to web

- Execute `run.sh` or `npm run build` command
- Wait until the process finish
- Open index.html in VSCode and use Open with live server option (from Live Server VSCode extension)

### Next tasks

- [ ] Level editor
- [ ] Speed button
- [ ] Pause button
- [ ] Magics buttons
- [ ] Simplify Typescript assignment params (this.zzz = zzz, <--- use the signature simplification using private in params)
- [ ] Menu to allow the user to select a desired level to play. Replace old player names for other names
- [ ] Test other maps with different end tiles positions to implement (with tests) the remaining endings
- [ ] Make the explosion balls with a face. The captured faces show a diferent icon with the mouth opened
- [ ] When Yellow tower is full the player get lives depending on the upgrade level of the yellow tower
- [ ] Yellow tower absorbs the yellow faces and fill its indicator
- [ ] Make the red tower target and shot to an enemy
- [ ] Create a MapProvider class to load and provide maps, and a Maps file with all the maps
- [ ] Extract variables and functions from main.ts to Game class
- [ ] When upgrading a tower, make the progress bar slowest depending on the upgrading level
- [ ] Change the color of the buy/upgrade cost to red and the influence area to gray when the player cant buy/upgrade
- [x] Print the sell money return
- [x] Draw the boss different to the rest of enemies
- [x] Print the upgrade costs
- [x] Make tower shot stronger depending on its upgrading level
- [x] The boss is slower and has more endurance than the rest of the enemies
- [x] The boss starts when the boss bar is filled
- [x] Create new enemies on the next wave
- [x] Create score class
- [x] When an enemy dies increase the score and the money
- [x] Endurance of the enemy depending to receive damage based on wave number and order of the enemy
- [x] Banner and screenshots in readme

## Resources

<https://p5js.org/es/reference/>

## Customize keybindings.json in VSCode

You can use this settings into VSCode `keybindings.json`:

```json
  {
    "key": "ctrl+t",
    "command": "workbench.action.terminal.sendSequence",
    "args": {
      "text": "./run_tests.sh\u000D"
    },
  },
  {
    "key": "ctrl+r",
    "command": "workbench.action.terminal.sendSequence",
    "args": {
      "text": "./run.sh\u000D"
    },
  },
```
