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

var MARGIN = 50;		// Margin between rows
var C_OFFSET = 50;		// Circle offset
var R_OFFSET = 400;		// Rect offset

var paper;
var p_height = 1;
var P_WIDTH = 500;

let fVec = [];

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

	fVec = fVector

	for (server = 0; server < fVec.length; server++) {
		for (task = 0; task < fVec[0].length; task++) {
			if (fVec[server][task] === "1") {
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
	/* Note: The original if condition was (S != -1 && C != -1). I changed it to remove the console error
	error generated because S is -10. */
	if (S > -1 && C > -1) {
		// No line, draw line
		if (line[S][C] == undefined) {
			line[S][C] = paper.path("M"+x1+","+y1+"L"+x2+","+y2);
			line[S][C].attr("stroke-width","2");
			line[S][C].attr("stroke","#2bafec");
			fVec[S-1][C-1] = "1"
		} else {
			// Line, remove line
			line[S][C].remove();
			line[S][C] = undefined;
			fVec[S-1][C-1] = "0"
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

export default initCanvas;