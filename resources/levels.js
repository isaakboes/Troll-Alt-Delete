var level = [];//levels var
level[0] = {}//declares level[0] as an object

class Tile {//the tile class, stores information about each tile.
    constructor(tileName, tilemap, tilemapX, tilemapY, pallateX = 0, pallateY = 0, tileCollider = "full"){
        this.tileName = tileName;
        this.tilemap = tilemap;
        this.tilemapX = tilemapX;
        this.tilemapY = tilemapY;
        this.tileCollider = tileCollider;
        this.pallateX = pallateX;
        this.pallateY = pallateY;
    }
}

let materials = {}//declares materials object to store all tile types and all information about them.
materials.air = new Tile("air",tiles,0,0,0,0);//special case, will not render, counts as "nothing", also used to erase.
//TILES
materials.double_plate_left = new Tile("double_plate_left",tiles,0,0,1,0);
materials.double_plate = new Tile("double_plate",tiles,1,0,2,0);
materials.double_plate_right = new Tile("double_plate_right",tiles,2,0,3,0);

materials.double_plate_top = new Tile("double_plate_top",tiles,6,0,0,1);
materials.vertical_double_plate = new Tile("vertical_double_plate",tiles,6,1,0,2);
materials.double_plate_bottom = new Tile("double_plate_bottom",tiles,6,2,0,3);


materials.small_ridged_plate = new Tile("small_ridged_plate",tiles,2,4,10,4);
materials.ridged_plate_top = new Tile("ridged_plate_top",tiles,5,0,10,1);
materials.ridged_plate = new Tile("ridged_plate",tiles,5,1,10,2);
materials.ridged_plate_bottom = new Tile("ridged_plate_bottom",tiles,5,2,10,3);

//normal plate pieces
materials.plate_top_left = new Tile("plate_top_left",tiles,0,1,1,1);
materials.plate_top = new Tile("plate_top",tiles,1,1,2,1);
materials.plate_top_right = new Tile("plate_top_right",tiles,2,1,3,1);
materials.plate_left = new Tile("plate_left",tiles,0,2,1,2);
materials.plate = new Tile("plate",tiles,1,2,2,2);
materials.plate_right = new Tile("plate_right",tiles,2,2,3,2);
materials.plate_bottom_left = new Tile("plate_bottom_left",tiles,0,3,1,3);
materials.plate_bottom = new Tile("plate_bottom",tiles,1,3,2,3);
materials.plate_bottom_right = new Tile("plate_bottom_right",tiles,2,3,3,3);
//interior angles
materials.plate_inside_top_left = new Tile("plate_inside_top_left",tiles,3,3,4,1);
materials.plate_inside_top = new Tile("plate_inside_top",tiles,4,3,5,1);
materials.plate_inside_top_right = new Tile("plate_inside_top_right",tiles,5,3,6,1);
materials.plate_inside_left = new Tile("plate_inside_left",tiles,3,4,4,2);
materials.plate_inside = new Tile("plate_inside",tiles,4,4,5,2);
materials.plate_inside_right = new Tile("plate_inside_right",tiles,5,4,6,2);
materials.plate_inside_bottom_left = new Tile("plate_inside_bottom_left",tiles,3,5,4,3);
materials.plate_inside_bottom = new Tile("plate_inside_bottom",tiles,4,5,5,3);
materials.plate_inside_bottom_right = new Tile("plate_inside_bottom_right",tiles,5,5,6,3);
//interior angles with outside plate peices... 
materials.plate_double_inside_top_left = new Tile("plate_double_inside_top_left",tiles,0,5,7,1);
materials.plate_double_inside_top = new Tile("plate_double_inside_top",tiles,1,5,8,1);
materials.plate_double_inside_top_right = new Tile("plate_double_inside_top_right",tiles,2,5,9,1);
materials.plate_double_inside_left = new Tile("plate_double_inside_left",tiles,0,6,7,2);
materials.plate_double_inside_right = new Tile("plate_double_inside_right",tiles,2,6,9,2);
materials.plate_double_inside_bottom_left = new Tile("plate_double_inside_bottom_left",tiles,0,7,7,3);
materials.plate_double_inside_bottom = new Tile("plate_inside_bottom",tiles,1,7,8,3);
materials.plate_double_inside_bottom_right = new Tile("plate_inside_bottom_right",tiles,2,7,9,3);
//edges with only 1 interior angle... the lengths I will go for asthetics...
materials.plate_left_inside_top = new Tile("plate_left_inside_top",tiles,3,6,0,4);
materials.plate_right_inside_top = new Tile("plate_right_inside_top",tiles,4,6,1,4);
materials.plate_left_inside_bottom = new Tile("plate_left_inside_bottom",tiles,3,7,2,4);
materials.plate_right_inside_bottom = new Tile("plate_right_inside_bottom",tiles,4,7,3,4);
materials.plate_top_inside_left = new Tile("plate_left_inside_top",tiles,5,6,4,4);
materials.plate_bottom_inside_left = new Tile("plate_right_inside_top",tiles,6,6,5,4);
materials.plate_top_inside_right = new Tile("plate_left_inside_bottom",tiles,5,7,6,4);
materials.plate_bottom_inside_right = new Tile("plate_right_inside_bottom",tiles,6,7,7,4);

materials.single_plate = new Tile("single_plate",tiles,3,1,8,2);//just 1

materials.floor_plate = new Tile("floor_plate",tiles,4,1,8,4);
materials.indented_plate = new Tile("indented_plate",tiles,3,0,9,4)
materials.vent = new Tile("vent",tiles,4,0,4,0);






function generateLevel(l = 0, levelWidth = 20, levelHeight = 20, playerOffsetX = 2, playerOffsetY = 2){//generates a level
    level[l].layout = [];//clears old level
    level[l].sizeX = levelWidth;//sets size of level
    level[l].sizeY = levelHeight;

    for(var g = 0; g < levelHeight; g++){//generates 2d level

        level[l].layout.push([]);
        for(var h = 0; h < levelWidth; h++){

            level[l].layout[g].push(materials.air);//sets the level to air
            console.log(g+" "+h);
        }
    }//end of the level generation for loop
    level[l].pX = playerOffsetX;
    level[l].pY = playerOffsetY;

    level[l].layout[levelHeight-1][2] = materials.plate;//adds a platform for the player
    level[l].layout[3][2] = materials.plate;//adds a platform for the player

}