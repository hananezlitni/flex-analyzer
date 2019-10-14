var numC = 0;			// Number of tasks
var numS = 0;			// Number of servers
var active = [-1, -1];	// Holds selected task/server pair. -1 if none
var line = [];			// Container for line objects
line[0] = [];
var stickyC = false;
var stickyS = false;

var circle = [];		// Holds circle/task objects
var rect = [];			// Holds rect/server objects
var ltext = [];			// Holds task numbers
var rtext = [];			// Holds server numbers

var order = [];
order[0] = [];		// order of servers display
order[1] = [];		// order of tasks display

var L_OFFSET = 570;		// Left offset Canvas
var T_OFFSET = 41;		// Top offset Canvas
var MARGIN = 50;		// Margin between rows
var C_OFFSET = 50;		// Circle offset
var R_OFFSET = 400;		// Rect offset

var paper;
var p_height = 1;
var P_WIDTH = 500;

// Initiates Canvas
// Sets default canvas size, then adds default number of servers and tasks
// C,S - integers specifying default servers and tasks

function initCanvas(C, S, fVector) {
	//Reset all variables
	numC = 0;			// Number of tasks
	numS = 0;			// Number of servers
	active = [-1, -1];	// Holds selected task/server pair. -1 if none
	line = [];			// Container for line objects
	line[0] = [];
	stickyC = false;
	stickyS = false;

	circle = [];		// Holds circle/task objects
	rect = [];			// Holds rect/server objects
	ltext = [];			// Holds task numbers
	rtext = [];			// Holds server numbers

	order = [];
	order[0] = [];		// order of servers display
	order[1] = [];		// order of tasks display

	L_OFFSET = 570;		// Left offset Canvas
	T_OFFSET = 41;		// Top offset Canvas
	MARGIN = 50;		// Margin between rows
	C_OFFSET = 50;		// Circle offset
	R_OFFSET = 400;		// Rect offset

	paper;
	p_height = 1;
	P_WIDTH = 500;

	//Initialize canvas
	paper = Raphael("figure", P_WIDTH, p_height);
	for (var i = 0; i < C; i++){
		addTask();
	}
	for (var i = 0; i < S; i++){
		addServer();
	}

	generateSkills(fVector)
}

function generateSkills(fVector) {
	var server = 0
	var task = 0

	for (server = 0; server < fVector.length; server++) {
		for (task = 0; task < fVector[0].length; task++) {
			if (fVector[server][task] === "1") {
				drawLine(server + 1, task + 1)
			} else {
				continue
			}
		}
	}
}

// Adds a task to the first available physical space on the canvas
// A task comprises of a circle, a rate, and a label for each.
function addTask() {
	// Increase count
	numC++;
	var id = numC;
	// Add to order
	var searching = true;
	var pos = 1;
	while (searching) {
		for (var j = 1; j <= numC + 1; j++) {
			if (order[1][j] == pos) {
				pos++;
				break;
			} else if (j == numC + 1) {
				searching = false;
			}
		}
	}
	order[1][id] = pos;
	
	// Make circle
	circle[numC] = paper.circle(C_OFFSET, 25 + MARGIN * (order[1][id] - 1), 20);
	circle[numC].attr("fill", "#dddddd");
	circle[numC].node.onmouseover = function() {
		this.style.cursor = "pointer";
	}

	// Check paper size
	if (25 + MARGIN * (order[1][id] - 1) + 200 > p_height) {
		p_height += 200;
		paper.setSize(P_WIDTH, p_height);
	}
	
	// Add text
	ltext[numC] = (paper.text(10, 25 + MARGIN * (order[1][id] - 1), numC).attr("font-size","20")).attr("fill","#2bafec");
	// Set of containers for lines
	//for (var i = 1; i <= numS; i++)*****************
		//line[i][numC] = []; ************************
	// Onclick function
	circle[numC].click(function(evt) {
	
		if ((evt.ctrlKey || evt.shiftKey) && (active[0] != -1)) {
			stickyS = true;
		} else {
			stickyC = false;
			stickyS = false;
		} 
		
		//alert(sticky);
		
		if (active[1] != id) {
			// If not selected, select it
			circle[id].attr("fill","#2bafec");
			// If something else was selected, unselect it
			if (active[1] > -1) {
				circle[active[1]].attr("fill","#dddddd");
			}
			// Update currently selected task
			active[1] = id;
			// Check if selecting the task connects two points
			checkLine();
		} else {
			// If this was selected, make it blue and clear it
			circle[id].attr("fill","#dddddd");
			active[1] = -1;
		}
	});
}

