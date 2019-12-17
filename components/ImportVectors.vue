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

                <div id="import-vectors-errorMessage"></div>
                
                <textarea placeholder="Vectors..." id="textArea" class="import__vectors-form__textarea" /> <!--@keyup="parseCsvData($event)"-->

                <h2 class="import__constraints-title">Minimum Number of Servers at a Task</h2>

                <div class="div-flex-center">
                    <input type="text" id="import-vectors-constraints-file-name--min" class="import__constraints-file-name" placeholder="Import your constraints (optional)" readonly />
                    <input type="file" id="import-vectors-constraints-file-upload--min" class="import__file-upload" accept=".csv" @change="minNumOfServers" />
                    <label for="import-vectors-constraints-file-upload--min" class="import__file-upload-label">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512"><path fill="#dddddd" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
                        Choose a file
                    </label>
                </div>

                <br><br>    

                <h2 class="import__constraints-title">Maximum Number of Servers at a Task</h2>

                <div class="div-flex-center">
                    <input type="text" id="import-vectors-constraints-file-name--max" class="import__constraints-file-name" placeholder="Import your constraints (optional)" readonly />
                    <input type="file" id="import-vectors-constraints-file-upload--max" class="import__file-upload" accept=".csv" @change="maxNumOfServers" />
                    <label for="import-vectors-constraints-file-upload--max" class="import__file-upload-label">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512"><path fill="#dddddd" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
                        Choose a file
                    </label>
                </div>
            </form>
        </div>

        <div id="figure" class="figure"></div> 

        <div id="import-vectors-result" class="result"></div>

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
            
            <button class="button button--action primary" type="submit" @click="solveOptimizationProblem">
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
    .figure {
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        padding-left: 4em;
    }
</style>

