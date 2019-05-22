class iconPC{
	constructor(){
		this.id = 0;
		this.top = 0;		//format coordinates [x,y]
		this.bottom = 0;	
		this.left = 0;
		this.right = 0;
		this.center = 0;
	}
	fillInformation(elem){
		var coord = elem.getBoundingClientRect();
		this.id = elem.id;
		this.top = [Math.round(coord.left + (coord.right - coord.left) / 2), coord.top - 2];		//+-2 - some "border" around icons
		this.bottom = [Math.round(coord.left + (coord.right - coord.left) / 2), coord.bottom + 2];
		this.left = [coord.left - 2, Math.round(coord.top + (coord.bottom - coord.top) / 3)];
		this.right = [coord.right + 2, Math.round(coord.top + (coord.bottom - coord.top) / 3)];
		this.center = [this.top[0], this.left[1]];
	}
}

var pseudoRandom = [ 
	[0, 220, 200, 360, 440, 80, 690, 220],
	[150, 130, 340, 350, 600, 200, 860, 150]
]

const numberOfIcons = 4;
var tryingNumb = 0;
var listOfClassPC = [];
var listOfLines = [];
var previousSelectedIcon = 0;

var undo = document.getElementById("undoImg");
undo.addEventListener("click", function(){
	if (listOfLines.length) { addOrRemoveListOfLines(false); }
});
var checkBut;

createPCIcons();
fillArrayOfPC();

