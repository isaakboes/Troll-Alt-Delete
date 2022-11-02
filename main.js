/*

Creative Commons Licence: CC BY-NC-SA
Attribution-NonCommercial-ShareAlike

Created by Isaakfire

feel free to remix, mod, share, or use in any other content; just please credit me (and don't monetize it without permission)! :)
I will try to leave most values easy to tweak, and will keep most textures on a few different documents. The 'img' document should allow
you to add more as you wish.

for full terms, as well as information on the project, see readme.md

Main document, handles most gameplay as well as the majority of all rendering tasks, as well as setting up the main game canvas.
*/

//VARS\\ -- most global variables are here
//SYSTEM VARS: if you mess with these it may break the game completely, so I recommend being careful
const canvas = document.getElementById("canv");//sets the canvas
const ctx = canvas.getContext('2d');//sets the context of the canvas
ctx.globalAlpha = 1;//sets the alpha to 1 (this is default)

const pageWidth = window.innerWidth;//finds the window width
const pageHeight = window.innerHeight-5;//finds the window height
canvas.width = pageWidth;//sets canvas width to page width
canvas.height = pageHeight;//sets canvas height to page height

//SETTINGS VARS: tweak these to your likeing, can be used to change how the game works

var isLevelEditor = true;//can be set through the console, if true, the player can place tiles
var valueTweaker = true;//displays a value tweaker to mess with values in the top left

var cameraX = 0;//X pos of the camera
var cameraY = 0;//Y pos of the camera
var playerX = 0;//X pos of the player
var playerY = 0;//Y pos of the player
var cameraTrackingSpeed = 20//the speed at which the camera follows the player, higher numbers are slower, 1 is perfect tracking
var xVel = 0;//x Velocity of player
var yVel = 0;//y Velocity of playerd
var playerWidth = 40;//width of the player
var playerHeight = 50;//height of the player
var tileSize = 64;//size of a tile, in px
var pLevel = 0;//the level the player is on

var canAirJump = false;//can the player jump off of the air if they haven't used up their jumps yet
var friction = 0.7//friction, time it takes for the player to slow. lower is more.
var wallGrip = 0.5;//the amount of grip a player has on a wall when wall jumping.
var speed = 2;//speed of the character
var gravity = 0.5;//gravity's effect on the character and objects
var jumpStrength = 10;//strength of player's jump
var wallJumpOffset = 5;//the amount the player is pushed off of the wall when they wall jump.
var canWallJump = true;//is the player allowed to walljump?

//END SETTINGS VARS, vars below this are changed by the script automatically (change them if you want, it just probably won't do much)

var jumpOffset = 0;//what direction the player is launched in, 0 is straight up. other values for wall jumps
var wallCling = false;//is the player currently clinging to a wall
var jumps = 2;//the amount of jumps the player has remaining.
var paused = false;//is the game paused?
var pauseAllowed = true;//has the pause key been relesed?
var selectedMaterial = materials.plate;//the material selected
var pallateRowLength = 6;//the row length of the displayed tiles in the pallate


//MAIN GAME LOOP ANd SETUP

setInterval(main,20);//runs the main function every 30ms

//setting up the player's position.
function setup(){
    var setCameraTrackingSpeed = cameraTrackingSpeed;//stores the current value of cameraTrackingSpeed to reset to
    cameraTrackingSpeed = 1.01;//forces the camera to move very quickly to the player's new position
    playerX = level[pLevel].pX*tileSize;
    playerY = level[pLevel].pX*tileSize;
    moveCamera(playerX,playerY);//moves the camera to the player's position.
    cameraTrackingSpeed = setCameraTrackingSpeed;//resets cameraTrackingSpeed
    
    xVel = 0;
    yVel = 0;
}

