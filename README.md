# Gif Tower Defense Game

![git tower defense banner](https://github.com/darellanodev/gif-tower-defense/blob/main/img/github_readme/banner.png?raw=true)

This is an attempt to rewrite my old game Gif Tower Defense (2012) originally made with processingjs now using p5.js and Typescript, for learning purposes. _(THIS APPLICATION IS IN AN EARLY STAGE OF DEVELOPMENT)_

![git tower defense screenshots](https://github.com/darellanodev/gif-tower-defense/blob/main/img/github_readme/screenshots.png?raw=true)

## Run the game on web browser

- Use a web server like XAMPP and open index.html through localhost.
- Alternatively, you can use the "Live Server" extension in VSCode to open index.html.

## Execute the unit tests

- Execute `run_tests.sh` or `npm test` command
- Also you can run `run_tests_watch.sh` or `npm run testw` command to use jest in watch mode

## Build to web

- Execute `run.sh` or `npm run build` command
- Wait until the process finish
- Open index.html in VSCode and use Open with live server option (from Live Server VSCode extension)

### Next tasks

- [x] Use Parcel as bundler
- [ ] When the player upgrades a Yellow tower with enemy explosions particles captured the particles get free again
- [ ] Upgrade time depending on the upgrade level for red tower and yellow towerç
- [ ] Lives animation (+1 core icon, +2 core icon, ...)
- [ ] Fix Hud selection tower position (may be making two icons, one for tower icon off and other for tower icon on)
- [ ] Magic UFO go to the enemy closest to the end tile
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

- [ ] Bug: when Game Over towers continue increasing damage bar of enemies.
- [ ] Bug: when an Enemy is freezed and is near to move, if it collides with other magic ice ball the timer dont increment. Idea: make a balloon indicating the time in seconds over the enemy indicating the freezed time.
- [ ] Bug: explosion enemy particles never goes down

- [ ] Improve code
  - [ ] apply when its possible SLA (single level of abstraction)
  - [ ] Setters
  - [ ] Private methods
  - [ ] Public/Private properties
  - [ ] Subdirectories: towers, constants, tiles

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
