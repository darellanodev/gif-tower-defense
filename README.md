# Gif Tower Defense Game

![git tower defense banner](https://github.com/darellanodev/gif-tower-defense/blob/main/img/github_readme/banner.png?raw=true)

This is an attempt to rewrite my old game Gif Tower Defense (2012) originally made with processingjs now using p5.js, Typescript, Jest and Parcel, for learning purposes. _(THIS APPLICATION IS IN AN EARLY STAGE OF DEVELOPMENT)_

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

- [ ] Pause button
- [ ] Speed button
- [ ] Put the draw of the start tile and the end tile on top of the enemies (the red and the green gradiente effect)
- [ ] Upload the build web version into my portfolio to allow play in web browser

- [ ] Use increment, decrement methods passing a number in Obj class. For example in Magic.ts instead of `this.position.x = this.position.x - Magic.SPEED` it would be `this.position.incrementX(Magic.SPEED)`.
- [ ] The enemy tilt when it is freezed
- [ ] Change "Magic" title in hud for "Magics"
- [ ] Make the explosion balls with a face. The captured faces show a diferent icon with the mouth opened
- [ ] Tint freezed enemies with a white/blue color and show ice particles
- [ ] Test other maps with different end tiles positions to implement (with tests) the remaining endings
- [ ] Extract variables and functions from main.ts to Game class
- [ ] Menu to allow the user to select a desired level to play. Replace old player names for other names
- [ ] HeatMap
- [ ] Level editor

- [ ] Bug: when Game Over towers continue increasing damage bar of enemies.
- [ ] Bug: when an Enemy is freezed and is near to move, if it collides with other magic ice ball the timer dont increment. Idea: make a balloon indicating the time in seconds over the enemy indicating the freezed time.
- [ ] Bug: explosion enemy particles never goes down

- [ ] Improve the code:
  - [ ] Refactor the code to use non-static methods by passing dependencies to the constructors. The dependencies will be interfaces. The classes should depend on abstractions, not concrete implementations (Dependency Inversion Principle).
  - [ ] Refactor code not to use setters, instead pass them to the constructors.
  - [ ] Refactor the code to reduce the size of the classes. It is best to have only one public method.
  - [ ] Apply SLA (single level of abstraction)

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
