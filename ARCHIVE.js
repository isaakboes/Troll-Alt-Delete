/*
OLD FUNCTIONS
this document is used for old functions that no longer serve any purpose, but are useful for archival purposes
(like in the case that the new ones break) and because I spend so much time on them that I don't have it in my
heart to throw them away. RIP old bad functions :(

*/

let materials = ["double_plate_left","double_plate","double_plate_right","vent","fan","overgrown_plate","overgrown_double_plate","beam","filled_truss","truss"];//vars for selecting materials to place with the level editor
let selection = 0;//which material is selected
let select = true;//can the player select something different

function editLevel(){
    if(isLevelEditor){
        try{//if cursor is out of window it throws an error, not a problem, just threw it in a try-catch
            //selecting a tile to place
            if(key.g&&select){//if the player can select a new tile and attempts to, select a new tile

                if(selection<materials.length-1){//if the material is out of the materials list, select the first one
                    selection += 1;
                    
                }else{selection = 0}
                select = false;//stops the program from going through all of the selections at supersonic speeds
            }
            if(!key.g){select = true}//allows selection again

            

            if(mouseDown){
                level[pLevel].layout[Math.floor((mouseY+cameraY)/tileSize)][Math.floor((mouseX+cameraX)/tileSize)] = materials[selection];  `   `
            }
            if(key.c){
                level[pLevel].layout[Math.floor((mouseY+cameraY)/tileSize)][Math.floor((mouseX+cameraX)/tileSize)] = "air"
            }


            ctx.globalAlpha = 0.5;
            drawTile(materials[selection],(Math.floor((mouseX+cameraX)/tileSize)*tileSize)-cameraX,(Math.floor((mouseY+cameraY)/tileSize)*tileSize)-cameraY,tileSize)//snaps tile overlay to the tile grid (this took me WAY too long)
            //drawTile(materials[selection],Math.floor(mouseX/tileSize)*tileSize-(cameraX%tileSize),mouseY,tileSize);
            //drawTile(materials[selection],Math.floor((mouseX)/tileSize)*tileSize-cameraX+Math.floor(cameraX/tileSize)*tileSize,Math.floor((mouseY)/tileSize)*tileSize-cameraY+Math.floor(cameraY/tileSize)*tileSize,tileSize);
            ctx.globalAlpha = 1;
        }catch{
            //do nothing if the cursor is out of the window and clicks (it will throw an error without the try-catch as it is trying to reference a point on an array that dosen't exist)
        }
    }
}

function drawTile(material,x,y,size){//draws a tile at a given position and size, allows selection of a material.//OLD
    /*
    each entry into the switch statement is a different material on the map. The 4 numbers in the middle correspond to areas on the tilemap.
    pixelX and pixelY are the values to offset the renderer. Each image is 16px by 16px, but to stop sloppy rendering on the canvas the image is
    really 128x128.
    */

    var tileMapGridSize = 64;//needs to change if the image is higher resolution.

    var pixelX = 0;
    var pixelY = 0;

    switch(material){//selects which section to draw from the tilemap (tilemap.png in img)
        case "double_plate_left":
            pixelX = 0;
            pixelY = 0;
        break;
        case "double_plate":
            pixelX = tileMapGridSize;
            pixelY = 0;
        break;
        case "double_plate_right":
            pixelX = tileMapGridSize*2;
            pixelY = 0;
        break;
        case "top_plate_left":
            pixelX = tileMapGridSize*0;
            pixelY = tileMapGridSize*1;
        break;
        case "top_plate":
            pixelX = tileMapGridSize*1;
            pixelY = tileMapGridSize*1;
        break;
        case "top_plate_right":
            pixelX = tileMapGridSize*1; 
            pixelY = tileMapGridSize*1;
        break;
        case "left_plate":
            pixelX = tileMapGridSize*0;
            pixelY = tileMapGridSize*2;
        break;
        case "plate":
            pixelX = tileMapGridSize*1;
            pixelY = tileMapGridSize*3;
        break;
        case "single_plate":
        default:
            pixelX = tileMapGridSize*3;
            pixelY = tileMapGridSize*0;
        break;
        case "truss":
            pixelX = tileMapGridSize*4;
            pixelY = tileMapGridSize*1;
        break;
    }

    if(material != "air"){
        ctx.drawImage(tiles,pixelX,pixelY,tileMapGridSize,tileMapGridSize,x,y,size,size);//draws the tile sprite
    }
    
}


