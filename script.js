class iconPC{

	constructor(){
		this.id = 0;
		this.top = 0;
		this.bottom = 0;
		this.left = 0;
		this.right = 0;
		this.element;
	}

	fillInformation(elem){
		var coord = elem.getBoundingClientRect();
		console.log(coord.top, coord.bottom, coord.left, coord.right);
		this.id = elem.id;
		this.top = [Math.round(coord.left + (coord.right - coord.left) / 2), coord.top];
		this.bottom = [Math.round(coord.left + (coord.right - coord.left) / 2), coord.bottom];
		this.left = [coord.left, Math.round(coord.top + (coord.bottom - coord.top) / 3)];
		this.right = [coord.right, Math.round(coord.top + (coord.bottom - coord.top) / 3)];
		this.element = elem;
	}

	viewInformation(){
		console.log(this.id + "\n");
		console.log(this.top + "\n");
		console.log(this.bottom + "\n");
		console.log(this.left + "\n");
		console.log(this.right + "\n");
	}
}

var listOfClassPC = [];
var listOfLines = [];
createPCIcons();
fillArrayOfPC();

function createPCIcons(){
	var gameZone = document.getElementById("gameZone");
	for (var i = 1; i <= 7; i++) {
		var icon = document.createElement("img");
		icon.setAttribute("src", "images/grey.png");
		icon.setAttribute("class", "iconPC");
		icon.setAttribute("id", i);
		icon.setAttribute("alt", "grey");
		icon.style.width = 100 + "px";
		icon.style.height = 80 + "px";
		icon.style.marginTop = randomTop() + "px";
		icon.style.marginLeft = randomLeft() + "px";
		icon.onclick = selectOrUnselectIcon;
		icon.onmouseover = colorOrUncolorIcon;
		icon.onmouseout = colorOrUncolorIcon;
		gameZone.appendChild(icon);
	}
}

function fillArrayOfPC(){
	var arrayOfIcon = document.getElementsByClassName("iconPC");
	for (var i = 0; i < arrayOfIcon.length; i++) {
		var tempPC = new iconPC();
		tempPC.fillInformation(arrayOfIcon[i]);
		tempPC.viewInformation();
		listOfClassPC[i] = tempPC;
	}
}

function randomTop(){
	var rand = Math.random() * 421;
	rand = Math.floor(rand);
	return rand;
}

function randomLeft(){
	var rand = Math.random() * 861;
	rand = Math.floor(rand);
	return rand;
}

var previousSelectedIcon = 0;

function colorOrUncolorIcon(){
	switch (this.src) {
		case "file:///D:/Web/OSIProject/images/grey.png":
			this.src = "images/greylight.png";
			break;
		case "file:///D:/Web/OSIProject/images/greylight.png":
			this.src = "images/grey.png";
			break;
		case "file:///D:/Web/OSIProject/images/blue.png":
			this.src = "images/bluelight.png";
			break;
		case "file:///D:/Web/OSIProject/images/bluelight.png":
			this.src = "images/blue.png";
			break;
	}
}

function selectOrUnselectIcon(){
	if (previousSelectedIcon == 0) { previousSelectedIcon = this; }

	if (this.src == "file:///D:/Web/OSIProject/images/greylight.png") { this.src = "images/bluelight.png"; return; }

	if (this.src == "file:///D:/Web/OSIProject/images/bluelight.png") { this.src = "images/greylight.png"; return; }


	//alert(listOfClassPC[previousSelectedIcon.id - 1].id);
}

function fillTwoIcon(){
	//
}
