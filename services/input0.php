<?php

include("errorfn.php");

$import = false;		// No import by default.


if ($_POST["import"])
{
	// Error Check import.
	$import = true;
	$input = $_POST["import"];	// Import structure
	$line = explode("\n", $input);		// $line array stores input
	
	// Get number of tasks
	$temp = explode(",", $line[0]);
	if (sizeof($temp) > 1 && $temp[1] != "")
		warnMsg("[Line 0] Only one value expected. Excess values ignored.");
	$numC = trim($temp[0]);
	
	// Error check number of tasks
	if (!is_numeric($numC) || intval($numC) != $numC)
		errorMsg("[Line 0] Non-integer: # of tasks at '{$numC}'.");
	
	if ($numC < 0)
		errorMsg("[Line 0] Neg Val: # of tasks at '{$numC}'.");
	
	// Get number of servers
	$temp = explode(",", $line[1]);
	if (sizeof($temp) > 1 && $temp[1] != "")
		warnMsg("[Line 1] Only one value expected. Excess values ignored.");
	$numS = trim($temp[0]);
	
	// Error check number of servers
	if (!is_numeric($numS) || intval($numS) != $numS)
		errorMsg("[Line 1] Non-integer: # of servers at '{$numS}'.");
	
	if ($numS < 0)
		errorMsg("[Line 1] Neg Val: # of servers at '{$numS}'.");
	
	// Quit if there is already an error.
	if ($error) {
		echo "<span style='color:red;'>Error(s) detected:<br/>";
		echo $errorLoc;
		echo "Please go back and check your import values.<br/></span>";
		echo "<input type='button' value='Back' onclick='history.go(-1);return true;'>";
		die();
	}
	
	// Get task rates
	$taskRate = explode(",", $line[2]);
	
	// Error check task rate size
	if (($temp = sizeof($taskRate)) != $numC)
		errorMsg("[Line 2] Number of task rates ({$temp}) does not match number of tasks ({$numC}).");
	
	// Error check task rates
	for ($j = 0; $j < $numC; $j++)
		checkVal($taskRate[$j], -2, $j, 0, 2);

	// Iterate through number of servers
	for ($i = 0; $i < $numS; $i++)
	{
		$allZero = true;
		
		// Get server rates for server i
		$serverRate[$i] = explode(",", $line[$i+3]);
		$lineNum = $i + 3;

		// Check number of server rates
		if (($temp = sizeof($serverRate[$i])) != $numC)
			errorMsg("[Line " . strval($lineNum + 1) . "] Number of server rates ({$temp}) for server #" . strval($i + 1) . " does not match number of tasks ({$numC}).");

		// Error check each server rate
		foreach ($serverRate[$i] as $j => $value) 
		{
			checkVal($value, $i, $j, 1, $lineNum);
			if ($value > 0)
				$allZero = false;
		}
		if ($allZero)
			warnMsg("[Line " . strval($lineNum + 1) . "] All zero server rates for server ".strval($i + 1).".");
	}
	
	for ($i = 0; $i < $numS; $i++)
	{
			// Get training matrix for server i
			$isTrained[$i] = explode(",", $line[$i+3+$numS]);
			$lineNum = $i + 3 + $numS;

			// Check number of istrained
			if (($temp = sizeof($isTrained[$i])) != $numC)
				errorMsg("[Line " . strval($lineNum + 1) . "] Number of istrained ({$temp}) for server #" . strval($i + 1) . " does not match number of tasks ({$numC}).");
			// Error check each istrained
			foreach ($isTrained[$i] as $j => $value) 
				checkVal($value, $i, $j, 2, $lineNum);
	}
	
	// Quit if there is already an error.
	if ($error) {
		echo "<span style='color:red;'>Error(s) detected:<br/>";
		echo $errorLoc;
		echo "Please go back and check your import values.<br/></span>";
echo<<<HERE
<form action = "import.php" method = "post">
<input type = "hidden" value = "{$errorLoc}" name = "errors"/>
<input type = "hidden" value = "{$input}" name = "input"/>
<input type = "submit" value = "Return to Import" />
<input type="button" value="Cancel" onclick="top.location.href='/index.php'"/>
</form>
HERE;
		die();
	}
} else {
	// Default values for no import
	$numC = 5;
	$numS = 5;
}

