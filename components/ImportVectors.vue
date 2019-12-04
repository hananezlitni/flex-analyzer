<template>
    <section>
        <div class="import">
            <h1 class="import__title">Import a Structure: Vectors</h1>

            <form class="import__vectors-form" @submit="$event.preventDefault()">
                <div class="div-flex-center">
                    <input type="text" id="file-name" class="import__file-name" placeholder="Import your vectors" readonly />
                    <input type="file" id="file-upload" class="import__file-upload" accept=".csv" @change="displayCsvDataInTextArea"/>
                    <label for="file-upload" class="import__file-upload-label">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512"><path fill="#dddddd" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
                        Choose a file
                    </label>
                </div>

                <p id="errorMessage"></p>
                
                <textarea placeholder="Vectors..." id="textArea" class="import__vectors-form__textarea" /> <!--@keyup="parseCsvData($event)"-->

                <h2 class="import__constraints-title">Minimum Number of Servers at a Task</h2>

                <div class="div-flex-center">
                    <input type="text" id="constraints-file-name--min" class="import__constraints-file-name" placeholder="Import your constraints (optional)" readonly />
                    <input type="file" id="constraints-file-upload--min" class="import__file-upload" accept=".csv" @change="importMinNumOfServers"/>
                    <label for="constraints-file-upload--min" class="import__file-upload-label">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512"><path fill="#dddddd" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
                        Choose a file
                    </label>
                </div>

                <br><br>    

                <h2 class="import__constraints-title">Maximum Number of Servers at a Task</h2>

                <div class="div-flex-center">
                    <input type="text" id="constraints-file-name--max" class="import__constraints-file-name" placeholder="Import your constraints (optional)" readonly />
                    <input type="file" id="constraints-file-upload--max" class="import__file-upload" accept=".csv" @change="importMaxNumOfServers"/>
                    <label for="constraints-file-upload--max" class="import__file-upload-label">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512"><path fill="#dddddd" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
                        Choose a file
                    </label>
                </div>
            </form>
        </div>

        <div id="figure" class="figure"></div> 

        <div id="result" class="result"></div>

        <br>

        <div class="div-flex-center buttons-div">
            <button class="button button--action button--not-filled" @click="clearAll">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 448 512">
                    <path fill="#c7d6e9" d="M53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32zm70.11-175.8l89.38-94.26a15.41 15.41 0 0 1 22.62 0l89.38 94.26c10.08 10.62 2.94 28.8-11.32 28.8H256v112a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16V320h-57.37c-14.26 0-21.4-18.18-11.32-28.8zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/>
                </svg>
                Clear All
            </button>

            <button class="button button--action button--action--figure secondary" @click="generateFigure">
            
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 640 512">
                        <path fill="#13191f" d="M384 320H256c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32zM192 32c0-17.67-14.33-32-32-32H32C14.33 0 0 14.33 0 32v128c0 17.67 14.33 32 32 32h95.72l73.16 128.04C211.98 300.98 232.4 288 256 288h.28L192 175.51V128h224V64H192V32zM608 0H480c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h128c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32z"/>
                    </svg>
                    Get Training Figure
            </button>

            <button class="button button--action secondary" @click="exportStructure">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 576 512">
                    <path fill="#13191f" d="M384 121.9c0-6.3-2.5-12.4-7-16.9L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128zM571 308l-95.7-96.4c-10.1-10.1-27.4-3-27.4 11.3V288h-64v64h64v65.2c0 14.3 17.3 21.4 27.4 11.3L571 332c6.6-6.6 6.6-17.4 0-24zm-379 28v-32c0-8.8 7.2-16 16-16h176V160H248c-13.2 0-24-10.8-24-24V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V352H208c-8.8 0-16-7.2-16-16z"/>
                </svg>
                Export Structure
            </button>
            
            <button class="button button--action primary" type="submit" @click="areArrivalAndServerRatesValid"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512">
                    <path fill="#13191f" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"/>
                </svg>
                Submit Structure
            </button>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .import__vectors-form {
        display: flex;
        flex-direction: column;
        align-self: center;
        align-items: center;
    }
    .import__vectors-form__textarea {
        width: 550px;
        height: 350px;
        padding: 10px;
        border: 2px solid $accent-color;
        background-color: $background-color--main;
        color: $font-color;
        font-size: 1em;
        font-family: $roboto;
        line-height: 1.5;
        resize: none;
        margin-bottom: 3em;
        &::placeholder {
            font-style: italic;
        }
    }
    .import__file-name::placeholder, .import__constraints-file-name::placeholder {
        font-style: italic;
    }
    .figure {
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        padding-left: 4em;
    }
