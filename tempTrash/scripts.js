document.addEventListener("DOMContentLoaded", ready);

var trigA = false, trigB = false;

function ready()
{
	var listOfPC = document.getElementsByClassName("PC");
	listOfPC[0].addEventListener("onkeypress", { } );
	listOfPC[1].addEventListener("onkeypress", { } );
}

function connect(){
	var listOfPC = document.getElementsByClassName("PC");
	var arrIcon = new Array(listOfPC.length);
	for (var i = 0; i < listOfPC.length; i++) {
		var coordinate = listOfPC[i].getBoundingClientRect();
		arrIcon[i] = new createListOfIcon(listOfPC[i].id, coordinate.top, coordinate.bottom, coordinate.left, coordinate.right);
	}
	var line = document.createElement("hr");
	var info = new Array(4);
	info = pifagor(arrIcon[0], arrIcon[1]);
	line.style.top = info[0] +"px";
	line.style.left = info[1] + "px";
	line.style.width = info[2] + "px";
	line.style.transform = "rotate(" + info[3] + "deg)";
	document.body.appendChild(line);
}

function unconnect(){
	var line = document.getElementsByTagName("hr");
	if (line.length) { document.body.removeChild(line[0]); }
}

function proverka(type)
{
	if (type == 1) { trigA ? trigA = false : trigA = true; }
	if (type == 2) { trigB ? trigB = false : trigB = true; }
	if (trigA && trigB) { connect(); }
	if (!trigA || !trigB) { unconnect(); }
}

function pifagor(elem1, elem2)
{
	var top = (elem1.bottom - elem1.top) / 3 + elem1.top;
	var left = elem1.right + 3;
	var lenX = elem2.left - elem1.right;
	var lenY = elem2.top - elem1.top;
	var width = Math.sqrt(lenX * lenX + lenY * lenY);
	var deg = Math.atan(lenY / lenX);
	var info = new Array(4);
	info[0] = top + width / 2 * Math.sin(deg) - 11;
	info[1] = left - (width / 2 - width / 2 * Math.cos(deg));
	info[2] = width - 10;
	info[3] = deg / Math.PI * 180;
	return info;
}

function createListOfIcon(id, top, bottom, left, right)
{
	this.id = id;
	this.top = top;
	this.bottom = bottom;
	this.left = left;
	this.right = right;
}

function colorOver(elem)
{
	if (elem.src == "file:///D:/Web/OSI/photo/blue.png")
	{
		elem.src="photo/bluelight.png";
		return;
	}
	if (elem.src == "file:///D:/Web/OSI/photo/grey.png")
	{
		elem.src="photo/light.png";
		return;
	}
}

function colorOut(elem)
{
	if (elem.src == "file:///D:/Web/OSI/photo/bluelight.png")
	{
		elem.src="photo/blue.png";
		return;
	}
	if (elem.src == "file:///D:/Web/OSI/photo/light.png")
	{
		elem.src="photo/grey.png";
		return;
	}
}

function make_red(code)
{
	if (code == 53)
	{
		var list = document.getElementsByClassName("PC");
		list[0].src = "photo/red.png";
		list[1].src = "photo/red.png";
		var lines = document.getElementsByTagName("hr");
		lines[0].style.backgroundColor = "#FF0000";
		lines[0].style.borderColor = "#FF0000";
	}
}

function make_green()
{
	var list = document.getElementsByClassName("PC");
	list[0].src = "photo/green.png";
	list[1].src = "photo/green.png";
	var lines = document.getElementsByTagName("hr");
	lines[0].style.backgroundColor = "#00DD00";
	lines[0].style.borderColor = "#00DD00";
	achievements();
}

function achievements()
{
	var img = document.createElement("img");
	img.src = "photo/achCircle.png";
	img.style.position = "absolute";
	img.style.left = "1500px";
	img.style.top = "30px";
	document.body.appendChild(img);
	setTimeout(function () { img.parentNode.removeChild(img); }, 7000);
}

function clickIcon(elem)
{
	if(elem.id == 1)
	{
		proverka(1);
	}
	if(elem.id == 2)
	{
		proverka(2);
	}
	if (elem.src == "file:///D:/Web/OSI/photo/bluelight.png")
	{
		elem.src="photo/light.png";
		return;
	}
	if (elem.src == "file:///D:/Web/OSI/photo/light.png")
	{
		elem.src="photo/bluelight.png";
		return;
	}
}

function spawnQuestion(){
	var checkBox = document.getElementById("questBox");
	if (checkBox == null)
	{
		var questBox = document.createElement("div");
		var questBut = document.getElementById("question");
		var pozitionQuestBut = questBut.getBoundingClientRect();
		questBox.id = "questBox";
		questBox.style.top = questBut.getBoundingClientRect().top - 179 + "px";
		questBox.style.left = questBut.getBoundingClientRect().left - 130 + "px";
		var statsBar = document.getElementsByClassName("statsBar");
		statsBar[0].appendChild(questBox);
		questBox.innerHTML = "Здесь будет подсказка jfgnjsfngodasdadasd ndfgsndfgnd sfgknddjfngn gnfjdldkss jfgnjsfngo ndfgsndfgnd sfgknddjfngn gnfjdldkss jfgnjsfngo ndfgsndfgnd sfgk";

		var exit = document.createElement("div");
		exit.id = "exitQuest";
		exit.style.top = questBut.getBoundingClientRect().top - 169 + "px";
		exit.style.left = questBut.getBoundingClientRect().left + 146 + "px";
		exit.innerHTML = "x";
		exit.setAttribute("onclick", "closeQuestion()");
		statsBar[0].appendChild(exit);
	}
}

function closeQuestion()
{
	var statsBar = document.getElementsByClassName("statsBar");	
	statsBar[0].removeChild(document.getElementById("questBox"));
	statsBar[0].removeChild(document.getElementById("exitQuest"));
}