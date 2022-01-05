"use strict";
const body=document.getElementsByTagName("body").item(0);
body.style.background="#000";

const TP=2*Math.PI;
const CSIZE=400;

const ctx=(()=>{
  let d=document.createElement("div");
  d.style.textAlign="center";
  body.append(d);
  let c=document.createElement("canvas");
  c.width=2*CSIZE;
  c.height=2*CSIZE;
  d.append(c);
  return c.getContext("2d");
})();
ctx.translate(CSIZE,CSIZE);

onresize=()=>{ 
  let D=Math.min(window.innerWidth,window.innerHeight)-40; 
  ctx.canvas.style.width=D+"px";
  ctx.canvas.style.height=D+"px";
}

const getRandomInt=(min,max,low)=>{
  if (low) {
    return Math.floor(Math.random()*Math.random()*(max-min))+min;
  } else {
    return Math.floor(Math.random()*(max-min))+min;
  }
}

var t=0;

var getColors=()=>{
  let c=["black"];
  let colorCount=3;
  let hr=Math.round(60/colorCount);
  let hue=getRandomInt(0,90,true)+30;
  for (let i=0; i<colorCount; i++) {
    let hd=Math.round(360/colorCount)*i+getRandomInt(-hr,hr);
    let sat=70+getRandomInt(0,31);
    let col=(hue+hd)%360;
    let lf=Math.random();
    let lum=Math.round(50+20*Math.pow(Math.sin((col+90)*TP/360),2));
    c.splice(getRandomInt(0,c.length+1),0,"hsl("+col+","+sat+"%,"+lum+"%)");
  }
  c.splice(getRandomInt(0,c.length+1),0,"black");
  return c;
}

var colors=getColors();

var SS=2;
var draw=()=>{
  ctx.fillStyle=colors[t%colors.length];
  for (let i=0; i<160; i++) {	// 10,000 for 4x4, 3x3 won't fit border
    let x=SS*Math.round((-CSIZE+2*CSIZE*Math.random())/SS);
    let y=SS*Math.round((-CSIZE+2*CSIZE*Math.random())/SS);
    ctx.fillRect(x,y,SS,SS);
    ctx.fillRect(-x,y,SS,SS);
    ctx.fillRect(-x,-y,SS,SS);
    ctx.fillRect(x,-y,SS,SS);
    ctx.fillRect(y,x,SS,SS);
    ctx.fillRect(-y,x,SS,SS);
    ctx.fillRect(-y,-x,SS,SS);
    ctx.fillRect(y,-x,SS,SS);
  }
}

var stopped=true;
var start=()=>{
  if (stopped) { 
    stopped=false;
colors=getColors();
    requestAnimationFrame(animate);
  } else {
    stopped=true;
  }
}
body.addEventListener("click", start, false);

var animate=(ts)=>{
  if (stopped) return;
  if (Math.random()<0.002) colors=getColors();
  t++;
  draw();
  requestAnimationFrame(animate);
}
onresize();

start();