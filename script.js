var ballmaxspeed = 1.5;
//var ballangle = Math.floor(Math.random() * 361);
var ballangle = Math.floor(Math.random() * 4) * 90 + 45;
var balla = ballangle * Math.PI / 180;
var ballspeedx = Math.cos(balla) * Math.sqrt(ballmaxspeed);
var ballspeedy = Math.sin(balla) * Math.sqrt(ballmaxspeed);

var acceleration = 0.5;
var ballmoving = 1

var wison = 0
var sison = 0
var upison = 0
var downison = 0

fps = 16.7

function addspeed() {ballmaxspeed += acceleration; checkspeed()};

function checkspeed() {
  balla = ballangle * Math.PI / 180;
  ballspeedx = Math.cos(balla) * Math.sqrt(ballmaxspeed);
  ballspeedy = Math.sin(balla) * Math.sqrt(ballmaxspeed);
}

function movebally() {
  var x = document.getElementById("ball").style;
  if(ballmoving != 0){
    x.top = Number(x.top.slice(0,-2)) - ballspeedy + "px";
  }

  if(!checkHeight(Number(x.top.slice(0, -2)), checkbarmove(ballspeedy)*3)) {ballangle *= -1; ballangle += 360; checkspeed()};

  setTimeout(movebally, fps);
}

function moveballx() {
  var x = document.getElementById("ball").style;
  if(ballmoving != 0){
    x.left = Number(x.left.slice(0,-2)) + ballspeedx + "px";
  }

  if(!checkHeight(Number(x.left.slice(0, -2)), checkbarmove(ballspeedx)*-2)) {ballspeedx *= -1; addspeed()};

  setTimeout(moveballx, fps);
}

function checkHeight(hght, drctn) {
  if (drctn == 1 && hght < 203) {return true}
  else if (drctn == -1 && hght > 3) {return true}

  //bally
  else if (drctn == 3 && hght < 288) {return true}
  else if (drctn == -3 && hght > 3) {return true}
  
  //ballx
  else if (drctn == 2 && hght < 483) {return true}
  else if (drctn == 2 && hght > 493) {updatepoints()}
  else if (drctn == 2 && !checkgoal("pong2")) {return true}
  else if (drctn == -2 && hght > 13) {return true}
  else if (drctn == -2 && hght < 3) {updatepoints()}
  else if (drctn == -2 && !checkgoal("pong1")) {return true}

  else {return false};
}

var bar1move = 0;
var bar2move = 0;

document.onkeydown = checkKeydown;
document.onkeyup = checkKeyup;

function checkKeydown() {
  let char = event.which || event.keyCode;
  //document.getElementById("demo").innerHTML = "Unicode CHARACTER code: " + char;

  // esc
  if (char == '27' && ballmoving == 0) {ballmoving = 1}
  else if (char == '27' && ballmoving == 1) {ballmoving = 0}
  // up arrow
  else if (char == '38' && upison == 0) {bar2move += 1; upison = 1}
  // down arrow
  else if (char == '40' && downison == 0) {bar2move -= 1; downison = 1}
  // w
  else if (char == '87' && wison == 0) {bar1move += 1; wison = 1}
  // s
  else if (char == '83' && sison == 0) {bar1move -= 1; sison = 1};
}

function checkKeyup() {
  let char = event.which || event.keyCode;
  //document.getElementById("demo").innerHTML = "Unicode CHARACTER code: " + char;

  // up arrow
  if (char == '38' && upison == 1) {bar2move -= 1; upison = 0}
  // down arrow
  else if (char == '40' && downison == 1) {bar2move += 1; downison = 0}
  // w
  else if (char == '87' && wison == 1) {bar1move -= 1; wison = 0}
  // s
  else if (char == '83' && sison == 1) {bar1move += 1; sison = 0};
}

pointsleft = 0;
pointsright = 0;

function checkgoal(bar) {
  let bary = Number(document.getElementById(bar).style.top.slice(0,-2));
  let bally = Number(document.getElementById("ball").style.top.slice(0,-2));
  if (bally - bary >= -10 && bally - (bary + 100) <= 10) {
    let newangle = (bally - bary - 45) * 1.3;
    if (bar[4] == "2") {newangle += 180}
    else {
      newangle *= -1;
      if (newangle < 0) {newangle += 360}
    }
    //document.getElementById("demo").innerHTML = newangle
    ballangle = newangle;
    checkspeed();
    return true;
  }
  else {return false};
}

function updatepoints() {
  if (checkbarmove(ballspeedx) > 0) {pointsright += 1}
  else {pointsleft += 1};
  restart();
  document.getElementById("points").innerHTML = pointsleft + "|" + pointsright;
}

function restart() {
  ballmoving = 0;
  ballangle = Math.floor(Math.random() * 4) * 90 + 45;
  ballmaxspeed = 1.5;
  let bl = document.getElementById("ball").style;
  let br1 = document.getElementById("pong1").style;
  let br2 = document.getElementById("pong2").style;
  bl.left = "250px";
  bl.top = "150px";
  setTimeout(function(){ballmoving = 1}, 3000);
}

function checkbarmove(barmove) {
  if (barmove < 0) {return 1}
  else {return -1};
}

function movebar1() {
  var x = document.getElementById("pong1").style;
  if(checkHeight(Number(x.top.slice(0,-2)), checkbarmove(bar1move))) {
    x.top = Number(x.top.slice(0,-2)) - bar1move + "px";
  }
}

function movebar2() {
  var x = document.getElementById("pong2").style;
  if(checkHeight(Number(x.top.slice(0,-2)), checkbarmove(bar2move))) {
    x.top = Number(x.top.slice(0,-2)) - bar2move + "px";
  }
}

do {setInterval(movebar1, fps)}
while (bar1move != 0);

do {setInterval(movebar2, fps)}
while (bar2move != 0);

setTimeout(movebally, 3000);
setTimeout(moveballx, 3000);