function drawLevel(){
    for(var i = 0; i<level[pLevel].sizeX; i++){// i is X, l is Y
        for(var l = 0; l<level[pLevel].sizeY; l++){//draws a grid of tiles on the screen across the entire viewport
            if((i*tileSize-cameraX>tileSize*-1&&i*tileSize-cameraX<pageWidth)&&(l*tileSize-cameraY>tileSize*-1&&l*tileSize-cameraY<pageHeight)){//checks if the X and Y of the tile is in bounds


                //ctx.drawImage(tiles,0,0,16,16,i*tileSize-cameraX,l*tileSize-cameraY,tileSize,tileSize);//draws the tiles.
                try{
                    if(level[pLevel].layout[l][i]===undefined){
                        drawTile("air",i*tileSize-cameraX,l*tileSize-cameraY,tileSize);//if none exists, draw air (I should make a missing texture...).
                    }else{
                        drawTile(level[pLevel].layout[l][i],i*tileSize-cameraX,l*tileSize-cameraY,tileSize);//try to draw the correct tile.
                    }
                }catch{
                    drawTile("air",i*tileSize-cameraX,l*tileSize-cameraY,tileSize);//if none exists, draw air (I should make a missing texture...).
                }
                
            }
            
        }
    }
}


//ARCHAIC COLLIDERS (with console log statements intact! mint condition!)
    /* -- UNUSED
    playerX += xVel;
    if(getTileAtPosition(playerX,playerY) != "air"||getTileAtPosition(playerX+playerWidth,playerY+playerHeight) != "air"||getTileAtPosition(playerX,playerY+playerHeight) != "air"||getTileAtPosition(playerX+playerWidth,playerY) != "air"){//X collider
        playerX -= xVel
        xVel = 0;
    }
    playerY += yVel;
    if(getTileAtPosition(playerX,playerY) != "air"||getTileAtPosition(playerX+playerWidth,playerY+playerHeight) != "air"||getTileAtPosition(playerX,playerY+playerHeight) != "air"||getTileAtPosition(playerX+playerWidth,playerY) != "air"){//Y collider
        playerY -= yVel;
        if(yVel>0){
            jumps = 1;
        }
        yVel = 0;
    }
    
    while(getTileAtPosition(playerX,playerY-1) != "air"){//if the player is in a tile, move them up until they aren't anymore.
        // actually checks the position one px above the player so the player is always 1 px inside the tile so gravity dosen't run. 
        playerY -= 1;
        yVel = 0;
        jumps = 1;
    }*/
    

    /*if(getTileAtPosition(playerX,playerY-1) != "air"){
        playerY -= yVel;
        yVel = 0;
        console.log(yVel);
    }*/
    //level[pLevel].layout[cameraY/tileSize][cameraX/tileSize]!="air"
    //console.log(level[pLevel].layout[1][1]);
    //console.log(level[pLevel].layout[Math.round(-1*cameraY/tileSize)][Math.round(-1*cameraX/tileSize)]);
    /*try{//try to draw the player, if the player is outside of the level (the code throws an error), restarts.

        if(level[pLevel].layout[Math.round(-1*cameraY/tileSize)][Math.round(-1*cameraX/tileSize)]!="air"){//gravity and player floor collider
            while(level[pLevel].layout[Math.round(-1*cameraY/tileSize)][Math.round(-1*cameraX/tileSize)]!="air"){
                cameraY -=1;
            }
        }else{
            yVel += gravity;//adds gravitys
        }
    }catch{
        setup();//resets position
        yVel = 0;//0s velocity
        xVel = 0;//0s velocity
    }*/