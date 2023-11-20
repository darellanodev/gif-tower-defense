# Gif Tower Defense Game

This is an attempt to rewrite my old game Gif Tower Defense (2012) originally made with processingjs now using p5.js and JavaScript, for learning purposes. *(THIS APPLICATION IS IN AN EARLY STAGE OF DEVELOPMENT)*

## Execute the game

- Use a web server like XAMPP and open index.html through localhost.
- Alternatively, you can use the "Live Server" extension in VSCode to open index.html.

## Execute the tests

- `npm test`

### Tasks

- [ ] Test other maps with different end tiles positions to implmentent (with tests) the remaining endings
- [ ] Enemy moves eyes depending the movement direction
- [ ] If right button is pressed sell the tower
- [ ] If left mouse button is pressed upgrade the tower
- [ ] The HUD changes when the player moves the mouse over a tower
- [ ] Draw a circle representing the influence area when the player moves the mouse over a tower
- [ ] Put the enter and the exit of the laberinth
- [ ] The enemy follows the path
- [ ] Refactor with some functional programming
- [ ] Use prettier or other formatter
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