generateLevel(0,100,100);//generates the level before the game loop starts
setup();
function main(){
    ctx.clearRect(0,0,pageWidth,pageHeight);//clears the screen for the next frame to progress

    if(key.escape){//pausing script
        if(pauseAllowed){
            paused = !paused;
        }
        pauseAllowed = false;
    }else{
        pauseAllowed = true;
    }

    //actions to halt if the game is paused, such as moving the player and camera.
    if(!paused){
        movePlayer();//moves the player
        moveCamera(playerX,playerY);//moves the camera to the player
        if(playerY>(level[pLevel].sizeY * tileSize) + 200){//if the player falls 200px below the level, the player's position resets
            setup();
        }
    }
    //actions to run no matter what
    editLevel();//if the player is an editor, edit the level
    if(!key.q){
        drawPlayer();//draws the player sprite
        drawLevel();//draws the main level tiles
    }
    
    
   
     
}

//FUNCTIONS AND CLASSES
function valueTweaker(displayed){
    if(displayed){
        ctx.fillRect(3,3,400,20);
    }
}

function drawLevel(){
    for(var i = 0; i<level[pLevel].sizeX; i++){// i is X, l is Y
        for(var l = 0; l<level[pLevel].sizeY; l++){//draws a grid of tiles on the screen across the entire viewport
            if((i*tileSize-cameraX>tileSize*-1&&i*tileSize-cameraX<pageWidth)&&(l*tileSize-cameraY>tileSize*-1&&l*tileSize-cameraY<pageHeight)){//checks if the X and Y of the tile is in bounds


                //ctx.drawImage(tiles,0,0,16,16,i*tileSize-cameraX,l*tileSize-cameraY,tileSize,tileSize);//draws the tiles.
                try{
                    if(level[pLevel].layout[l][i]===undefined){
                        drawTile(materials.air,i*tileSize-cameraX,l*tileSize-cameraY,tileSize);//if none exists, draw air (I should make a missing texture...).
                    }else{
                        drawTile(level[pLevel].layout[l][i],i*tileSize-cameraX,l*tileSize-cameraY,tileSize);//try to draw the correct tile.
                    }
                }catch{
                    drawTile(materials.air,i*tileSize-cameraX,l*tileSize-cameraY,tileSize);//if none exists, draw air (I should make a missing texture...).
                }
                
            }
            
        }
    }
}