// Begin Page ********************************************************

// Header stuff
echo<<<HERE
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<html>
<head>
<title>Input</title>
<style>

body {
	
	/*background-color: #f0f0f0;*/
	float:left;
	clear:both;
	}
#menu {
	position: fixed;
	background-color: #f4f4f4;
	
	padding: 10px;
	z-index: 100;
	margin: 20 0;
	font-size: 1.0em;
	font-family: "Trebuchet MS", Helvetica, sans-serif;
	/*box-shadow: 4px 4px 5px #888888;*/
	/*border: 1px solid black;*/
	width: 910px;
	height: 200px;
	bottom: 100px;
	left:0;
	
	
	
}





.row1, .row2, .row3, .row4, .row5 {
	padding:.2em 0;
	}
	
#menu input, #menu select {
	padding: .3em;
	margin-left:  .3em;
	margin-right:  .3em;
}

input[type=button] {
	width:160px;

	}
select {
	width:160px;

	}
	
	
#menu2 {
	position: fixed;
	background-color: rgb(216, 216, 208);
	padding: 5px;
	z-index: 100;
	bottom: 0;
	margin: 0;
	font-size: 1.1em;
	visibility: hidden;
	box-shadow: 4px 4px 5px #888888;
}



input[type="text"]:disabled
{
	background: #ccc;
}
</style>

<script src="raphael-min.js" type="text/javascript" charset="utf-8"></script>
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://code.jquery.com/ui/1.10.1/jquery-ui.js"></script>
<script src="structure0.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
$(function() {
	$("#menu").draggable({  });
});


/*$(document).keyup(function(event) {
	var tag = event.target.tagName.toLowerCase();
	if (tag == 'input' || tag == 'textarea')
		return true;
	if (event.keyCode == 16 || event.keyCode == 17)
		resetActive();
});*/


 //$('html').keyup(function(e){if(e.keyCode == 8)alert('backspace trapped')})  
/*$('html').keyup(function(e){
	
	if(e.keyCode == 8)alert('backspace trapped')
	
	})*/



$(document).keydown(function(event) {
	var tag = event.target.tagName.toLowerCase();
	
	
	if (tag == 'input' || tag == 'textarea')
		

		return true;
	switch(event.keyCode)
	{
	case 13:
		document.LP.submit();
		break;
	case 27:
		
		clearAll();
		break;
		
	
		
	case 77:
		if (document.getElementById("menu").style.visibility != "hidden") {
			document.getElementById("menu").style.visibility = "hidden";
			document.getElementById("menu2").style.visibility = "visible";
		} else {
			document.getElementById("menu").style.visibility = "visible";
			document.getElementById("menu2").style.visibility = "hidden";
		}
		break;
	case 67:
		resetActive();
		break;
	case 188:
		moveNode(-1, active[1], 1, true);
		break;
	case 190:
		moveNode(1, active[1], 1, true);
		break;
	case 219:
		moveNode(-1, active[0], 0, true);
		break;
	case 221:
		moveNode(1, active[0], 0, true);
		break;
	case 57:
		if (active[1] == -1) {
			remLastTask();
		} else {
			remTask();
		}
		break;
	case 48:
		addTask();
		break;
	case 189:	// IE, CH, SAF
	case 109:	// OP
	case 173: 	// FF
		if (active[0] == -1) {
			remLastServer();
		} else {
			remServer();
		}
		break;
	case 187:	// IE, CH, SAF
	case 61:	// OP
	case 107: 	// FF
		addServer();
		break;
	case 85:
		setTrain(0, -1, 0);
		break;
	case 84:
		setTrain(1, -1, 0);
		break;
	default:
		break;
	}
	event.preventDefault();
});






</script>

</head>

<body >

