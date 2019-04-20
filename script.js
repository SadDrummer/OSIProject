class iconPC{

	constructor(){
		this.id = 0;
		this.top = 0;
		this.bottom = 0;
		this.left = 0;
		this.right = 0;
	}

	fillInformation(elem)
	{
		var coord = elem.getBoundingClientRect();
		console.log(coord.top, coord.bottom, coord.left, coord.right);
		this.id = elem.id;
		this.top = [Math.round(coord.left + (coord.right - coord.left) / 2), coord.top];
		this.bottom = [Math.round(coord.left + (coord.right - coord.left) / 2), coord.bottom];
		this.left = [coord.left, Math.round(coord.top + (coord.bottom - coord.top) / 3)];
		this.right = [coord.right, Math.round(coord.top + (coord.bottom - coord.top) / 3)];
	}

	viewInformation()
	{
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

function createPCIcons()
{
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
		gameZone.appendChild(icon);
	}
}

function fillArrayOfPC()
{
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