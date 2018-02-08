var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");

var btn = document.getElementById("stop");
var clear = document.getElementById("clear");
var btn2 = document.getElementById("stop2");

var radius = 10;
var x = canvas.width/2;
var y = canvas.height/2;

var requestID;

var status = 0;
var dfactor=-1;

var xcoor = x;
var ycoor = y;
var angle = Math.random()*Math.PI*2;
var xfactor;
var yfactor;
if( Math.cos(angle) > 0 ){ xfactor = 1; }
else{ xfactor = -1; }
if( Math.sin(angle) > 0 ){ yfactor = 1; }
else{ yfactor = -1; }

var animate = function(){

    var drawCirc = function(){
	
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	//ctx.fillStyle="#"+radius;
	ctx.fillStyle="rgba(100,"+radius%255+",150,100)";
	ctx.beginPath();
	ctx.arc(x,y,radius,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();
	
	requestID = window.requestAnimationFrame(drawCirc);
	console.log(requestID);
	if( radius==x || radius==y ){
	    dfactor=-1;
	}
	else if( radius==1 ){
	    dfactor=1;
	}
	radius=dfactor+radius;

    };
    drawCirc();
}

var animate2 = function(){
    var logo = function(){
	
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	ctx.beginPath();
	ctx.arc(xcoor,ycoor,10,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();
		
	requestID = window.requestAnimationFrame(logo);
	console.log(requestID)

	
	if( xcoor < radius || xcoor+radius > canvas.width ){
	    xfactor*=-1;
	}
	else if(ycoor < radius || ycoor+radius > canvas.height){
	    yfactor*=-1;
	}

	xcoor+=Math.cos(angle)*xfactor;
	ycoor+=Math.sin(angle)*yfactor;
    }
    logo();
}


var btnReact = function(){
    if( status == -1 ){
	window.cancelAnimationFrame( requestID );
	status+=1;
    }
    else{
	animate();
	status=-1;
    }
}

var clearReact = function(){
    if( status != 0 ){
	window.cancelAnimationFrame( requestID );
    }
    status=0;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    xcoor=canvas.width/2;
    ycoor=canvas.height/2;
    radius=10;
}

var btn2React = function(){
    if( status == 1 ){
	window.cancelAnimationFrame( requestID );
	status-=1;
    }
    else{
	clearReact();
	animate2();
	status=1;
    }
}

btn.addEventListener("click", btnReact);
clear.addEventListener("click", clearReact);
btn2.addEventListener("click", btn2React);

