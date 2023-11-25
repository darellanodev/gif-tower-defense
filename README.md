# Gif Tower Defense Game

This is an attempt to rewrite my old game Gif Tower Defense (2012) originally made with processingjs now using p5.js and JavaScript, for learning purposes. *(THIS APPLICATION IS IN AN EARLY STAGE OF DEVELOPMENT)*

## Execute the game

- Use a web server like XAMPP and open index.html through localhost.
- Alternatively, you can use the "Live Server" extension in VSCode to open index.html.

## Execute the tests

- `npm test`

### Tasks

- [ ] Refactor with some functional programming
- [ ] Use prettier or other formatter
- [ ] Test other maps with different end tiles positions to implmentent (with tests) the remaining endings
- [ ] If left mouse button is pressed and exist a tower upgrade the tower
- [ ] The HUD changes when the player moves the mouse over a tower showing sell and upgrade options
- [ ] The influence area varies its radius and color depending on the selected tower in the HUD.
- [ ] The user can select the tower in the HUD using the mouse.
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