<script>
    import { minNumOfServers, maxNumOfServers } from '../services/constraints.js'
    import { buildMatrixA } from '../services/data-processing.js'
    import { solveLPinPython } from '../services/solver.js'

    export default {
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
                minServersPerTask: [],
                maxServersPerTask: [],
                fMatrixValid: true,
                arrivalRatesValid: true,
                serverRatesValid: true,
                ON: 1,
                OFF: 0,
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
                document.getElementById('textArea').value = "" 
                document.getElementById("figure").innerHTML = ""
                document.getElementById("import-vectors-result").innerHTML = ""
                document.getElementById('file-name').value = ""
                document.getElementById('file-upload').value = null
                document.getElementById('import-vectors-constraints-file-name--min').value = ""
                document.getElementById('import-vectors-constraints-file-upload--min').value = null
                document.getElementById('import-vectors-constraints-file-name--max').value = ""
                document.getElementById('import-vectors-constraints-file-upload--max').value = null
                this.errorMessage("")

                /*this.numOfTasks = 5
                this.numOfServers = 5
                this.fMatrix = []
                this.arrivalRates = []
                this.serverRates = []*/
            
                //Reset all data
                this.numOfTasks = 5
                this.numOfServers = 5
                this.fMatrix = []
                this.arrivalRates = []
                this.serverRates = []
                this.numOfConfigs = 0
                this.configs = []
                this.configsServerRateMatrix = []
                this.fMatrixValid = true
                this.arrivalRatesValid = true
                this.serverRatesValid = true
                this.ON = 1
                this.OFF = 0
                this.numC = 0			// Number of tasks
                this.numS = 0			// Number of servers
                this.active = [-1, -1]	// Holds selected task/server pair. -1 if none
                this.line = []		// Container for line objects
                this.stickyC = false
                this.stickyS = false
                this.circle = []		// Holds circle/task objects
                this.rect = []	// Holds rect/server objects
                this.ltext = []		// Holds task numbers
                this.rtext = []		// Holds server numbers
                this.order = []
                this.MARGIN = 50		// Margin between rows
                this.C_OFFSET = 50	// Circle offset
                this.R_OFFSET = 400		// Rect offset
                this.paper = null
                this.p_height = 1
                this.P_WIDTH = 500   
            },
            displayCsvDataInTextArea() {
                let input = document.getElementById('file-upload');
                let textarea = document.getElementById('textArea');
                var self = this

                //Reset in case there's previous content
                textarea.value = ""
                this.numOfTasks = 5
                this.numOfServers = 5
                this.fMatrix = []
                this.arrivalRates = []
                this.serverRates = []
                this.numOfConfigs = 0
                this.configs = []
                this.configsServerRateMatrix = []
                this.fMatrixValid = true
                this.arrivalRatesValid = true
                this.serverRatesValid = true
                document.getElementById("figure").innerHTML = ""
                document.getElementById("import-vectors-result").innerHTML = ""
                this.errorMessage("")
                
                //Read uploaded file
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
                        
                        //Store arrival rates
                        if (values[5] !== undefined) {
                            self.arrivalRates = values[5].split(',').map(Number)
                        }

                        //Store F matrix
                        let fMatrixStart = 7 + self.numOfServers + 1
                        let count = 0
                        for (i = fMatrixStart; i < values.length; i++) {
                            if (values[i] !== undefined || values[i] !== '') {
                                self.fMatrix[count++] = values[i].split(',').map(Number)
                            } else {
                                break
                            }
                        }

                        //Store server rates matrix
                        let counter = 0
                        for (var j = 7; j < fMatrixStart - 1; j++) {
                            if (values[j] !== undefined || values[j] !== '') {
                                self.serverRates[counter++] = values[j].split(',').map(Number)
                            } else {
                                break
                            }
                        }
                        
                        //Number of configurations
                        let configs = 1
                        for (var i = 0; i < self.numOfServers; i++) {
                            let count = 0
                            for (var j = 0; j < self.numOfTasks; j++) {
                                if (self.fMatrix[i][j] === 1) {
                                count++
                                }
                            }
                            configs *= count + 1
                        }

                        self.numOfConfigs = configs
                    };
                }
            },
            storeInputs() {
                let textarea = document.getElementById('textArea');

                //Reset in case there's previous content
                this.numOfTasks = 5
                this.numOfServers = 5
                this.fMatrix = []
                this.arrivalRates = []
                this.serverRates = []
                this.numOfConfigs = 0
                this.configs = []
                this.configsServerRateMatrix = []
                this.fMatrixValid = true
                this.arrivalRatesValid = true
                this.serverRatesValid = true
                document.getElementById("figure").innerHTML = ""
                document.getElementById("import-vectors-result").innerHTML = ""
                this.errorMessage("")
                
                //Store inputs
                let values = textarea.value.split("\n")

                this.numOfTasks = parseInt(values[1])
                this.numOfServers = parseInt(values[3])

                //Store arrival rates
                if (values[5] !== undefined) {
                    this.arrivalRates = values[5].split(',').map(Number)
                }
                
                //Store F matrix
                let fMatrixStart = 7 + this.numOfServers + 1
                let count = 0
                for (var j = fMatrixStart; j < values.length; j++) {
                    if (values[j] !== undefined || values[j] !== '') {
                        this.fMatrix[count++] = values[j].split(',').map(Number)
                    } else {
                        break
                    }
                }

                //Store server rates matrix
                let counter = 0
                for (var l = 7; l < fMatrixStart - 1; l++) {
                    if (values[l] !== undefined || values[l] !== '') {
                        this.serverRates[counter++] = values[l].split(',').map(Number)
                    } else {
                        break
                    }
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

                //Validate inputs
                this.validateInputs()
            },
            validateInputs() {
                //Reset
                this.arrivalRatesValid = true
                this.serverRatesValid = true
                this.fMatrixValid = true
                this.errorMessage("")

                //Validate F matrix
                if (this.fMatrix === undefined || this.fMatrix.length === 0) {
                    this.fMatrixValid = false
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
                this.$el.querySelector("#figure").scrollIntoView(true)

                //Store inputs in case the user changed the values in the text area
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
            minNumOfServers() {
                let minConstr = document.getElementById('import-vectors-constraints-file-upload--min')
                var self = this
                
                //If user imported min # of servers per task
                if (minConstr.files && minConstr.files[0]) {
                    //Store constraints
                    var myFile = minConstr.files[0];
                    var reader = new FileReader();

                    document.getElementById('import-vectors-constraints-file-name--min').value = minConstr.files[0].name
                    reader.readAsBinaryString(myFile)

                    reader.onload = function (e) {
                        let csvConstraints = e.target.result;
                        let constraints = csvConstraints.split('\n')

                        for (var i = 0; i < constraints.length; i++) {
                            constraints[i] = constraints[i].replace(/['"]+/g, '')
                        }

                        self.minServersPerTask = constraints[1].split(',').map(Number)

                        console.log("Minimum servers per task")
                        console.log(self.minServersPerTask)
                    }  
                }
            },
            maxNumOfServers() {
                let maxConstr = document.getElementById('import-vectors-constraints-file-upload--max')
                var self = this
                
                //If user imported min # of servers per task
                if (maxConstr.files && maxConstr.files[0]) {
                    //Store constraints
                    var myFile = maxConstr.files[0];
                    var reader = new FileReader();

                    document.getElementById('import-vectors-constraints-file-name--max').value = myFile.name
                    reader.readAsBinaryString(myFile)

                    reader.onload = function (e) {
                        let csvConstraints = e.target.result;
                        let constraints = csvConstraints.split('\n')

                        for (var i = 0; i < constraints.length; i++) {
                            constraints[i] = constraints[i].replace(/['"]+/g, '')
                        }

                        self.maxServersPerTask = constraints[1].split(',').map(Number)

                        console.log("Maximum servers per task")
                        console.log(self.maxServersPerTask)
                    }
                }
            },
            /*areArrivalAndServerRatesValid() { //Store arrival and server rates here not in store inputs
                //scroll to div
                var elementPosition = document.getElementById('import-vectors-result').offsetTop;
                window.scrollTo(0, elementPosition);

                //Store inputs
                this.storeInputs()

                //If arrival and server rates are valid, generate configurations
                if (this.arrivalRatesValid && this.serverRatesValid) {
                    this.errorMessage("")
                    this.solveOptimizationProblem()
                }
            },*/
            async solveOptimizationProblem() {
                //scroll to div
                this.$el.querySelector("#import-vectors-result").scrollIntoView(true)

                //Store inputs in case user changes values in the textarea
                this.storeInputs()

                if (this.arrivalRatesValid && this.serverRatesValid && this.fMatrixValid) {
                    this.errorMessage("")

                    //Solve optimization problem
                    let results = {}
                    
                    //Original problem
                    results["originalProblem"] = await this.solveOriginalProblem()

                    //Fully Flexible Structure
                    results["fullyFlexible"] = await this.solveForFullyFlexibleStructure()

                    //Remove Task n
                    for (var n = 0; n < this.numOfTasks; n++) {
                        console.log("**************** Remove Task " + (n + 1) + "****************")
                        results["noTask" + (n + 1)] = await this.solveWithoutTaskN(n)
                    }

                    console.log("**************** Final Output ****************")
                    console.log(results)

                    //Display output
                    document.getElementById('import-vectors-result').innerHTML = '<h1 class="result__title">Results</h1>'
                    document.getElementById('import-vectors-result').innerHTML += '<p class="lp-result"><b>The capacity of the submitted structure is: </b>' + results["originalProblem"].output.gamma + '</p>'
                    document.getElementById('import-vectors-result').innerHTML += '<p class="lp-result"><b>The capacity of the fully flexible structure is: </b>' + results["fullyFlexible"].output.gamma + '</p>'
                    document.getElementById('import-vectors-result').innerHTML += '<p class="asterisks">*****</p>'

                    for (var i = 1; i <= this.numOfTasks; i++) {
                        document.getElementById('import-vectors-result').innerHTML += '<p class="lp-result"><b>The capacity of the structure when task <em>' + i + '</em> is removed: </b>' + results["noTask" + i].output.gamma + '</p>'
                    }
                }
            },
            solveOriginalProblem() {
                console.log("**************** Original Problem ****************")
                //Generate configurations
                this.configs = this.computeConfigurations(this.numOfServers, this.numOfTasks, this.fMatrix)
                console.log("Original configurations")
                console.log(JSON.parse(JSON.stringify(this.configs)))

                //Generate server rates from configurations
                this.configsServerRateMatrix = this.computeServerRatesOfConfigurations(this.configs, this.serverRates)
                console.log("Original server rates")
                console.log(JSON.parse(JSON.stringify(this.configsServerRateMatrix)))

                //Apply minNumOfServers constraints
                if (this.minServersPerTask.length > 0) {
                    let appliedMinConstraints = minNumOfServers(this.minServersPerTask, this.configs, this.configsServerRateMatrix)
                    this.configs = appliedMinConstraints.configs
                    this.configsServerRateMatrix = appliedMinConstraints.serverRates

                    console.log("Configurations with minNumOfServers")
                    console.log(this.configs)

                    console.log("Server rates with minNumOfServers")
                    console.log(this.configsServerRateMatrix)
                }   

                //Apply maxNumOfServers constraints
                if (this.maxServersPerTask.length > 0) {
                    let appliedMaxConstraints = maxNumOfServers(this.maxServersPerTask, this.configs, this.configsServerRateMatrix)
                    this.configs = appliedMaxConstraints.configs
                    this.configsServerRateMatrix = appliedMaxConstraints.serverRates

                    console.log("Configurations with maxNumOfServers")
                    console.log(this.configs)

                    console.log("Server rates with maxNumOfServers")
                    console.log(this.configsServerRateMatrix)
                }  

                //Build A matrix
                //let A = ["-2,-2,0,-1,-1,64", "-3,0,-5,-5,-2,53", "-1,-3,-1,0,-3,123", "1,1,1,1,1,0"]
                let A = buildMatrixA(this.configsServerRateMatrix, this.arrivalRates)

                //Export configs and server rates
                //Note: right now, the configs after applying constraints are being exported. modify it based on Dr. Down's reponse
                this.export('configurations', this.configs)
                this.export('server-rate-matrix', this.configsServerRateMatrix)

                //Pass A matrix to Python solver and get results
                let lpResult = solveLPinPython(A)

                return lpResult
            },
            solveForFullyFlexibleStructure() {
                console.log("**************** Fully Flexible Structure ****************")
                let configsNew = []
                let configsServerRateMatrixNew = []

                //Generate configurations
                configsNew = this.computeConfigurations(this.numOfServers, this.numOfTasks, new Array(this.numOfServers).fill(new Array(this.numOfTasks).fill(1)))
                console.log("Fully flexible structure configurations")
                console.log(JSON.parse(JSON.stringify(configsNew)))

                //Generate server rates from configurations
                configsServerRateMatrixNew = this.computeServerRatesOfConfigurations(configsNew, this.serverRates)
                console.log("Fully flexible structure server rates")
                console.log(JSON.parse(JSON.stringify(configsServerRateMatrixNew)))

                //Apply minNumOfServers constraints
                if (this.minServersPerTask.length > 0) {
                    let appliedMinConstraints = minNumOfServers(this.minServersPerTask, configsNew, configsServerRateMatrixNew)
                    configsNew = appliedMinConstraints.configs
                    configsServerRateMatrixNew = appliedMinConstraints.serverRates

                    console.log("Fully flexible structure configurations with minNumOfServers")
                    console.log(configsNew)

                    console.log("Fully flexible structure server rates with minNumOfServers")
                    console.log(configsServerRateMatrixNew)
                }   

                //Apply maxNumOfServers constraints
                if (this.maxServersPerTask.length > 0) {
                    let appliedMaxConstraints = maxNumOfServers(this.maxServersPerTask, configsNew, configsServerRateMatrixNew)
                    configsNew = appliedMaxConstraints.configs
                    configsServerRateMatrixNew = appliedMaxConstraints.serverRates

                    console.log("Fully flexible structure configurations with maxNumOfServers")
                    console.log(configsNew)

                    console.log("Fully flexible structure server rates with maxNumOfServers")
                    console.log(configsServerRateMatrixNew)
                }  

                //Build A matrix
                let A = buildMatrixA(configsServerRateMatrixNew, this.arrivalRates)

                //Pass A matrix to Python solver and get results
                let lpResult = solveLPinPython(A)
                
                return lpResult
            },
            solveWithoutTaskN(n) {
                let fMatrixNew = this.fMatrix

                //Modify F matrix
                for (var row in fMatrixNew) {
                    fMatrixNew[row][n] = 0
                }

                //Modify arrival rates
                let arrivalRatesNew = this.arrivalRates.slice()
                arrivalRatesNew[n] = 0

                console.log("New arrival rates: ")
                console.log(arrivalRatesNew)

                //Modify configurations
                let configsNew = this.configs.map((row) => row.map((entry) => entry === (n + 1) ? 0 : entry))
                console.log("Configurations")
                console.log(JSON.parse(JSON.stringify(configsNew)))

                //Generate server rates from configurations
                let configsServerRateMatrixNew = this.computeServerRatesOfConfigurations(configsNew, this.serverRates)
                console.log("Server rates")
                console.log(JSON.parse(JSON.stringify(configsServerRateMatrixNew)))

                //Build A matrix
                let A = buildMatrixA(configsServerRateMatrixNew, arrivalRatesNew)

                //Pass A matrix to Python solver and get results
                let lpResult = solveLPinPython(A)

                return lpResult
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
            /*solveLPinPython(A) {
                const path = `http://localhost:5000/`
                const data = A;
                const axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    }
                }

                return axios.post(path, data, axiosConfig).then(response => {
                    return response.data
                }).catch(error => {
                    console.log(error)
                })
            },*/
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
                var csvContent = ""
                
                for (var x = 0; x < file.length; x++) {
                    if (x == file.length -1 ) {
                        csvContent += file[x]
                    } else {
                        csvContent += file[x] + "\r\n"
                    }
                }

                var element = document.createElement('a')
                element.setAttribute('href', 'data:text/csv;base64,' + btoa(csvContent));
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
                if (message.length === 0) {
                    document.getElementById("import-vectors-errorMessage").innerHTML = message
                } else {
                    document.getElementById("import-vectors-errorMessage").innerHTML += '<p class="error-message">' + message + '</p>'
                }
            }
        }
    }   
</script>