function createPCIcons(){
	var gameZone = document.getElementById("gameZone");
	for (var i = 1; i <= numberOfIcons; i++) {
		var icon = document.createElement("img");
		icon.setAttribute("src", "images/grey.png");
		icon.setAttribute("class", "iconPC");
		icon.setAttribute("id", i);
		icon.setAttribute("alt", "iconPC");
		icon.style.width = 100 + "px";
		icon.style.height = 80 + "px";
		icon.style.marginTop = randomTop(i - 1) + "px";
		icon.style.marginLeft = randomLeft(i - 1) + "px";
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

function randomTop(i){
	return pseudoRandom[tryingNumb][i * 2 + 1];
}

function randomLeft(i){
	return pseudoRandom[tryingNumb][i * 2];
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
	var infoForLine = [];
	switch (quarter) {
		case 1:
			( classPC2.center[0] - classPC1.center[0] > classPC1.center[1] - classPC2.center[1] ) ? ( infoForLine = pythagoras(classPC1.right, classPC2.left) ) : ( infoForLine = pythagoras(classPC1.top, classPC2.bottom) );
			break;
		case 2:
			( classPC1.center[0] - classPC2.center[0] > classPC1.center[1] - classPC2.center[1] ) ? ( infoForLine = pythagoras(classPC1.left, classPC2.right, true) ) : ( infoForLine = pythagoras(classPC1.top, classPC2.bottom, true) );
			break;
		case 3:
			( classPC1.center[0] - classPC2.center[0] > classPC2.center[1] - classPC1.center[1] ) ? ( infoForLine = pythagoras(classPC1.left, classPC2.right, true) ) : ( infoForLine = pythagoras(classPC1.bottom, classPC2.top, true) );
			break;
		case 4:
			( classPC2.center[0] - classPC1.center[0] > classPC2.center[1] - classPC1.center[1] ) ? ( infoForLine = pythagoras(classPC1.right, classPC2.left) ) : ( infoForLine = pythagoras(classPC1.bottom, classPC2.top) );
			break;
	}
	return infoForLine;
}

function pythagoras(coord1, coord2, needAdd180deg = 0){
	var infoForLine = [];
	var lenX = coord1[0] - coord2[0];
	var lenY = coord1[1] - coord2[1];
	var width = Math.sqrt(lenX * lenX + lenY * lenY);
	var degrees = Math.atan(lenY / lenX) / Math.PI * 180;
	if (needAdd180deg) { degrees += 180; }
	infoForLine[0] = coord1[0];
	infoForLine[1] = coord1[1] - 10; //10 - fix "bag" with top and it's more beautiful with left/right
	infoForLine[2] = width;
	infoForLine[3] = degrees;
	return infoForLine;
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
	addOrRemoveListOfLines(true, strIdLine);
	var infoForLine = checkShortLine(listOfClassPC[element1.id - 1], listOfClassPC[element2.id - 1]);
	var line = document.createElement("hr");
	line.setAttribute("class", "linePair");
	line.setAttribute("id", strIdLine);
	line.style.left = infoForLine[0] + "px";
	line.style.top = infoForLine[1] + "px";
	line.style.width = infoForLine[2] + "px";
	line.style.transform = "rotate(" + infoForLine[3] + "deg)";
	document.getElementById("gameZone").appendChild(line);
	console.log(listOfLines);
}

function addOrRemoveListOfLines(isAdd, id = ""){
	if(isAdd) {
		if (listOfLines.length == 0) { undo.src = "images/undo.png"; }
		listOfLines[listOfLines.length] = id;
	} else {
		var parent = document.getElementById("gameZone");
		var line = document.getElementById(listOfLines[listOfLines.length - 1]);
		parent.removeChild(line);
		listOfLines.splice(listOfLines.length - 1, 1);
		if (listOfLines.length == 0) { undo.src = "images/undogrey.png"; }
	}
	checkCompletenessOfScheme();
}

function changeUndoColor(){
	if (undo.src == "file:///D:/Web/OSIProject/images/undolight.png") { undo.src = "images/undo.png"; return; }
	if (undo.src == "file:///D:/Web/OSIProject/images/undo.png") { undo.src = "images/undolight.png"; return; }
}

function checkPairInListOfLines(str){
	var isFull = true;
	for (var i = 0; i < numberOfIcons; ++i){
		if (str.indexOf(i + 1 + "") == -1) { isFull = false; break; }
	}
	return isFull;
}

function checkCompletenessOfScheme(){
	var fullStrOfLine = "";
	for (var i = 0; i < listOfLines.length; ++i) { fullStrOfLine += listOfLines[i]; }
	console.log("iz check");
	if (checkPairInListOfLines(fullStrOfLine)) {
		var check = document.getElementById("checkNoButton");
		if (check != null) check.id = "checkButton";
	}
	else { 
		var check = document.getElementById("checkButton");
		if (check != null) check.id = "checkNoButton";
	}
	
}

function getNumbMoreThen2(numbers, i = 0){
	for (i; i < numberOfIcons; ++i){
		if (numbers[i] > 2) return i;
	}
}

function algoCheck(){
	if(document.getElementById("checkButton") != null){
		if(listOfLines.length == 3){
			alert("Поздравляю, Вы правильно выполнили задание!");
			var lines = document.getElementsByClassName("linePair");
			for (var i = 0; i < lines.length; ++i) lines[i].style.backgroundColor = "lime";
		} else{
			var badLines = ["13", "14", "24"];		//this is very bad algorythm. If ++numberOfIcons ...
			for (var i = 0; i < badLines.length; ++i){
				var badL = document.getElementById(badLines[i]);
				if (badL != null){ badL.style.backgroundColor = "red"; }
			}
			var butt = document.getElementById("checkButton");
			butt.id = "checkBadButton";
			butt.innerHTML = "Повторить";
		}
		return;
	}
	if (document.getElementById("checkBadButton") != null){
		var butt = document.getElementById("checkBadButton");
		butt.innerHTML = "Проверить";
		butt.id = "checkNoButton";
		++tryingNumb;
		if (tryingNumb == 2) tryingNumb -= 2;
		var gameZone = document.getElementById("gameZone");
		while (gameZone.firstChild) { gameZone.removeChild(gameZone.firstChild); }
		listOfLines.splice(0, listOfLines.length);
		listOfClassPC.splice(0, listOfClassPC.length);
		previousSelectedIcon = 0;
		createPCIcons();
		fillArrayOfPC();

	}
}