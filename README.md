# Gif Tower Defense Game

This is an attempt to rewrite my old game Gif Tower Defense (2012) originally made with processingjs now using p5.js and Typescript, for learning purposes. _(THIS APPLICATION IS IN AN EARLY STAGE OF DEVELOPMENT)_

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
- [ ] Use prettier or other formatter
- [ ] Speed button
- [ ] Pause button
- [ ] Magics buttons
- [ ] Menu to allow the user to select a desired level to play. Replace old player names for other names.
- [ ] Test other maps with different end tiles positions to implement (with tests) the remaining endings
- [ ] The captured faces show a diferent icon with the mouth opened
- [ ] When Yellow tower is full the player get lives depending on the upgrade level of the yellow tower
- [ ] Yellow tower absorbs the yellow faces and fill its indicator
- [ ] When the enemy dies create an explosion of little happy yellow faces
- [ ] The boss is slower than the rest of the enemies
- [ ] Draw the boss different to the rest of enemies
- [ ] Make the red tower target and shot to an enemy
- [ ] Change the strenght of the enemies to increase every time a new enemy is created.
- [ ] Make tower shot stronger depending on its upgrading level
- [ ] Simplify Typescript assignment params (this.zzz = zzz, <--- use the signature simplification using private in params)
- [ ] When an enemy dies increase the score and the money

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
