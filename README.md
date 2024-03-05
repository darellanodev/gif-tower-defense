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

- [x] When upgrading a tower, make the progress bar slowest depending on the upgrading level
- [x] Magic ball of fire movement
- [x] Magic ball of ice movement
- [x] Magic UFO movement
- [x] Magic ball of fire rest vitality to the enemies
- [x] Small particles when an fireball touch an enemy
- [x] Set particles color to red when an fireball touch an enemy
- [x] Magic ball of ice freezes the enemies
- [x] Blue small particles when an iceball touch an enemy
- [ ] Magic UFO go to the enemy closest to the end tile
- [ ] Make the red tower target and shot to an enemy
- [ ] Yellow tower absorbs the yellow faces and fill its indicator
- [ ] When Yellow tower is full the player get lives depending on the upgrade level of the yellow tower
- [ ] Make the explosion balls with a face. The captured faces show a diferent icon with the mouth opened
- [ ] Upload the build web version into my portfolio to allow play in web browser
- [ ] Put the start tile and the end tile on top of the enemies

- [ ] Tint freezed enemies with a white color and show ice particles
- [ ] Test other maps with different end tiles positions to implement (with tests) the remaining endings
- [ ] Extract variables and functions from main.ts to Game class
- [ ] Menu to allow the user to select a desired level to play. Replace old player names for other names
- [ ] Simplify Typescript assignment params (this.zzz = zzz, <--- use the signature simplification using private in params)
- [ ] HeatMap
- [ ] Pause button
- [ ] Speed button
- [ ] Level editor

- [ ] Improve code
  - [x] Interfaces for enemies positions
  - [x] Refactor to use Position interface in other parts of the code
  - [ ] Use class methods (static methods) to instantiate objects
  - [ ] Use named tuples?

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
