class iconPC{

	constructor(){
		this.id = 0;
		this.top = 0;		//format coordinates [x,y]
		this.bottom = 0;	
		this.left = 0;
		this.right = 0;
		this.center = 0;
		this.icon = 0;
	}

	fillInformation(elem){
		var coord = elem.getBoundingClientRect();
		this.id = elem.id;
		this.top = [Math.round(coord.left + (coord.right - coord.left) / 2), coord.top];
		this.bottom = [Math.round(coord.left + (coord.right - coord.left) / 2), coord.bottom];
		this.left = [coord.left, Math.round(coord.top + (coord.bottom - coord.top) / 3)];
		this.right = [coord.right, Math.round(coord.top + (coord.bottom - coord.top) / 3)];
		this.center = [this.top[0], this.left[1]];
		this.icon = elem;
	}

	viewInformation(){
		console.log(this.id + "\n");
		console.log(this.top + "\n");
		console.log(this.bottom + "\n");
		console.log(this.left + "\n");
		console.log(this.right + "\n");
		console.log(this.center + "\n");
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
		icon.setAttribute("alt", "iconPC");
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

function changeColorOnClick(elem){
	switch (elem.src){
		case "file:///D:/Web/OSIProject/images/greylight.png":
			elem.src = "images/bluelight.png";
			break;
		case "file:///D:/Web/OSIProject/images/blue.png":
			elem.src = "images/grey.png";
			break;
		case "file:///D:/Web/OSIProject/images/bluelight.png":
			elem.src = "images/greylight.png";
			break;
	}
}

var previousSelectedIcon = 0;

function selectOrUnselectIcon(){
	if (previousSelectedIcon == 0){
		previousSelectedIcon = this;
		changeColorOnClick(this);
	} else {
		if (previousSelectedIcon.id == this.id){
			previousSelectedIcon = 0;
			changeColorOnClick(this);
		} else {
			connectTwoIcon(previousSelectedIcon, this);
			changeColorOnClick(previousSelectedIcon);
			previousSelectedIcon = 0;
		}
	}
}

function checkShortLine(classPC1, classPC2){
	var quarter;
	if (classPC1.top[1] >= classPC2.top[1]) {
		if (classPC1.left[0] <= classPC2.left[0]) { quarter = 1; }
		else quarter = 2;
	}
	else{
		if (classPC1.left[0] <= classPC2.left[0]) { quarter = 4; }
		else quarter = 3;
	}
	var paramsForLine = [];
	switch (quarter) {
		case 1:
			( classPC2.center[0] - classPC1.center[0] > classPC1.center[1] - classPC2.center[1] ) ? ( paramsForLine = pythagoras(classPC1.right, classPC2.left) ) : ( paramsForLine = pythagoras(classPC1.top, classPC2.bottom) );
			break;
		case 2:
			( classPC1.center[0] - classPC2.center[0] > classPC1.center[1] - classPC2.center[1] ) ? ( paramsForLine = pythagoras(classPC1.left, classPC2.right) ) : ( paramsForLine = pythagoras(classPC1.top, classPC2.bottom) );
			break;
		case 3:
			( classPC1.center[0] - classPC2.center[0] > classPC2.center[1] - classPC1.center[1] ) ? ( paramsForLine = pythagoras(classPC1.left, classPC2.right) ) : ( paramsForLine = pythagoras(classPC1.bottom, classPC2.top) );
			break;
		case 4:
			( classPC2.center[0] - classPC1.center[0] > classPC2.center[1] - classPC1.center[1] ) ? ( paramsForLine = pythagoras(classPC1.right, classPC2.left) ) : ( paramsForLine = pythagoras(classPC1.bottom, classPC2.top) );
			break;
	}
}

function pythagoras(coord1, coord2){
	 
}

function connectTwoIcon(elem1, elem2){
	var strIdLine;
	var element1, element2;
	if (elem1.id < elem2.id) {
		strIdLine = elem1.id + "" + elem2.id;
		element1 = elem1;
		element2 = elem2;
	}
	else{
		strIdLine = elem2.id + "" + elem1.id;
		element1 = elem2;
		element2 = elem1;
	}
	for (var i = 0; i < listOfLines.length; ++i){ if (strIdLine == listOfLines[i]) return; }
	listOfLines[listOfLines.length] = strIdLine;
	checkShortLine(listOfClassPC[element1.id - 1], listOfClassPC[element2.id - 1]);
	/*var line = document.createElement("hr");
	line.setAttribute("class", "linePair");
	line.setAttribute("id", strIdLine);
	document.getElementById("gameZone").appendChild(line);	//need add pifagor
	console.log(listOfLines);*/
}
