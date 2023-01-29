window.addEventListener('load', function() {

	var elements = document.getElementsByClassName("artwork");

	for (var i = 0; i < elements.length; i++) {
	    elements[i].addEventListener('click', getArtwork, false);
	}

	function getArtwork() {
	    var which = this.getAttribute("data-which");

	    var data = {
	    	img: which,
	    }

	    socket.emit("swapArtMsg", data);

	};

	socket.on('swapArt', updateStage);

	function updateStage(data) {
		document.getElementById("stage").innerHTML = "";
		document.getElementById("stage").innerHTML = data.img;
	}

});


let myPath = window.location.pathname;
let myColor = "magenta";
let otherColor = "cyan";

if(myPath.includes('follow')) {

	myColor = "cyan";
	otherColor = "magenta";

}

let socket = io();

//Listen for confirmation of connection
socket.on('connect', function() {

    console.log("Connected");
});

function setup() {
	createCanvas(300,300);
	background(51);


	//socket = io.connect('http://localhost:3000');
	socket.on('mouse', newDrawing);


}

function newDrawing(data) {
	noStroke();
	fill(myColor);
	ellipse(data.x, data.y, 60, 60);
}

function mouseDragged() {

	var data = {
		x: mouseX,
		y: mouseY
	}
	socket.emit('mouse', data);


	noStroke();
	fill(otherColor);
	ellipse(mouseX, mouseY, 60, 60);
}

function draw() {
	

}














