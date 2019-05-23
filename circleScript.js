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
	[200, 360, 450, 280, 690, 220, 740, 20, 440, 80, 100, 0, 0, 220],
	[860, 150, 600, 200, 360, 100, 150, 130, 20, 350, 340, 350, 700, 420],
	[0, 400, 80, 220, 0, 0, 390, 100, 800, 200, 600, 400, 320, 340]
]

const numberOfIcons = 7;
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
	var src = this.src;
	if (src.indexOf("images/grey.png") != -1) { this.src = "images/greylight.png"; return; }
	if (src.indexOf("images/greylight.png") != -1) { this.src = "images/grey.png"; return; }
	if (src.indexOf("images/blue.png") != -1) { this.src = "images/bluelight.png"; return; }
	if (src.indexOf("images/bluelight.png") != -1) { this.src = "images/blue.png"; return; }
}

function changeColorOnClick(elem){
	var src = elem.src;
	if (src.indexOf("images/greylight.png") != -1) { elem.src = "images/bluelight.png"; return; }
	if (src.indexOf("images/blue.png") != -1) { elem.src = "images/grey.png"; return; }
	if (src.indexOf("images/bluelight.png") != -1) { elem.src = "images/greylight.png"; return; }
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
	if (undo.src.indexOf("undolight.png") != -1) { undo.src = "images/undo.png"; return; }
	if (undo.src.indexOf("undo.png") != -1) { undo.src = "images/undolight.png"; return; }
}

function checkPairInListOfLines(str, i = 1){
	var isNumberInStr = true;
	if (i < 8) {
		console.log("in check: " + str);
		if (str.split(i).length > 2) { return checkPairInListOfLines(str, ++i); }
		else return isNumberInStr = false;
	} else return isNumberInStr;
}

function checkCompletenessOfScheme(){
	var fullStrOfLine = "";
	for (var i = 0; i < listOfLines.length; ++i) { fullStrOfLine += listOfLines[i]; }
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
		var numbers = new Array(numberOfIcons);
		var fullStrOfLine = "";
		for (var i = 0; i < listOfLines.length; ++i) { fullStrOfLine += listOfLines[i]; }
		var summOfNumbers = 0;
		for (var i = 0; i < numberOfIcons; ++i){
			numbers[i] = fullStrOfLine.split(i + 1).length - 1;
			summOfNumbers += numbers[i];
		}
		if(summOfNumbers == numberOfIcons * 2){
			alert("Поздравляю, Вы правильно выполнили задание!");
			var lines = document.getElementsByClassName("linePair");
			for (var i = 0; i < lines.length; ++i) lines[i].style.backgroundColor = "lime";
		} else{
			iMax = (summOfNumbers - numberOfIcons * 2) / 2;
			for (var i = 0; i < iMax; ++i){
				var idLine = "";
				var k = getNumbMoreThen2(numbers);
				numbers[k] -= 1;
				idLine += k + 1;
				k = getNumbMoreThen2(numbers, ++k);
				numbers[k] -= 1;
				idLine += k + 1;
				document.getElementById(idLine).style.backgroundColor = "red";
				var butt = document.getElementById("checkButton");
				butt.id = "checkBadButton";
				butt.innerHTML = "Повторить";
			}
		}
		return;
	}
	if (document.getElementById("checkBadButton") != null){
		var butt = document.getElementById("checkBadButton");
		butt.innerHTML = "Проверить";
		butt.id = "checkNoButton";
		++tryingNumb;
		if (tryingNumb == 3) tryingNumb -= 3;
		var gameZone = document.getElementById("gameZone");
		while (gameZone.firstChild) { gameZone.removeChild(gameZone.firstChild); }
		listOfLines.splice(0, listOfLines.length);
		listOfClassPC.splice(0, listOfClassPC.length);
		previousSelectedIcon = 0;
		createPCIcons();
		fillArrayOfPC();
	}
}