// Function for adding a server to the system
// Server consists of a square, one rate for each task, and labels
function addServer() {
	// Increase count
	numS++;
	var id = numS;
	// Add to order
	var searching = true;
	var pos = 1;
	while (searching) {
		for (var i = 1; i <= numS + 1; i++) {
			if (order[0][i] == pos) {
				pos++;
				break;
			} else if (i == numS + 1) {
				searching = false;
			}
		}
	}
	order[0][id] = pos;
	
	// Make rect
	rect[numS] = paper.rect(R_OFFSET, 8 + MARGIN * (order[0][numS] - 1), 40, 40, 4);
	rect[numS].attr("fill", "#dddddd");
	rect[numS].node.onmouseover = function() {
		this.style.cursor = "pointer";
	}
	// Check paper size
	if (25 + MARGIN * (order[0][numS] - 1) + 200 > p_height) {
		p_height += 200;
		paper.setSize(P_WIDTH, p_height);
	}
	// Add text
	rtext[numS] = (paper.text(460, 25 + MARGIN * (order[0][numS] - 1), id).attr("font-size", "20")).attr("fill","#2bafec");
	// Add line container for server
	line[numS] = [];
	// Onclick function
	rect[numS].click(function(evt) {
	
		if ((evt.ctrlKey || evt.shiftKey) && (active[1] != -1)) {
			stickyC = true;
		} else {
			stickyC = false;
			stickyS = false;			
		}
	
		if (active[0] != id) {
			// If not selected, make it turquoise
			rect[id].attr("fill","#2bafec");
			// Unselect anything else
			if (active[0] > -1) {
				rect[active[0]].attr("fill","#dddddd");
			}
			// Set active server
			active[0] = id;
			// Check connection
			checkLine();
		} else {
			// clear selection
			rect[id].attr("fill","#dddddd");
			active[0] = -1;
		}
	});
	/*for (var j = 1; j <= numC; j++) {
		insertForm("isTrained", id, j);
		insertForm("serverRate", id, j);
	}*/
}

// If there is no line between S and C, draw a line using checkLine
// S, C denote server and task number
function drawLine (S, C) {
	if (line[S][C] != undefined)
		return true;
	active[0] = S;
	active[1] = C;
	checkLine();
	active[0] = -S;
	active[1] = -C;
}

// If there is a line between S and C, remove a line using checkLine
// S, C denote server and task number
function remLine (S, C) {
	if (line[S][C] == undefined)
		return true;
	active[0] = S;
	active[1] = C;
	checkLine();
	active[0] = -S;
	active[1] = -C;
}

// Checks if both a server and a task are selected.
// If so, toggle the line between them.
function checkLine() {
	var S = active[0];	// Active server
	var C = active[1];	// Active task

	// Get co-ordinates of nodes
	var x1 = xof("S", S);
	var x2 = xof("C", C);
	var y1 = yof("S", S);
	var y2 = yof("C", C);
	
	// If both are active
	if (S != -1 && C != -1) {
		// No line, draw line
		if (line[S][C] == undefined) {
			line[S][C] = paper.path("M"+x1+","+y1+"L"+x2+","+y2);
			line[S][C].attr("stroke-width","2");
			line[S][C].attr("stroke","#2bafec");
		} else {
			// Line, remove line
			line[S][C].remove();
			line[S][C] = undefined;
		}
		// Reset the active task/servers
		//alert(sticky);
		if (!stickyS) {
			active[0] = -1;
			rect[S].attr("fill","#dddddd");
		}
		if (!stickyC) {
			active[1] = -1;
			circle[C].attr("fill","#dddddd");
		}
		// Reset their colours
	}
}

// Returns x value of specified node of type, num
// Type is a character, "C" for task, "S" for server
// num is the relevant node number
function xof(type, num) {
	if (type == "C" && num > -1) {
		return circle[num].attr('cx') + circle[num].attr('r');
	} else if (type == "S" && num > -1) {
		return rect[num].attr('x');
	} else {
		return false;
	}
}

