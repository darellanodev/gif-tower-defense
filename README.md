# Gif Tower Defense Game

This is an attempt to rewrite my old game Gif Tower Defense (2012) originally made with processingjs now using p5.js and JavaScript, for learning purposes. *(THIS APPLICATION IS IN AN EARLY STAGE OF DEVELOPMENT)*

## Execute the game

- Use a web server like XAMPP and open index.html through localhost.
- Alternatively, you can use the "Live Server" extension in VSCode to open index.html.

## Execute the tests

- `npm test`

### Tasks

- [ ] Use prettier or other formatter
- [ ] Speed button
- [ ] Pause button
- [ ] Menu to allow the user to select a desired level to play
- [ ] Test other maps with different end tiles positions to implement (with tests) the remaining endings
- [ ] When the player lost all the lives show game over screen
- [ ] The captured faces show a diferent icon with the mouth opened
- [ ] When is full get lives depending on the upgrade level
- [ ] Yellow tower absorbs the yellow faces and fill its indicator
- [ ] When the enemy dies create an explosion of little happy yellow faces
- [ ] The boss is slower than the rest of the enemies
- [ ] Draw the boss different to the rest of enemies
- [ ] Make the progress bar to the next wave and the boss progress bar at the bottom
- [ ] When the player buys a tower decrease the money
- [ ] When the player sells a tower increase the money
- [ ] Put the money indicator
- [ ] When an enemy reaches the end tile the player loses a live
- [ ] Put the lives indicator
- [ ] Put a bar in top of enemies to show their health
- [ ] The HUD changes when the player moves the mouse over a tower showing sell and upgrade options
- [x] Refactor with some functional programming (replace `for` loops with `forEach` function, use `find` function, ...)
- [x] Fix the laser that goes under the other tiles
- [x] Rotate the tower to follow the target enemy
- [x] Laser tower selects the near enemy and fires a laser line
- [x] If left mouse button is pressed and exist a tower upgrade the tower
- [x] Include the towers designs
- [x] The user can select the tower in the HUD using the mouse.
- [x] Include the tile design
- [x] Include the inkscape HUD design
- [x] If exists a tower the influence area corresponds to the upgrade level of the tower and also its color.
- [x] The influence area varies its radius and color depending on the selected tower in the HUD.
- [x] Allow the user to select the type of tower in the HUD using the keyboard.
- [x] Box over the item selected in the HUD
- [x] Make the five enemies start consecutively after a time
- [x] Draw a circle representing the influence area when the player moves the mouse over a tower
- [x] Make the enemy move and close their eyes
- [x] The enemy follows the path
- [x] Put the enter and the exit of the laberinth
- [x] If right button is pressed sell the tower
- [x] Test the TileGenerator class to throw an error if passed an empty string
- [x] Smaller enemies with basic animations: center, left, right, closed
- [x] Generate movement direction orders
- [x] Enemy follows the direction orders
- [x] Check if can reach the exit when generating the path orders. Otherwise is an invalid map.
- [x] Put a tower when the player clics on an orange tile
- [x] Create an array of towers
- [x] Place the player HUD
- [x] Center the canvas on the screen
- [x] Start with a basic canvas test
- [x] Include p5.min.js locally, set background dark and put some images
- [x] Create a basic Tower Class, and display it
- [x] Create a basic map
- [x] Set a background image for all the map
- [x] Make the path of the map transparent

## Resources

<https://p5js.org/es/reference/>