function editLevel(){ //TODO FIX LEVEL EDITOR
    var pallateMargins = 20;//the margin on the level editor pallate
    var pallateTilesList = [];

    if(isLevelEditor){//is the player a level editor? don't ask me, ask "isLevelEditor"
        if(key.q){
            if(mouseDown){//selecting tiles
                var tilePallateX = Math.floor((mouseX-pallateMargins)/tileSize/2);//gets the x pos of the mouse
                var tilePallateY = Math.floor((mouseY-pallateMargins)/tileSize/2);//gets the y pos of the mouse
                console.log(tilePallateX + ", "+tilePallateY);
                /*
                var pallateIndex = tilePallateX + pallateRowLength*tilePallateY;//gets the index of the clicked tile
                selectedMaterial = pallateTilesList[pallateIndex]//sets the material selected to the material the player clicked
                */
            }
            index = 0;
            tileRenderX = 0;
            tileRenderY = 0;
            //draws tiles in pallate
            Object.entries(materials).forEach(tile => {//for each tile in the tileset, render a tile
                pallateTilesList.push(tile[1]);                
                drawTile(tile[1],(tile[1].pallateX*tileSize*2)+pallateMargins,(tile[1].pallateY*tileSize*2)+pallateMargins,tileSize*2)//renders tileset
                //drawTile(tile[1],(tileRenderX*tileSize*2)+pallateMargins,(tileRenderY*tileSize*2)+pallateMargins,tileSize*2);//renders tileset

                ctx.drawImage(selector,0,0,tileSize,tileSize,(Math.round((mouseX-tileSize-pallateMargins)/(tileSize*2))*tileSize*2)+pallateMargins,Math.round((mouseY-tileSize-pallateMargins)/(tileSize*2))*tileSize*2+pallateMargins,tileSize*2,tileSize*2,tileSize*2);


                //tileRenderX ++;//shifts the tile grid down a layer every 5th (or whatever pallateRowLength is set to) tile
                //if (index%pallateRowLength>=pallateRowLength-1){tileRenderY++;tileRenderX=0}
                
                index++;
                if(mouseDown){
                    if(tile[1].pallateX==tilePallateX&&tile[1].pallateY==tilePallateY){selectedMaterial = tile[1]};//selecting a tile
                }
            });
            
            //let selectorImageSize = tileSize;//the selector icon size in px, edit for custom sprites
            //picking pallate tiles
            //ctx.drawImage(selector,0,0,selectorImageSize,selectorImageSize,(Math.floor((mouseX-pallateMargins+cameraX)/(tileSize*2))*tileSize*2)-cameraX+pallateMargins,(Math.floor((mouseY-pallateMargins+cameraY)/(tileSize*2))*tileSize*2)-cameraY+pallateMargins,tileSize*2,tileSize*2,tileSize*2);
            //drawTile(selector,(Math.floor((mouseX+cameraX)/(tileSize*2))*tileSize*2)-cameraX,(Math.floor((mouseY+cameraY)/(tileSize*2))*tileSize*2)-cameraY,tileSize*2)//snaps tile overlay to the tile grid (this took me WAY too long)
            


        }else{//if q is not pressed
            try{//if cursor is out of window it throws an error, not a problem, just threw it in a try-catch 
            
                if(mouseDown){//places a tile
                    level[pLevel].layout[Math.floor((mouseY+cameraY)/tileSize)][Math.floor((mouseX+cameraX)/tileSize)] = selectedMaterial;
                }
                if(rightMouseDown){//sets a tile to air
                    level[pLevel].layout[Math.floor((mouseY+cameraY)/tileSize)][Math.floor((mouseX+cameraX)/tileSize)] = materials.air;
                }
    
    
                ctx.globalAlpha = 0.5;
                drawTile(selectedMaterial,(Math.floor((mouseX+cameraX)/tileSize)*tileSize)-cameraX,(Math.floor((mouseY+cameraY)/tileSize)*tileSize)-cameraY,tileSize)//snaps tile overlay to the tile grid (this took me WAY too long)
                ctx.globalAlpha = 1;
            }catch{
                //do nothing if the cursor is out of the window and clicks 
                //(it will throw an error without the try-catch as it is trying
                // to reference a point on an array that dosen't exist)
            }
        }
    }
}

function drawTile(material,x,y,size){//draws a tile at a given position and size, allows selection of a material.
    var tileMapGridSize = 64;//needs to change if the image is higher resolution.

    if(material.tileName != "air"){//makes sure the tile isn't air
        ctx.drawImage(material.tilemap,material.tilemapX*tileSize,material.tilemapY*tileSize,tileMapGridSize,tileMapGridSize,x,y,size,size);//draws the tile sprite
    }
}

function drawPlayer(){//TEMPORARY, DRAWS A SKWARE
    ctx.fillStyle = "#FFF";
    ctx.fillRect(playerX-cameraX,playerY-cameraY,playerWidth,playerHeight);
}

function getTileAtPosition(x,y){
    try{//if tile is out of bounds (not on the list) just draw air
        if(level[pLevel].layout[Math.floor(y/tileSize)][Math.floor(x/tileSize)]===undefined){//another check if tile is out of bounds
            return materials.air;//returns air
        }else{//if the tile is valid, return it
            return level[pLevel].layout[Math.floor(y/tileSize)][Math.floor(x/tileSize)];
        }
    }catch{//if tile is throwing an error
        return materials.air;//returns air
    }
    
    //return level[pLevel].layout[Math.floor(y/tileSize)][Math.floor(x/tileSize)]; -- UNUSED
}