// Returns y value of specified node of type, num
// Type is a character, "C" for task, "S" for server
// num is the relevant node number
function yof(type, num) {
	if (type == "C" && num > -1) {
		return circle[num].attr('cy');
	} else if (type == "S" && num > -1) {
		return rect[num].attr('y') + 0.5 * rect[num].attr('height');
	} else {
		return false;
	}
}

// Hides object of id name
function hide (name) {
	document.getElementById(name).style.display = "none";
}

// Remove slected task by shifting everything up one numerically
// and then removing the last task.
function remTask() {
	
	// Set n to selected task
	var n = active[1];
	resetActive();
	// If no task is selected
	if (n < 1) {
		alert ("No tasks selected.");
		return true;
	}
	
	var temp_order = order[1].slice();
	
	for (var j = n; j < numC; j++) {
		// Shift task rates up
		var next = "taskRate[" + (j + 1) + "]";
		setVal ("C", document.forms["LP"].elements[next].value, i, j);
		for (var i = 1; i <= numS; i++) {
			// Shift server rate left
			var next = "serverRate[" + i + "][" + (j + 1) + "]";
			setVal ("S", document.forms["LP"].elements[next].value, i, j);
			// Shift training up
			var next = "isTrained[" + i + "][" + (j + 1) + "]";
			setVal ("T", document.forms["LP"].elements[next].value, i, j);
		}
		var dir = temp_order[j+1] - order[1][j];
		moveNode (dir, j, 1, false);
	}
	
	// Remove last task
	remLastTask();
}

// Remove last (by numerical) task
function remLastTask() {
	if (numC < 1)
		return true;
	
	// Remove task
	circle[numC].remove();
	ltext[numC].remove();
	document.getElementById("dynamicForm").removeChild(document.getElementById("taskRate_div_n_" + numC));
	document.getElementById("dynamicForm").removeChild(document.getElementById("taskRate_span_n_" + numC));
	
	// Remove server rates relating to task
	for (var i = 1; i <= numS; i++) {
		document.getElementById("dynamicForm").removeChild(document.getElementById("isTrained_div_" + i + "_" + numC));
		document.getElementById("dynamicForm").removeChild(document.getElementById("serverRate_div_" + i + "_" + numC));
		document.getElementById("dynamicForm").removeChild(document.getElementById("serverRate_span_" + i + "_" + numC));

		// Remove relevant lines
		if (line[i][numC] != undefined) {
			line[i][numC].remove();
			line[i][numC] = undefined;
		}
	}
	
	// Reset if active
	resetActive();

	// Free order
	order[1].pop();
	
	numC--;
}

// Remove slected server by shifting everything up one numerically
// and then removing the last server.
function remServer() {

	// Set n to selected server
	n = active[0];
	resetActive();
	
	// If no server selected
	if (n < 1) {
		alert ("No server selected");
		return true;
	}
	
	var temp_order = order[0].slice();
	
	for (var i = n; i < numS; i++) {
		for (var j = 1; j <= numC; j++) {
			// Shift server rates up
			var next = "serverRate[" + (i + 1) + "][" + j + "]";
			setVal ("S", document.forms["LP"].elements[next].value, i, j);
			// Shift training up
			var next = "isTrained[" + (i + 1) + "][" + j + "]";
			setVal ("T", document.forms["LP"].elements[next].value, i, j);
		}
		var dir = temp_order[i+1] - order[0][i];
		moveNode (dir, i, 0, false);

	}
	
	// Remove last server
	remLastServer();
}

// Remove the last server
function remLastServer() {
	if (numS < 1)
		return true;
	
	// Remove task
	rect[numS].remove();
	rtext[numS].remove();
	
	// Remove server rates
	for (var j = 1; j <= numC; j++) {
		document.getElementById("dynamicForm").removeChild(document.getElementById("isTrained_div_" + numS + "_" + j));
		document.getElementById("dynamicForm").removeChild(document.getElementById("serverRate_div_" + numS + "_" + j));
		document.getElementById("dynamicForm").removeChild(document.getElementById("serverRate_span_" + numS + "_" + j));
		
		// Remove relevant lines
		if (line[numS][j] != undefined) {
			line[numS][j].remove();
			line[numS][j] = undefined;
		}
	}
	
	
	// Reset if active
	resetActive();

	// Free order
	order[0].pop();
	
	numS--;
}

