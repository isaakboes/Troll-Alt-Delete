/*
Takes all inputs from the user, and allows the main document to detect them.
I didn't comment this one that well because I don't use it much, but it's pretty easy to understand.
the 'key' object stores all of the keys that the game uses, if you need more, just declare one in the first 'key'
statement and update the getKeyDown and getkeyUp statements.
*/
var mouseX;
var mouseY;

var rightMouseDown = false;
var mouseDown = false;
var rightMouseDown = false;

var key = {//keys object, stores what keys are down.
    q:false,
    d:false,
    a:false,
    s:false,
    w:false,
    up:false,
    down:false,
    left:false,
    right:false,
    c:false,
    v:false,
    g:false,
    h:false,
    shift:false,
    control:false,
    escape:false,
}
document.addEventListener("keydown",getKeyDown);//adds a listener to detect keys that are down
document.addEventListener("keyup",getKeyUp);//adds a listener to detect keys that are up

function getKeyDown(k){//if the key is up
    switch(k.key){
        case "Q":
        case "q":key.q=true; break;
        case "A":
        case "a":key.a=true; break;
        case "D":
        case "d":key.d=true; break;
        case "S":
        case "s":key.s=true; break;
        case " ":
        case "W":
        case "w":key.w=true; break;
        case "C":
        case "c":key.c=true; break;
        case "V":
        case "v":key.v=true; break;
        case "F":
        case "f":key.f=true; break;
        case "G":
        case "g":key.g=true; break;
        case "H":
        case "h":key.h=true; break;
        case "Shift":key.shift=true;break;
        case "Control":key.control=true;break;
        case "Escape":key.escape = true;break;
    }
}
function getKeyUp(k){//if the key is down
    switch(k.key){
        case "Q":
        case "q":key.q=false; break;
        case "A":
        case "a":key.a=false; break;
        case "D":
        case "d":key.d=false; break;
        case "S":
        case "s":key.s=false; break;
        case " ":
        case "W":
        case "w":key.w=false; break;
        case "C":
        case "c":key.c=false; break;
        case "V":
        case "v":key.v=false; break;
        case "F":
        case "f":key.f=false; break;
        case "G":
        case "g":key.g=false; break;
        case "H":
        case "h":key.h=false; break;
        case "Shift":key.shift=false;break;
        case "Control":key.control=false;break;
        case "Escape":key.escape = false;break;

    }
}

window.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    
});

window.onmousemove = function (e){
    mouseX = e.clientX;
    mouseY = e.clientY;
}
window.onmousedown = function (e){
    if("buttons" in e){
        mouseDown = e.buttons == 1;
        rightMouseDown = e.buttons == 2;
    }
}
window.onmouseup = function (e){
    mouseDown = false;
    rightMouseDown = false;
}

