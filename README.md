# Troll-Alt-Delete
 
<============================================================>
Troll Alt Delete is A platformer that runs in the browser.
You are a troll. Your bridge is too small, but you can't make
it bigger because this stupid System32 folder is in the way.
your goal? aquare administrator privalages to delete System32.
<============================================================>

to run the game, run 'index.html' in a modern browser such as
chrome or firefox with javascript enabled (modern versions of
most browsers have javascript enabled by default)

Creative Commons Licence: CC BY-NC-SA
Attribution-NonCommercial-ShareAlike

Created by Isaakfire

feel free to remix, mod, share, or use in any other content; just please credit me (and don't monetize it without permission)! :)
I will try to leave most values easy to tweak, and will keep most textures on a few different documents and image source sheets. it should be relitively easy to add more images to the img folder, and unused images can be safely stored in the 'sourceImages' folder without breaking anything. The 'img' document should allow you to add more as you wish.

to tweak values, press 'fn+f12' to open the command developer sidebar and navigate to the 'console' tab. The type the name of the  iable you want to tweak, add =, then set it to a value. a list of tweakable values is below, more can be found at the top of main.js.

example:
gravity = 10
<===============================================================================================================================>
isLevelEditor = true; :can be set through the console, if true, the player can place tiles
displayValueTweaker = true; :displays a value tweaker to mess with values in the top left

cameraX = 0; :X pos of the camera
cameraY = 0; :Y pos of the camera
playerX = 0; :X pos of the player
playerY = 0; :Y pos of the player
cameraTrackingSpeed = 20 :the speed at which the camera follows the player, higher numbers are slower, 1 is perfect tracking
xVel = 0; :x Velocity of player
yVel = 0; :y Velocity of playerd
playerWidth = 40; :width of the player
playerHeight = 50; :height of the player
tileSize = 64; :size of a tile, in px
pLevel = 0; :the level the player is on

canAirJump = false; :can the player jump off of the air if they haven't used up their jumps yet
friction = 0.7 :friction, time it takes for the player to slow. lower is more.
wallGrip = 0.5; :the amount of grip a player has on a wall when wall jumping.
speed = 2; :speed of the character
gravity = 0.5; :gravity's effect on the character and objects
jumpStrength = 10; :strength of player's jump
wallJumpOffset = 5; :the amount the player is pushed off of the wall when they wall jump.
canWallJump = true; :is the player allowed to walljump?
<===============================================================================================================================>