// Sets the value of server, task, or training to value v
// type is serverRate, isTrained, or taskRate.
// i is server number, j is task number
function setVal(type, v, i, j) {
	//alert (type + " " + v + " " + i + " " + j);
	switch (type) {
		case "S":
			var name = "serverRate[" + i + "][" + j + "]";
			document.forms["LP"].elements[name].value = v;
			break;
		case "C":
			var name = "taskRate[" + j + "]";
			document.forms["LP"].elements[name].value = v;
			break;
		case "T":
			var name = "isTrained[" + i + "][" + j + "]";
			document.forms["LP"].elements[name].value = v;
			if (v == 1) {
				drawLine(i,j); 
			} else {
				remLine(i,j); 
			}
			break;
		default:
			//alert("Error: setVal(" + type + v + i + j + ")");
			break;
	}
}

// Function for the set value menu option.
// Type specifies the menu option, val specifies value, col specifies the location
function setCol (val, col, type) {
	var intreg = /^\d+$/;
	/*var val = document.getElementById('val1').value;
	var col = document.getElementById('col1').value;
	var type = document.getElementById('setting1').value;*/
	type = parseInt(type);
	
	if (isNaN(val) || val == "" || val < 0) {
		alert("Invalid value");
		return true;
	}
	
	if ((type == 2 || type == 3) && (!(intreg.test(col)) || col < 1 || col == "")) {
		alert("Invalid location");
		return true;
	}
	
	switch (type) {
		case 0:
			if(confirm("Are you sure you want to set all task rates to " + val + "?")) {
				for (var j = 1; j <= numC; j++) {
					setVal("C", val, -1, j);
				}
			}
			break;
		case 1:
			if(confirm("Are you sure you want to set all server rates to " + val + "?")) {
				for (var i = 1; i <= numS; i++) {
				for (var j = 1; j <= numC; j++) {
					setVal("S", val, i, j);
				}}
			}
			break;
		case 2:
			if (col > numC || col < 1) {
				alert("Location exceeds bounds");
				return true;
			}
			if(confirm("Are you sure you want to set all server rates in column " + col + " to " + val + "?")) {
				for (var i = 1; i <= numS; i++) {
					setVal("S", val, i, col);
				}
			}
			break;
		case 3:
			if (col > numS || col < 1) {
				alert("Location exceeds bounds");
				return true;
			}
			if(confirm("Are you sure you want to set all server rates in row " + col + " to " + val + "?")) {
				for (var j = 1; j <= numC; j++) {
					setVal("S", val, col, j);
				}
			}
			break;
		default:
			alert("No action");
			break;
	}
}


// As setCol but tailored for training matrix
function setTrain (val, col, type) {
	var intreg = /^\d+$/;
	var name = ["untrained", "trained"];
	/*var val = document.getElementById("val2").value;
	var col = document.getElementById("col2").value;
	var type = document.getElementById("setting2").value;*/
	type = parseInt(type);
	if ((!(intreg.test(col)) || col < 1 || col == "") && (type == 1 || type == 2)) {
		alert("Invalid location");
		return true;
	}
	switch (type) {
		case 0:
			if(confirm("Are you sure you want to all servers/tasks to " + name[val] + "?")) {
				for (var i = 1; i <= numS; i++) {
				for (var j = 1; j <= numC; j++) {
					setVal("T", val, i, j);
				}}
			}
			break;
		case 1:
			if (col > numS || col < 1) {
				alert("Location exceeds bounds");
				return true;
			}
			if(confirm("Are you sure you want to set server " + col + " to all " + name[val] + "?")) {
				for (var j = 1; j <= numC; j++) {
					setVal("T", val, col, j);
				}
			}
			break;
		case 2:
			if (col > numC || col < 1) {
				alert("Location exceeds bounds");
				return true;
			}
			if(confirm("Are you sure you want to set task " + col + " to all " + name[val] + "?")) {
				for (var i = 1; i <= numS; i++) {
					setVal("T", val, i, col);
				}
			}
			break;
		default:
			alert("No action");
			break;
	}
}

