var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");

var btn = document.getElementById("stop");

var radius = 10;
var x = canvas.width/2;
var y = canvas.height/2;
var requestID;
var status = -1;
var dfactor=1;

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

animate();

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

btn.addEventListener("click", btnReact);

