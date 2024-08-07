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

## Next tasks

- Code improvements:

  - [ ] Use singleton pattern for the following classes

    - [x] Game
    - [x] Player
    - [x] Wallet
    - [x] MagicFireballCreator
    - [x] MagicIceballCreator
    - [x] MagicUFOCreator
    - [ ] HudProgressBarWave
    - [ ] HudProgressBarBoss

  - [ ] Group into subfolders:

    - [ ] Buttons
    - [ ] ProgressBar

  - [x] Change the colors for startTile and endTile (starTile in green and endTile in red)
  - [ ] Insert more basic levels (maybe some of them need to write tests to implement the correct orders)
    - [x] Level 14 titled "one loop"
    - [x] Level 13 titled "doble loop"
      - [x] fix tileStart image orientation
      - [x] fix enemies start position
      - [x] put the hud over the enemies because the enemies walk in tilestart over the hud
    - [ ] Level with endTile in UP direction
    - [ ] Level with endTile in DOWN direction
  - [ ] Survival menu
    - [x] Display a first row of minimap levels
    - [ ] Display a second row (and perhaps a third row) of levels
    - [ ] Paginator (first page, previous page, next page, last page)
  - [ ] Make a fade transition when the player goes to a new screen.
  - [ ] Extract getTilePosition from Path class to a new class because it is not related with the Path concept
  - [x] Review Path class: remove static properties, refactor long methods.
  - [x] Clean tile creator classes
  - [x] TowerGreenCreator, TowerRedCreator, and TowerYellowCreator like MagicFireballCreator, ...
  - [x] Extract collision logic from Magic classes to collision classes.
  - [x] Make the tiles with an instance manager concept like the enemies or the magics
  - [ ] Make Button a child of ButtonTransparent and perhaps rename Button to ButtonImage
  - [ ] Make the towers with an instance manager concept like the enemies or the magics
  - [ ] Review static methods to convert them to normal methods
  - [ ] Separate low level code of high level code
  - [ ] TilesManager can not extend from InstancesManager because InstancesManager has methods for remove dead instances and doesnt make any sense

- The player can:

  - [ ] View the Main Menu and select a desired level to play.
    - [x] Basic background
    - [ ] Click in miniature to play
    - [ ] Replace old player names with other nicknames
    - [ ] ...
  - [ ] Pause the game and resume it with the pause button
  - [ ] Speed the game and return to normal speed with the speed button
  - [ ] Click on an enemy to select it as a target
  - [ ] Click on other enemy to select it as a target. If an enemy was selected before it will be deselected
  - [ ] Click on two or more enemies that are sharing the same position and then the target selection will change from one enemy to the next enemy.
  - [ ] Click on the path to deselect the target enemy
  - [ ] View the heatmap
  - [ ] Can exit from the current playing level. (ask for confirmation). Then return to main menu.
  - [ ] Create a level with the level editor
    - [ ] ...
  - [ ] Modify the difficult of the game with a visual graph (enemy endurances, profits, tower damages, ...)
    - [ ] ...

- The magic fireball and iceball:

  - [ ] Do not damage the enemies that are abducted by UFOs

- The enemy:

  - If it is freezed with an iceball:
    - [ ] it will tilt
    - [ ] it will drop ice particles
  - [ ] If it is burn with a fireball, during a time:
    - [ ] it will be dark
    - [ ] it will decrease its energy
    - [ ] it will drop fire particles

- In the hud:

  - [ ] Make a button in the hud for heatmap ("h" hotkey)
  - [ ] Make a button in the hud for the exit ("esc" hotkey). Ask for confirmation.

- The explosion balls:

  - [ ] Make the explosion balls with a face.
  - [ ] The captured faces show a diferent icon with the mouth opened

- Others:

  - [ ] Decrease Enemy class size extracting other classes from it.
  - [ ] Test other maps with different end tiles positions to implement (with tests) the remaining endings
  - [ ] Extract variables and functions from main.ts to Game class

- Detected bugs:

  - [ ] When a magic UFO drops an enemy, the enemy apears for an instant in the position where it was captured (there is a fast visual blink)
  - [ ] When Game Over towers continue increasing damage bar of enemies.
  - [ ] When an Enemy is freezed and is near to move, if it collides with other magic ice ball the timer dont increment. Idea: make a balloon indicating the time in seconds over the enemy indicating the freezed time.
  - [ ] Explosion enemy particles never goes down

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