// Resets everything to the default.
function clearAll () {
	if(!confirm("Are you sure you want to clear?"))
		return true;
	while (numS > 0)
		remLastServer();
	while (numC > 0)
		remLastTask();
	for (var i = 1; i <=5; i++) {
		addTask();
		addServer();
	}
}

// Toggles greying out of buttons on menu.
function optionCheck(source) {
	var option = document.getElementById("setting"+source).value;
	if (option <= 2 - source) {
		document.getElementById("col"+source).disabled = true;
	} else {
		document.getElementById("col"+source).disabled = false;
	}
}

// Toggles menu
function hideMenu() {
	document.getElementById("menu").style.visibility = "hidden";
	document.getElementById("menu2").style.visibility = "visible";
}
function showMenu() {
	document.getElementById("menu").style.visibility = "visible";
	document.getElementById("menu2").style.visibility = "hidden";
}

// Function for moving the nodes.
// dir represents how far and what direction, type and id
// represent which node to move. Displace denotes whether to allow
// overlapping of two nodes (for temporary shifts as in remove from middle)
function moveNode(dir, id, type, displace) {
	id = parseInt(id);
	var dest = order[type][id] + dir;
	if (dest == 0 || id < 1) {
		alert("Nothing to move");
		return true;
	}
	order[type][id] = dest;
	if (type == 0) {
		var max = numS;
	} else {
		var max = numC;
	}
	
	// Do displacement
	if (displace) {
	for (var n = 1; n <= max; n++) {
		if ((order[type][n] == dest) && (n != id)) {
			moveNode(-dir, n, type, displace);
		}
	}
	}

	
	// Shift server
	if (type == 0) {
		rect[id].attr('y', 8 + MARGIN * (dest - 1));
		rtext[id].attr('y', 25 + MARGIN * (dest - 1));
		for (var j = 1; j <= numC; j++) {
			document.getElementById("serverRate_div_" + id.toString() + "_" + j.toString()).style.top = (T_OFFSET + 37 + MARGIN * (dest - 1)).toString() + "px";
			document.getElementById("serverRate_span_" + id.toString() + "_" + j.toString()).style.top = (T_OFFSET +  13 + MARGIN * (dest - 1)).toString() + "px";
		}
	// Shift task
	} else {
		circle[id].attr('cy', 25 + MARGIN * (dest - 1));
		ltext[id].attr('y', 25 + MARGIN * (dest - 1));
		document.getElementById("taskRate_div_n_" + id.toString()).style.top = (T_OFFSET + 37 + MARGIN * (dest - 1)).toString() + "px";
		document.getElementById("taskRate_span_n_" + id.toString()).style.top = (T_OFFSET + 13 + MARGIN * (dest - 1)).toString() + "px";
		for (var i = 1; i <= numS; i++) {
			document.getElementById("serverRate_div_" + i.toString() + "_" + id.toString()).style.left =  (570 + (dest - 1) * 70).toString() + "px";
			document.getElementById("serverRate_span_" + i.toString() + "_" + id.toString()).style.left =  (590 + (dest - 1) * 70).toString() + "px";
		}
	}
	
	// expand paper size if too small
	if (25 + MARGIN * (dest - 1) + 200 > p_height) {
		p_height += 200;
		paper.setSize(P_WIDTH, p_height);
	}
	
	// Store active
	var temp = active[type];
	
	// Reset all lines
	if (type == 0) {
		for (var j = 1; j <= numC; j++) {
			if (line[id][j]!=undefined){
				remLine(id,j);
				drawLine(id,j);
			}
		}
	} else {
		for (var i = 1; i <= numS; i++) {
			if (line[i][id]!=undefined){
				remLine(i,id);
				drawLine(i,id);
			}
		}
	}
	
	// Reselect active
	if (temp > 0) {
		active[type] = temp;
		if (type == 0) {
			rect[temp].attr("fill","#2bafec");
		} else {
			circle[temp].attr("fill","#2bafec");
		}
	}
}

// Clear selection
function resetActive() {
	for (var n = 1; n <= numS; n++)
		rect[n].attr("fill", "#dddddd");
	for (var n = 1; n <= numC; n++)
		circle[n].attr("fill", "#dddddd");
	active[0] = -1;
	active[1] = -1;
}

export default initCanvas;