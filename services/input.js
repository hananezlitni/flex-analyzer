// Error Check import.
var input = $_POST["import"];	// Import structure
var line = explode("\n", input);		// $line array stores input

// Get number of tasks
temp = explode(",", line[0]);
if (temp.length > 1 && temp[1] != "") {
    console.log("[Line 0] Only one value expected. Excess values ignored.")
} else {
    numC = trim(temp[0]);
}

// Error check number of tasks
if (!is_numeric(numC) || intval(numC) != numC) {
    console.log("[Line 0] Non-integer: # of tasks at '{$numC}'.")
}

if (numC < 0) {
    console.log("[Line 0] Neg Val: # of tasks at '{$numC}'.")
}

// Get number of servers
temp = explode(",", line[1]);
if (temp.length > 1 && temp[1] != "") {
    console.log("[Line 1] Only one value expected. Excess values ignored.")
} else {
    numS = trim($temp[0]);
}

// Error check number of servers
if (!is_numeric(numS) || intval(numS) != numS) {
    console.log("[Line 1] Non-integer: # of servers at '{$numS}'.")
}

if ($numS < 0) {
    console.log("[Line 1] Neg Val: # of servers at '{$numS}'.")
}

// Quit if there is already an error.
/*if ($error) {
    echo "<span style='color:red;'>Error(s) detected:<br/>";
    echo $errorLoc;
    echo "Please go back and check your import values.<br/></span>";
    echo "<input type='button' value='Back' onclick='history.go(-1);return true;'>";
    die();
}*/

// Get task rates
taskRate = explode(",", line[2]);

// Error check task rate size
if ((temp = sizeof(taskRate)) != numC) {
    console.log("[Line 2] Number of task rates ({$temp}) does not match number of tasks ({$numC}).")
}

// Error check task rates
for (j = 0; j < numC; j++) {
    checkVal(taskRate[j], -2, j, 0, 2);
}

// Iterate through number of servers
for (i = 0; i < numS; i++) {
    $allZero = true;
    
    // Get server rates for server i
    serverRate[i] = explode(",", line[i+3]);
    lineNum = i + 3;

    // Check number of server rates
    if ((temp = sizeof(serverRate[i])) != numC) {
        console.log("[Line " + strval(lineNum + 1) + "] Number of server rates ({$temp}) for server #" + strval(i + 1) + " does not match number of tasks" + ({numC}))
    }

    // Error check each server rate
    /*foreach ($serverRate[$i] as j => $value) {
        checkVal(value, i, j, 1, lineNum);
        if (value > 0)
            allZero = false;
    }*/

    if (allZero) {
        console.log("[Line " + strval(lineNum + 1) + "] All zero server rates for server " + strval(i + 1))
    }
}

for (i = 0; i < numS; i++)
{
    // Get training matrix for server i
    $isTrained[$i] = explode(",", $line[$i+3+$numS]);
    $lineNum = $i + 3 + $numS;

    // Check number of istrained
    if ((temp = sizeof(isTrained[i])) != $numC)
        console.log("[Line " + strval(lineNum + 1) + "] Number of istrained ({$temp}) for server #" + strval(i + 1) + " does not match number of tasks" + ({$numC}));

    // Error check each istrained
    /*foreach ($isTrained[$i] as $j => $value) 
        checkVal($value, $i, $j, 2, $lineNum);*/
}