function collide(x,y,width,height){
    return getTileAtPosition(x,y) != materials.air||getTileAtPosition(x+width,y+height) != materials.air||getTileAtPosition(x,y+height) != materials.air||getTileAtPosition(x+width,y) != materials.air;
}

var grounded = true;
function movePlayer(){
    var lastPlayerMovement = 1;//the last direction the player moved, 1 is right, -1 is left. used for dash.
    
    
    if(grounded){
        xVel = (xVel*friction)+((key.d - key.a)*speed);
    }else{
        xVel = (xVel*0.95)+((key.d - key.a)*(speed/5));
    }
    
    //yVel = (yVel*friction)+((key.s - key.w)*speed);//old up and down movement

    yVel += gravity;//adds gravity

    //OLD COLLIDERS -- UNUSED
    /*playerY += yVel;
    if(getTileAtPosition(playerX,playerY) != "air"||getTileAtPosition(playerX+playerWidth,playerY+playerHeight) != "air"||getTileAtPosition(playerX,playerY+playerHeight) != "air"||getTileAtPosition(playerX+playerWidth,playerY) != "air"){//Y collider
        playerY -= yVel;
        if(yVel>0){
            jumps = 1;
        }
        yVel = 0;
    }*/

    if(yVel > 0 && !canAirJump){//if the player is falling, don't allow them to jump
        if(!wallCling){//if the player isn't hanging on the wall, don't let them jump
            jumps = 0;
        }
        jumpOffset = 0;
        grounded = false;
    }
    if(yVel > 3){//if the player is moving too fast upward, don't let them cling to the wall
        wallCling = false;
    }

    playerY += Math.floor(yVel);//applies gravity
    if(collide(playerX,playerY,playerWidth,playerHeight)){
        while(collide(playerX,playerY,playerWidth,playerHeight)){//Y collider

            if(yVel>0){playerY -= 1}else if(yVel<0){playerY += 1}//moves player out of the collision state
        }
        if(yVel>0){
            jumps = 1;
        }
        yVel = 0;
        wallCling = false;
        grounded = true;
    }

    playerX += xVel;//adds player's x velocity
    if(collide(playerX,playerY,playerWidth,playerHeight)){
        while(collide(playerX,playerY,playerWidth,playerHeight)){//X collider
        
            if(xVel>0){playerX -= 1}else{playerX += 1}//moves the player in the right
        }
        

        //WALLJUMP CODE 
        if(canWallJump){
            wallCling = true;//if the player is clinging to the wall, set to true
        if (yVel >=0){//if the player is moving downward, player clings to the wall
            yVel = Math.ceil(yVel * wallGrip);
        }

        jumpOffset = wallJumpOffset;
        if (xVel > 0){
            jumpOffset *= -1;
        }
        xVel = 0;
        }
    }

    if(key.w && (jumps>0||wallCling)){//jump script, if player has jumps remaining, allow player to jump.

        
        yVel = jumpStrength * -1;
        jumps -= 1;
        wallCling = false;
        xVel += jumpOffset;
        grounded = false;
    }
}

function moveCamera(x,y){
    cameraX += Math.floor((x - cameraX - pageWidth/2)/cameraTrackingSpeed);
    cameraY += Math.floor((y - cameraY - pageHeight/2)/cameraTrackingSpeed);//sets the camera to follow the player, floors result to keep a clean look

    if(cameraX+pageWidth>level[pLevel].sizeX*tileSize){//if camera is going out of bounds to the right, finds level size and adjusts accordingly
        cameraX = level[pLevel].sizeX*tileSize-pageWidth;
    }
    if(cameraY+pageHeight>level[pLevel].sizeY*tileSize){
        cameraY = level[pLevel].sizeY*tileSize-pageHeight;
    }
    if(cameraX<0){//if the camera would be out of bounds, snap to the edge of the screen
        cameraX = 0;
    }
    if(cameraY<0){
        cameraY = 0;
    }
}