<table style="position: absolute;top: 33px;">
<tr>
<td><strong>Arrival Rates</strong></td>
<td style="padding-left: 13px;"><strong>Tasks</strong></td>
<td style="padding-left: 132px;"><strong>Training</strong></td>
<td style="padding-left: 135px;"><strong>Servers</strong></td>
<td style="padding-left: 33px;"><strong>Potential Server Rates</strong></td>
</tr>
</table>

HERE;

// Print import output
if ($import)
{
	if ($warningLoc != "") {
		$warningLoc = "Warning:\\n" . $warningLoc;
		echo "<script>";
		echo "alert(\"{$warningLoc}\");";
		echo "</script>";
	}
}

// Start form
echo<<<HERE
<div id="menu">
<div class="row1">
<input type="button" value="Submit" onclick="document.LP.submit();"/> 

<input type="button" value="Add Task" onclick="addTask();"/>
<input type="button" value="Remove Task" onclick="remTask();"/>
<input type="button" value="Add Server" onclick="addServer();"/>
<input type="button" value="Remove Server" onclick="remServer();"/>
</div>
<div class="row2">
Set rate 
<input type="text" size="4" id="val1" value="0"> 
 for 
<select id="setting1" onchange="optionCheck('1');">
<option value="0">All Tasks</option>
<option value="1">All Servers</option>
<option value="2">Column</option>
<option value="3">Row</option>
</select>
<input type="text" size="4" id="col1" value="1" disabled /> 
<input type="button" value="Set Value" onclick="setCol(document.getElementById('val1').value, document.getElementById('col1').value, document.getElementById('setting1').value);"/>
</div>
<div class="row3">

Train 
<select id="val2">
<option value="1">Train</option>
<option value="0">Untrain</option>
</select>
 for 
<select id="setting2" onchange="optionCheck('2');">
<option value="0">All Combinations</option>
<option value="1">Server</option>
<option value="2">Task</option>
</select>
<input type="text" size="4" id="col2" value="1" disabled />
<input type="button" value="Set Training" onclick="setTrain(document.getElementById('val2').value, document.getElementById('col2').value, document.getElementById('setting2').value);"/>
<!-- Sticky T:<input type="checkbox" id="cStick"> S:<input type="checkbox" id="sStick"> -->
</div>
<div class="row4">

Move selected 
<select id="moveType">
<option value="0">Server</option>
<option value="1">Task</option>
</select>
<input type="hidden" size="4" id="node" value="1" />
<input type="button" value="<<" onclick="moveNode(-1,active[(document.getElementById('moveType').value)],document.getElementById('moveType').value, true);">
<input type="button" value=">>" onclick="moveNode(1,active[(document.getElementById('moveType').value)],document.getElementById('moveType').value, true);">
</div>
<div class="row5">

<input type="button" value="Help" onclick="window.open('/~sj87/flextool/web/help.php');"/>
<input type="button" value="Clear All" onclick="clearAll();"/>
<input type="button" value="Import" onclick="if(confirm('Warning: This will clear your current structure.')){location.href='import.php';}"/>
<input type="button" value="Hide Menu" onclick="hideMenu();"/>
</div>
</div>

<div id="menu2">
<input type="button" value="Menu" onclick="showMenu();"/>
<input type="button" value="Submit" onclick="document.LP.submit();"/> 
</div>

<form method = "POST" action="output0.php" id="LP" name="LP" target="output">

<div id = "dynamicForm">
</div>

</form>

<script>
	initCanvas({$numC}, {$numS});
HERE;
	if ($import) {
		for ($j = 1; $j <= $numC; $j++) {
			$val = $taskRate[$j - 1];
			echo "setVal(\"C\", {$val}, 0, {$j});\n";
		}
		for ($i = 1; $i <= $numS;$i++) {
			for ($j = 1; $j <= $numC; $j++) {
				$val = $serverRate[$i - 1][$j - 1];
				$val2 = $isTrained[$i - 1][$j - 1];
				echo "setVal(\"S\", {$val}, {$i}, {$j});\n";
				echo "setVal(\"T\", {$val2}, {$i}, {$j});\n";
			}
		}
	}
ECHO<<<HERE
</script>

HERE;



echo<<<HERE

</script>


</body>
</html>
HERE;

?>