</style>

<script>
    import solveLP from '../services/solver.js'

    export default {
        components: {
            solveLP
        },
        data() {
            return {
                numOfTasks: 5,
                numOfServers: 5,
                fMatrix: [],
                arrivalRates: [],
                serverRates: [],
                numOfConfigs: 0,
                configs: [],
                configsServerRateMatrix: [],
                originalConfigs: [],
                originalConfigsServerRateMatrix: [],
                fMatrixValid: true,
                arrivalRatesValid: true,
                serverRatesValid: true,
                ON: 1,
                OFF: 0,
                //serverLocationMatrix: [],
                //serverLocationMatrixIndex: 0,
                numC: 0,			// Number of tasks
                numS: 0,			// Number of servers
                active: [-1, -1],	// Holds selected task/server pair. -1 if none
                line: [],		// Container for line objects
                stickyC: false,
                stickyS: false,
                circle: [],		// Holds circle/task objects
                rect: [],		// Holds rect/server objects
                ltext: [],		// Holds task numbers
                rtext: [],		// Holds server numbers
                order: [],
                MARGIN: 50,		// Margin between rows
                C_OFFSET: 50,		// Circle offset
                R_OFFSET: 400,		// Rect offset
                paper: null,
                p_height: 1,
                P_WIDTH: 500        
            };
        }, 
        methods: {
            clearAll() {
                let textarea = document.getElementById('textArea');

                textarea.value = ""
                this.numOfTasks = 5
                this.numOfServers = 5
                this.fMatrix = []
                this.arrivalRates = []
                this.serverRates = []
                document.getElementById("figure").innerHTML = ""
                document.getElementById("result").innerHTML = ""
                this.errorMessage("")
            },
            displayCsvDataInTextArea() {
                let input = document.getElementById('file-upload');
                let textarea = document.getElementById('textArea');
                var self = this

                if (textarea.value.length > 0) {
                    textarea.value = ""
                    this.numOfTasks = 5
                    this.numOfServers = 5
                    this.fMatrix = []
                    this.arrivalRates = []
                    this.serverRates = []
                    document.getElementById("figure").innerHTML = ""
                    document.getElementById("result").innerHTML = ""
                    this.errorMessage("")
                } 

                if (input.files && input.files[0]) { 
                    var myFile = input.files[0];
                    var reader = new FileReader();

                    document.getElementById('file-name').value = myFile.name
                    reader.readAsBinaryString(myFile)

                    reader.onload = function (e) {
                        let csvdata = e.target.result; 
                        let lines = csvdata.split('\n');
                        for (var i = 0; i < lines.length; i++) {
                            textarea.value += lines[i].replace(/['"]+/g, '')
                        }

                        let values = textarea.value.split("\n")
                        self.numOfTasks = parseInt(values[1])
                        self.numOfServers = parseInt(values[3])
                        self.arrivalRates = values[5].split(',').map(Number)

                        let fMatrixStart = 7 + self.numOfServers + 1
                        let count = 0
                        for (i = fMatrixStart; i < values.length; i++) {
                            self.fMatrix[count++] = values[i].split(',').map(Number)
                        }

                        let counter = 0
                        for (var j = 7; j < fMatrixStart - 1; j++) {
                            self.serverRates[counter++] = values[j].split(',').map(Number)
                        } 
                        //self.generateFigure()
                    };
                }
            
                /*let input = document.getElementById('file-upload');
                let textarea = document.getElementById('textArea');

                if (input.files && input.files[0]) { 
                //Reset anyway in case there's previous content
                textarea.value = ""
                this.numOfTasks = 5
                this.numOfServers = 5
                this.fMatrix = []
                this.arrivalRates = []
                this.serverRates = []
                this.numOfConfigs = 0
                document.getElementById("figure").innerHTML = ""
                this.errorMessage("")

                //Display file content in text area
                var myFile = input.files[0];
                var reader = new FileReader();
                reader.readAsBinaryString(myFile)

                reader.onload = function (e) {
                    let csvdata = e.target.result; 
                    let lines = csvdata.split('\n');
                    for (var i = 0; i < lines.length; i++) {
                        textarea.value += lines[i].replace(/['"]+/g, '')
                    }
                };
                }*/
            },
            storeInputs() { //make sure latest inputs are stored when click generate figure and submit structure buttons.. validation needs to happen for both as well in case f matrix was edited just before submission.
                let textarea = document.getElementById('textArea');

                //Reset anyway in case there's previous content
                this.numOfTasks = 5
                this.numOfServers = 5
                this.fMatrix = []
                this.arrivalRates = []
                this.serverRates = []
                this.numOfConfigs = 0
                document.getElementById("figure").innerHTML = ""
                this.errorMessage("")
                
                //Store inputs
                let values = textarea.value.split("\n")

                this.numOfTasks = parseInt(values[1])
                this.numOfServers = parseInt(values[3])
                this.arrivalRates = values[5].split(',').map(Number)                   

                let fMatrixStart = 7 + this.numOfServers + 1
                let count = 0
                for (var j = fMatrixStart; j < values.length; j++) {
                    this.fMatrix[count++] = values[j].split(',').map(Number)
                }

                let counter = 0
                for (var l = 7; l < fMatrixStart - 1; l++) {
                    this.serverRates[counter++] = values[l].split(',').map(Number)
                }

                //Number of configurations
                let configs = 1
                for (var i = 0; i < this.numOfServers; i++) {
                    let count = 0
                    for (var j = 0; j < this.numOfTasks; j++) {
                        if (this.fMatrix[i][j] === 1) {
                        count++
                        }
                    }
                    configs *= count + 1
                }

                this.numOfConfigs = configs

                console.log("Tasks")
                console.log(this.numOfTasks)
                console.log("Servers")
                console.log(this.numOfServers)
                console.log("Arrival rates")
                console.log(JSON.parse(JSON.stringify(this.arrivalRates)))
                console.log("Server rates")
                console.log(JSON.parse(JSON.stringify(this.serverRates)))
                console.log("F Matrix")
                console.log(JSON.parse(JSON.stringify(this.fMatrix)))
                console.log("# of Configs")
                console.log(this.numOfConfigs)

                this.validateInputs()
            },
            validateInputs() {
                //Reset
                this.arrivalRatesValid = true
                this.serverRatesValid = true
                this.fMatrixValid = true

                //Validate f matrix
                if (this.fMatrix === undefined || this.fMatrix.length === 0) {
                    this.errorMessage("Error: The f matrix is empty.")
                } else {
                    //Check fMatrix values are 0s and 1s only
                    for (var i = 0; i < this.fMatrix.length; i++) {
                        if (this.fMatrix[i].every(item => item === 0 || item === 1) === false) {
                            this.fMatrixValid = false
                            document.getElementById("figure").innerHTML = ""
                            this.errorMessage("Error: The f matrix can only contain 0 and 1.")
                            break
                        } else if (i === this.fMatrix.length - 1) {
                            this.fMatrixValid = true
                        } else {
                            continue
                        }
                    }
                    //Check fMatrix dimensions
                    for (var j = 0; j < this.fMatrix.length; j++) {
                        if (this.fMatrix.length !== this.numOfServers || this.fMatrix[j].length !== this.numOfTasks) {
                            this.fMatrixValid = false
                            document.getElementById("figure").innerHTML = ""
                            this.errorMessage("Error: The dimensions of the f matrix are incorrect.")
                            break
                        } else {
                            continue
                        }
                    }
                }

                //Validate Arrival Rates
                if (this.arrivalRates === undefined || this.arrivalRates.length === 0) {
                this.arrivalRatesValid = false
                this.errorMessage("Error: The arrival rates vector is empty.")
                } else {
                //Check length of arrivalRates
                if (this.arrivalRates.length !== this.numOfTasks) {
                    this.arrivalRatesValid = false
                    this.errorMessage("Error: The length of the arrival rates vector is incorrect.")
                }

                //Check for negative values in arrival rates
                if (this.arrivalRates.some(v => v < 0)) {
                    this.arrivalRatesValid = false
                    this.errorMessage("Error: The arrival rates vector should not contain negative values.")
                }
                }
                
                //Validate Server Rates
                if (this.serverRates === undefined || this.serverRates.length === 0) {
                this.serverRatesValid = false
                this.errorMessage("Error: The server rates matrix is empty.")
                } else {
                //Check serverRates dimensions
                for (var j = 0; j < this.serverRates.length; j++) {
                    if (this.serverRates.length !== this.numOfServers || this.serverRates[j].length !== this.numOfTasks) {
                    this.serverRatesValid = false
                    this.errorMessage("Error: The dimensions of the server rates matrix are incorrect.")
                    break
                    } 
                }

                for (var j = 0; j < this.serverRates.length; j++) {
                    //Check for negative values in server rates
                    if (this.serverRates[j].some(v => v < 0)) {
                    this.serverRatesValid = false
                    this.errorMessage("Error: The server rates matrix should not contain negative values.")
                    break
                    }
                }
                }
            },
            generateFigure() {
                //Scroll to div
                var elementPosition = document.getElementById('figure').offsetTop;
                window.scrollTo(0, elementPosition);

                //Store inputs
                this.storeInputs()

                //Initialize figure if fMatrix is valid
                if (this.fMatrixValid) {
                    this.errorMessage("")
                    document.getElementById("figure").innerHTML = ""
                    this.initCanvas(this.numOfTasks, this.numOfServers) 
                }
            },
            initCanvas(C, S) {
                this.order[0] = [];		// order of servers display
                this.order[1] = [];		// order of tasks display
                this.line[0] = [];

                //Reset all variables
                this.numC = 0;			// Number of tasks
                this.numS = 0;			// Number of servers
                this.active = [-1, -1];	// Holds selected task/server pair. -1 if none
                this.line = [];			// Container for line objects
                this.line[0] = [];
                this.stickyC = false;
                this.stickyS = false;

                this.circle = [];		// Holds circle/task objects
                this.rect = [];			// Holds rect/server objects
                this.ltext = [];			// Holds task numbers
                this.rtext = [];			// Holds server numbers

                this.order = [];
                this.order[0] = [];		// order of servers display
                this.order[1] = [];		// order of tasks display

                this.L_OFFSET = 570;		// Left offset Canvas
                this.T_OFFSET = 41;		// Top offset Canvas
                this.MARGIN = 50;		// Margin between rows
                this.C_OFFSET = 110;		// Circle offset
                this.R_OFFSET = 380;		// Rect offset

                this.paper = null;
                this.p_height = 400;
                this.P_WIDTH = 600;

                //Initialize canvas
                this.paper = Raphael("figure", this.P_WIDTH, this.p_height);

                for (var i = 0; i < C; i++){
                    this.addTask();
                }
                for (var i = 0; i < S; i++){
                    this.addServer();
                }

                this.generateSkills()
            },
            generateSkills() {
                var server = 0
                var task = 0

                for (server = 0; server < this.fMatrix.length; server++) {
                    for (task = 0; task < this.fMatrix[0].length; task++) {
                        if (this.fMatrix[server][task] === 1) {
                            this.drawLine(server + 1, task + 1)
                        } else {
                            continue
                        }
                    }
                }
            },
            // Adds a task to the first available physical space on the canvas
            // A task comprises of a circle, a rate, and a label for each.
            addTask() {
                var self = this;

                // Increase count
                this.numC++;
                var id = this.numC;
                // Add to order
                var searching = true;
                var pos = 1;
                while (searching) {
                    for (var j = 1; j <= this.numC + 1; j++) {
                        if (this.order[1][j] == pos) {
                            pos++;
                            break;
                        } else if (j == this.numC + 1) {
                            searching = false;
                        }
                    }
                }
                this.order[1][id] = pos;
                
                // Make circle
                this.circle[this.numC] = this.paper.circle(this.C_OFFSET, 25 + this.MARGIN * (this.order[1][id] - 1), 20);
                this.circle[this.numC].attr("fill", "#dddddd");
                this.circle[this.numC].node.onmouseover = function() {
                    this.style.cursor = "pointer";
                }

                // Check paper size
                if (25 + this.MARGIN * (this.order[1][id] - 1) + 200 > this.p_height) {
                    this.p_height += 200;
                    this.paper.setSize(this.P_WIDTH, this.p_height);
                }
                
                // Add text
                this.ltext[this.numC] = (this.paper.text(0, 25 + this.MARGIN * (this.order[1][id] - 1), "Task " + this.numC).attr("font-size","18")).attr("fill","#2bafec").attr('text-anchor', 'start');
                
                // Onclick function
                this.circle[this.numC].click(function(evt) {
                    if ((evt.ctrlKey || evt.shiftKey) && (self.active[0] != -1)) {
                        self.stickyS = true;
                    } else {
                        self.stickyC = false;
                        self.stickyS = false;
                    } 
                    
                    if (self.active[1] != id) {
                        // If not selected, select it
                        self.circle[id].attr("fill","#2bafec");
                        // If something else was selected, unselect it
                        if (self.active[1] > -1) {
                            self.circle[self.active[1]].attr("fill","#dddddd");
                        }
                        // Update currently selected task
                        self.active[1] = id;
                        // Check if selecting the task connects two points
                        self.checkLine();
                    } else {
                        // If this was selected, make it blue and clear it
                        self.circle[id].attr("fill","#dddddd");
                        self.active[1] = -1;
                    }
                });
            },
            // Function for adding a server to the system
            // Server consists of a square, one rate for each task, and labels
            addServer() {
                var self = this;

                // Increase count
                this.numS++;
                var id = this.numS;
                // Add to order
                var searching = true;
                var pos = 1;
                while (searching) {
                    for (var i = 1; i <= this.numS + 1; i++) {
                        if (this.order[0][i] == pos) {
                            pos++;
                            break;
                        } else if (i == this.numS + 1) {
                            searching = false;
                        }
                    }
                }
                this.order[0][id] = pos;
                
                // Make rect
                this.rect[this.numS] = this.paper.rect(this.R_OFFSET, 8 + this.MARGIN * (this.order[0][this.numS] - 1), 40, 40, 4);
                this.rect[this.numS].attr("fill", "#dddddd");
                this.rect[this.numS].node.onmouseover = function() {
                    this.style.cursor = "pointer";
                }
                // Check paper size
                if (25 + this.MARGIN * (this.order[0][this.numS] - 1) + 200 > this.p_height) {
                    this.p_height += 200;
                    this.paper.setSize(this.P_WIDTH, this.p_height);
                }
                // Add text
                this.rtext[this.numS] = (this.paper.text(430, 28 + this.MARGIN * (this.order[0][this.numS] - 1), "Server " + id).attr("font-size", "18")).attr("fill","#2bafec").attr('text-anchor', 'start');
                // Add line container for server
                this.line[this.numS] = [];
                
                // Onclick function
                this.rect[this.numS].click(function(evt) {
                    if ((evt.ctrlKey || evt.shiftKey) && (self.active[1] != -1)) {
                        self.stickyC = true;
                    } else {
                        self.stickyC = false;
                        self.stickyS = false;			
                    }
                
                    if (self.active[0] != id) {
                        // If not selected, make it turquoise
                        self.rect[id].attr("fill","#2bafec");
                        // Unselect anything else
                        if (self.active[0] > -1) {
                            self.rect[self.active[0]].attr("fill","#dddddd");
                        }
                        // Set active server
                        self.active[0] = id;
                        // Check connection
                        self.checkLine();
                    } else {
                        // clear selection
                        self.rect[id].attr("fill","#dddddd");
                        self.active[0] = -1;
                    }
                });
            },
            // If there is no line between S and C, draw a line using checkLine
            // S, C denote server and task number
            drawLine (S, C) {
                if (this.line[S][C] != undefined)
                    return true;
                this.active[0] = S;
                this.active[1] = C;
                this.checkLine();
                this.active[0] = -S;
                this.active[1] = -C;
            },
            // Checks if both a server and a task are selected.
            // If so, toggle the line between them.
            checkLine() {
                var S = this.active[0];	// Active server
                var C = this.active[1];	// Active task

                // Get co-ordinates of nodes
                var x1 = this.xof("S", S);
                var x2 = this.xof("C", C);
                var y1 = this.yof("S", S);
                var y2 = this.yof("C", C);
                
                // If both are active
                /* Note: The original if condition was (S != -1 && C != -1). I changed it to remove the console error
                error generated because S is -10. */
                if (S > -1 && C > -1) {
                    // No line, draw line
                    if (this.line[S][C] == undefined) {
                        this.line[S][C] = this.paper.path("M"+x1+","+y1+"L"+x2+","+y2);
                        this.line[S][C].attr("stroke-width","2");
                        this.line[S][C].attr("stroke","#2bafec");
                        this.fMatrix[S-1][C-1] = "1"
                        this.updateTextArea()
                    } else {
                        // Line, remove line
                        this.line[S][C].remove();
                        this.line[S][C] = undefined;
                        this.fMatrix[S-1][C-1] = "0"
                        this.updateTextArea()
                    }
                    // Reset the active task/servers
                    //alert(sticky);
                    if (!this.stickyS) {
                        this.active[0] = -1;
                        this.rect[S].attr("fill","#dddddd");
                    }
                    if (!this.stickyC) {
                        this.active[1] = -1;
                        this.circle[C].attr("fill","#dddddd");
                    }
                }
            },
            // Returns x value of specified node of type, num
            // Type is a character, "C" for task, "S" for server
            // num is the relevant node number
            xof(type, num) {
                if (type == "C" && num > -1) {
                    return this.circle[num].attr('cx') + this.circle[num].attr('r');
                } else if (type == "S" && num > -1) {
                    return this.rect[num].attr('x');
                } else {
                    return false;
                }
            },
            // Returns y value of specified node of type, num
            // Type is a character, "C" for task, "S" for server
            // num is the relevant node number
            yof(type, num) {
                if (type == "C" && num > -1) {
                    return this.circle[num].attr('cy');
                } else if (type == "S" && num > -1) {
                    return this.rect[num].attr('y') + 0.5 * this.rect[num].attr('height');
                } else {
                    return false;
                }
            },
            importMinNumOfServers() {
                //[1,2,4]
            },
            importMaxNumOfServers() {
                //[2,3,5]
            },
            areArrivalAndServerRatesValid() { //Store arrival and server rates here not in store inputs
                //scroll to div
                var elementPosition = document.getElementById('result').offsetTop;
                window.scrollTo(0, elementPosition);

                //Store inputs
                this.storeInputs()

                //If arrival and server rates are valid, generate configurations
                if (this.arrivalRatesValid && this.serverRatesValid) {
                    this.errorMessage("")
                    this.solveOptimizationProblem()
                }
            },
            computeConfigurations(numOfServers, numOfTasks, fMatrix) {
                const ON = 1, OFF = 0;
                let configs = {};

                if (numOfServers > 0 && numOfTasks > 0) {
                    numOfTasks += 1;
                    // fix up fMatrix to include zero state in accordance with the number of tasks 
                    fMatrix = fMatrix.map(function(row) {
                        let deltaLength = numOfTasks - row.length;
                        return new Array(deltaLength).fill(OFF).concat(row);
                    });
                    // start computing the configs
                    this.computeConfigurationsHelper([], numOfServers, numOfTasks, fMatrix, configs);
                }

                // get the keys from the map and convert them to array 
                return Object.keys(configs).map(function(vectorString) {
                    return vectorString.split(",").map(function(task) {
                        return parseInt(task);
                    });
                });
            },
            //Generate all of the premutations
            computeConfigurationsHelper(vectorArray, numOfServers, numOfTasks, fMatrix, map) {
                const ON = 1, OFF = 0;

                if (vectorArray.length < numOfServers) {
                    for (let i = 0; i < numOfTasks; i++) {
                        // vectorArray.length is the server index in the fMatrix
                        let valueToAdd = fMatrix[vectorArray.length][i] === ON ? i : OFF;
                        this.computeConfigurationsHelper(vectorArray.concat([valueToAdd]), numOfServers, numOfTasks, fMatrix, map);
                    }
                } else {
                    // we don't need a value here, we just need the map to make sure they are unique 
                    // we could use a set as well
                    map[vectorArray.toString()] = OFF;
                }
            },
            computeServerRatesOfConfigurations(configs, serverRates) {
                //Reset
                this.configsServerRateMatrix = []

                let serverRateMatrix = []

                //Set all entries of serverRateMatrix to zeros
                for (var i = 0; i < configs.length; i++) {
                    serverRateMatrix[i] = (new Array(this.numOfTasks)).fill(0) //Length of one entry in matrix equals to num of tasks
                }

                //Update serverRateMatrix with server rates where appropriate
                for (var z = 0; z < configs.length; z++) {
                    for (var l = 0; l < configs[z].length; l++) {
                        if (configs[z][l] === 0) {
                            continue
                        } else {
                            serverRateMatrix[z][configs[z][l] - 1] = serverRates[l][configs[z][l] - 1]
                        }
                    }

                    //If multiple servers are at the same task, add the corresponding server rates. 
                    //The implementation also takes into consideration if there are duplicates of more than 1 task.
                    var dups = this.getDuplicates(configs[z])

                    if (Object.keys(dups).length > 0) {
                        var duplicatedTasks = Object.keys(dups)

                        if (Object.keys(dups).includes("0") === false) {
                            for (var n = 0; n < duplicatedTasks.length; n++) {
                                var serverRateSum = 0

                                for (var server in dups[duplicatedTasks[n]]) {
                                serverRateSum += serverRates[parseInt(dups[duplicatedTasks[n]][parseInt(server)])][parseInt(duplicatedTasks[n]) - 1]
                                }
                            
                                serverRateMatrix[z][parseInt(duplicatedTasks[n]) - 1] = serverRateSum
                            }
                        }
                    }
                }

                return serverRateMatrix
            },
            solveOptimizationProblem() {
                let results = {}
                
                //Original problem
                results["originalProblem"] = this.solveOriginalProblem().optimum

                //Fully Flexible Structure
                results["fullyFlexible"] = this.solveForFullyFlexibleStructure().optimum

                //Remove Task n
                for (var n = 0; n < this.numOfTasks; n++) {
                    console.log("**************** Remove Task " + (n + 1) + "****************")
                    results["noTask" + (n + 1)] = this.solveWithoutTaskN(n).optimum
                }
                
                console.log("**************** Final Output ****************")
                console.log(results)

                //Display output
                document.getElementById('result').innerHTML = '<h1 class="result__title">Result</h1>'
                document.getElementById('result').innerHTML += '<p>The capacity of the submitted structure is: ' + results["originalProblem"] + '</p>'
                document.getElementById('result').innerHTML += '<p>The capacity of the fully flexible structure is: ' + results["fullyFlexible"] + '</p>'

                for (var i = 1; i <= this.numOfTasks; i++) {
                    document.getElementById('result').innerHTML += '<p>The capacity of the structure when task ' + i + ' is removed: ' + results["noTask" + i] + '</p>'
                }
            },
            solveOriginalProblem() {
                console.log("**************** Original Problem ****************")
                this.configs = this.computeConfigurations(this.numOfServers, this.numOfTasks, this.fMatrix)
                console.log(JSON.parse(JSON.stringify(this.configs)))

                this.configsServerRateMatrix = this.computeServerRatesOfConfigurations(this.configs, this.serverRates)
                console.log(JSON.parse(JSON.stringify(this.configsServerRateMatrix)))

                let lpResult = solveLP(this.configsServerRateMatrix, this.arrivalRates)
                console.log(lpResult.solution)

                this.export('configurations', this.configs)
                this.export('server-rate-matrix', this.configsServerRateMatrix)

                return lpResult.solution
            },
            solveForFullyFlexibleStructure() {
                console.log("**************** Fully Flexible Structure ****************")
                //New configs & server rate matrix and reset
                let configsNew = []
                let configsServerRateMatrixNew = []
                //let serverRatesNew = this.serverRates

                configsNew = this.computeConfigurations(this.numOfServers, this.numOfTasks, new Array(this.numOfServers).fill(new Array(this.numOfTasks).fill(1)))
                console.log(JSON.parse(JSON.stringify(configsNew)))

                configsServerRateMatrixNew = this.computeServerRatesOfConfigurations(configsNew, this.serverRates)
                console.log(JSON.parse(JSON.stringify(configsServerRateMatrixNew)))

                let lpResult = solveLP(configsServerRateMatrixNew, this.arrivalRates)
                console.log(lpResult.solution)

                return lpResult.solution
            },
            solveWithoutTaskN(n) {
                let fMatrixNew = this.fMatrix
                let arrivalRatesNew = this.arrivalRates

                for (var row in fMatrixNew) {
                    fMatrixNew[row][n] = 0
                }

                //arrivalRatesNew[n] = 0

                //Compute configs and solve LP
                let configsNew = this.configs.map((row) => row.map((entry) => entry === (n + 1) ? 0 : entry))
                //let configsNew = this.configs.filter(row => row.includes(n + 1) === false)
                console.log(JSON.parse(JSON.stringify(configsNew)))
                let configsServerRateMatrixNew = this.computeServerRatesOfConfigurations(configsNew, this.serverRates)
                console.log(JSON.parse(JSON.stringify(configsServerRateMatrixNew)))

                /*let configsNew = []
                let configsServerRateMatrixNew = []
                configsNew = this.computeConfigurations(this.numOfServers, this.numOfTasks, fMatrixNew)
                console.log(JSON.parse(JSON.stringify(configsNew)))

                configsServerRateMatrixNew = this.computeServerRatesOfConfigurations(configsNew)
                console.log(JSON.parse(JSON.stringify(configsServerRateMatrixNew)))*/

                let lpResult = solveLP(configsServerRateMatrixNew, arrivalRatesNew)
                console.log(lpResult.solution)

                return lpResult.solution
            },
            exportStructure() {
                var csvRows = []
                let structure = document.getElementById('textArea').value.split("\n")
                var csvContent = ""
                
                for (var x = 0; x < structure.length; x++) {
                    if (x == structure.length -1 ) {
                        csvContent += structure[x]
                    } else {
                        csvContent += structure[x] + "\r\n"
                    }
                }

                var element = document.createElement('a')
                element.setAttribute('href', 'data:text/csv;base64,' + btoa(csvContent));
                element.setAttribute('download', 'structure.csv');
                element.style.display = 'none';
                
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            },
            export(fileName, file) {
                var element = document.createElement('a')
                element.setAttribute('href', 'data:text/csv;base64,' + btoa(file));
                element.setAttribute('download', fileName + '.csv');
                element.style.display = 'none';
                
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            },
            updateTextArea() {
                var textarea = document.getElementById("textArea")
                
                textarea.value = "Number of Tasks:" + "\n" + this.numOfTasks + "\n" + "Number of Servers:" + "\n" + this.numOfServers + "\n" + "Arrival Rates:" + "\n" + this.arrivalRates + "\n" + "Server Rates:" + "\n"

                for (var z = 0; z < this.serverRates.length; z++) {
                    textarea.value += this.serverRates[z] + "\n"
                }

                textarea.value += "F Matrix:" + "\n"

                for (var n = 0; n < this.fMatrix.length; n++) {
                    if (n == this.fMatrix.length - 1) {
                        textarea.value += this.fMatrix[n]
                    } else {
                        textarea.value += this.fMatrix[n] + "\n"
                    }
                }
            },
            /********** Helper functions **********/
            removeDuplicates(arr) {
                let unique = {};
                arr.forEach((i) => {
                if(!unique[i]) {
                    unique[i] = true
                }
                })
                return Object.keys(unique);
            },
            getDuplicates(arr) {
                var duplicates = {};
                for (var i = 0; i < arr.length; i++) {
                    if(duplicates.hasOwnProperty(arr[i])) {
                        duplicates[arr[i]].push(i);
                    } else if (arr.lastIndexOf(arr[i]) !== i) {
                        duplicates[arr[i]] = [i];
                    }
                }

                return duplicates;
            },
            errorMessage(message) {
                document.getElementById("errorMessage").innerHTML = message
            }
        }
    }   
</script>