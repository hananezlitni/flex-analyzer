<template>
    <section>
        <div class="import">
            <h1 class="import__title">
                Import a Structure
                <svg class="info-icon" @click="showImportStructureModal = true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>More information</title>
                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1.25 17c0 .69-.559 1.25-1.25 1.25-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25zm1.393-9.998c-.608-.616-1.515-.955-2.551-.955-2.18 0-3.59 1.55-3.59 3.95h2.011c0-1.486.829-2.013 1.538-2.013.634 0 1.307.421 1.364 1.226.062.847-.39 1.277-.962 1.821-1.412 1.343-1.438 1.993-1.432 3.468h2.005c-.013-.664.03-1.203.935-2.178.677-.73 1.519-1.638 1.536-3.022.011-.924-.284-1.719-.854-2.297z"/>
                </svg>
            </h1>

            <form class="import__vectors-form" @submit="$event.preventDefault()">
                <div class="div-flex-center">
                    <input type="text" id="file-name" class="import__file-name" placeholder="Import your structure" readonly />
                    <input type="file" id="file-upload" class="import__file-upload" accept=".csv" @change="displayCsvDataInTextArea"/>
                    <label for="file-upload" class="import__file-upload-label">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512"><path fill="#dddddd" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
                        Choose a file
                    </label>
                </div>

                <div id="import-vectors-errorMessage"></div>

                <!--@keyup="parseCsvData($event)"-->
                <textarea placeholder="Structure..." id="textArea" class="import__vectors-form__textarea">
Number of Tasks:
3
Number of Servers:
3
Arrival Rates:
64,53,123
Service Rates:
2,1,4
4,0,1
0,2,0
F Matrix:
1,1,1
1,0,1
0,1,0</textarea>

                <h2 class="import__constraints-title import__constraints-title--h2">
                    Constraints
                    <svg class="info-icon" @click="showConstraintsModal = true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>More information</title>
                        <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1.25 17c0 .69-.559 1.25-1.25 1.25-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25zm1.393-9.998c-.608-.616-1.515-.955-2.551-.955-2.18 0-3.59 1.55-3.59 3.95h2.011c0-1.486.829-2.013 1.538-2.013.634 0 1.307.421 1.364 1.226.062.847-.39 1.277-.962 1.821-1.412 1.343-1.438 1.993-1.432 3.468h2.005c-.013-.664.03-1.203.935-2.178.677-.73 1.519-1.638 1.536-3.022.011-.924-.284-1.719-.854-2.297z"/>
                    </svg>
                </h2>
                <h3 class="import__constraints-title import__constraints-title--h3">Minimum Number of Servers at a Task</h3>

                <div class="div-flex-center">
                    <input type="text" id="import-vectors-constraints-file-name--min" class="import__constraints-file-name" placeholder="Import your constraints (optional)" readonly />
                    <input type="file" id="import-vectors-constraints-file-upload--min" class="import__file-upload" accept=".csv" @change="minNumOfServers" />
                    <label for="import-vectors-constraints-file-upload--min" class="import__file-upload-label">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512"><path fill="#dddddd" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
                        Choose a file
                    </label>
                </div>

                <br><br>    

                <h3 class="import__constraints-title import__constraints-title--h3">Maximum Number of Servers at a Task</h3>

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

        <LoadingSpinner :loading="isLoading" />

        <div id="import-vectors-result" class="result"></div>

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
        <app-modal v-if="showImportStructureModal" @close="showImportStructureModal = false">
            <div slot="download-button" class="button-group">
                <a class="download-button" v-bind:href="importStructureCSV.loc" download="import-structure">
                    <button class="button button--action button--not-filled">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512">
                        <path fill="#dddddd" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/>
                    </svg>
                    Sample CSV file
                    </button>
                </a>
                <a class="download-button" v-bind:href="configsScriptJS.loc" download="configs">
                    <button class="button button--action button--not-filled">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512">
                        <path fill="#dddddd" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/>
                    </svg>
                    Configs script
                    </button>
                </a>
            </div>
            <section slot="modal-content" v-html="ImportingStructures"></section>
        </app-modal>
        <app-modal v-if="showConstraintsModal" @close="showConstraintsModal = false">
            <div slot="download-button" class="div-flex-center download-button">
                <a v-bind:href="importConstraintsCSV.loc" download="constraints">
                    <button class="button button--action button--not-filled">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512">
                        <path fill="#dddddd" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/>
                    </svg>
                    Sample CSV file
                    </button>
                </a>
            </div>
            <section slot="modal-content" v-html="ImportingConstraints"></section>
        </app-modal>
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
    import marked from 'marked';
    import importingStructuresMD from '~/data/ImportStructures.md';
    import importingConstraintsMD from '~/data/ImportConstraints.md';
    import { minNumOfServers, maxNumOfServers } from '../services/constraints.js'
    import { buildMatrixA } from '../services/data-processing.js'
    import { solveLPinPython } from '../services/solver.js'
    import LoadingSpinner from '../components/LoadingSpinner'
    import AppModal from "~/components/AppModal.vue";

    export default {
        components: {
            LoadingSpinner,
            AppModal
        },
        data() {
            return {
                showImportStructureModal: false,
                ImportingStructures: marked(importingStructuresMD),
                importStructureCSV: { title: 'import-structure', loc: require('~/files/import-structure.csv') },
                showConstraintsModal: false,
                ImportingConstraints: marked(importingConstraintsMD),
                importConstraintsCSV: { title: 'constraints', loc: require('~/files/constraints-max.csv') },
                configsScriptJS: { title: 'configs', loc: require('~/assets/configs.js') },
                isLoading: false,
                numOfTasks: 5,
                numOfServers: 5,
                fMatrix: [],
                arrivalRates: [],
                serviceRates: [],
                numOfConfigs: 0,
                configs: [],
                configsServiceRatesMatrix: [],
                minServersPerTask: [],
                maxServersPerTask: [],
                fMatrixValid: true,
                arrivalRatesValid: true,
                serviceRatesValid: true,
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
            
                //Reset all data
                this.numOfTasks = 5
                this.numOfServers = 5
                this.fMatrix = []
                this.arrivalRates = []
                this.serviceRates = []
                this.numOfConfigs = 0
                this.configs = []
                this.configsServiceRatesMatrix = []
                this.fMatrixValid = true
                this.arrivalRatesValid = true
                this.serviceRatesValid = true
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
                this.serviceRates = []
                this.numOfConfigs = 0
                this.configs = []
                this.configsServiceRatesMatrix = []
                this.fMatrixValid = true
                this.arrivalRatesValid = true
                this.serviceRatesValid = true
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
                        console.log(textarea.value)
                        let values = textarea.value.split("\n")

                        //Store number of tasks and servers
                        if (values[0] !== '' && values[0] !== undefined) {
                            if (values[0].trim().toLowerCase() === 'number of tasks:') {
                                self.numOfTasks = parseInt(values[1])
                            } else {
                                self.errorMessage('The number of tasks is missing')
                            }
                        } else {
                            self.errorMessage('The number of tasks is missing')
                        }

                        if (values[2] !== '' && values[2] !== undefined) {
                            if (values[2].trim().toLowerCase() === 'number of servers:') {
                                self.numOfServers = parseInt(values[3])
                            } else {
                                self.errorMessage('The number of tasks is missing')
                            }
                        } else {
                            self.errorMessage('The number of tasks is missing')
                        }
                        
                        //Store arrival rates
                        if (values[4] !== '' && values[4] !== undefined) {
                            if (values[4].trim().toLowerCase() === 'arrival rates:') {
                                self.arrivalRates = values[5].split(',').map((entry) => parseFloat(entry))
                            } else {
                                self.errorMessage('The arrival rates vector is empty')
                            }
                        } else {
                            self.errorMessage('The arrival rates vector is empty')
                        }

                        //Store F matrix
                        let fMatrixStart = 7 + self.numOfServers + 1

                        if (values[fMatrixStart - 1] !== '' && values[fMatrixStart - 1] !== undefined) {
                            if (values[fMatrixStart - 1].trim().toLowerCase() === 'f matrix:') {
                                let count = 0
                                for (i = fMatrixStart; i < values.length; i++) {
                                    if (values[i] !== undefined || values[i] !== '') {
                                        self.fMatrix[count++] = values[i].split(',').map((entry) => entry.includes('.') ? self.fMatrixValid = false : parseInt(entry))

                                        if (self.fMatrixValid === false) {
                                            self.errorMessage('Error: The F matrix should only contain 0 and 1')
                                            break
                                        } else {
                                            continue
                                        }
                                    } else {
                                        self.errorMessage('Error: The F matrix is empty')
                                        break
                                    }
                                }
                            } else {
                                self.errorMessage('The F matrix is empty')
                            }
                        } else {
                            self.errorMessage('The F matrix is empty')
                        }

                        //Store service rates matrix
                        if (values[6] !== '' && values[6] !== undefined) {
                            if (values[6].trim().toLowerCase() === 'service rates:') {
                                let counter = 0
                                for (var l = 7; l < fMatrixStart - 1; l++) {
                                    if (values[l] !== undefined || values[l] !== '') {
                                        self.serviceRates[counter++] = values[l].split(',').map((entry) => parseFloat(entry))
                                    } else {
                                        self.errorMessage('Error: The service rates matrix is empty')
                                        break
                                    }
                                }
                            } else {
                                self.errorMessage('The service rates matrix is empty')
                            }
                        } else {
                            self.errorMessage('The service rates matrix is empty')
                        }
                        
                        //Number of configurations
                        if (self.fMatrix.length > 0 && self.fMatrixValid === true) {
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
                        } 
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
                this.serviceRates = []
                this.numOfConfigs = 0
                this.configs = []
                this.configsServiceRatesMatrix = []
                this.fMatrixValid = true
                this.arrivalRatesValid = true
                this.serviceRatesValid = true
                document.getElementById("figure").innerHTML = ""
                document.getElementById("import-vectors-result").innerHTML = ""
                this.errorMessage("")
                
                //Store inputs
                let values = textarea.value.split("\n")

                //Store number of tasks and servers
                if (values[0] !== '' && values[0] !== undefined) {
                    if (values[0].trim().toLowerCase() === 'number of tasks:') {
                        this.numOfTasks = parseInt(values[1])
                    } else {
                        this.errorMessage('The number of tasks is missing')
                    }
                } else {
                    this.errorMessage('The number of tasks is missing')
                }

                if (values[2] !== '' && values[2] !== undefined) {
                    if (values[2].trim().toLowerCase() === 'number of servers:') {
                        this.numOfServers = parseInt(values[3])
                    } else {
                        this.errorMessage('The number of tasks is missing')
                    }
                } else {
                    this.errorMessage('The number of tasks is missing')
                }

                //Store arrival rates
                if (values[4] !== '' && values[4] !== undefined) {
                    if (values[4].trim().toLowerCase() === 'arrival rates:') {
                        this.arrivalRates = values[5].split(',').map((entry) => parseFloat(entry))
                    } else {
                        this.errorMessage('The arrival rates vector is empty')
                    }
                } else {
                    this.errorMessage('The arrival rates vector is empty')
                }
                
                //Store F matrix
                let fMatrixStart = 7 + this.numOfServers + 1

                if (values[fMatrixStart - 1] !== '' && values[fMatrixStart - 1] !== undefined) {
                    if (values[fMatrixStart - 1].trim().toLowerCase() === 'f matrix:') {
                        let count = 0
                        for (i = fMatrixStart; i < values.length; i++) {
                            if (values[i] !== undefined || values[i] !== '') {
                                this.fMatrix[count++] = values[i].split(',').map((entry) => entry.includes('.') ? this.fMatrixValid = false : parseInt(entry))

                                if (this.fMatrixValid === false) {
                                    this.errorMessage('Error: The F matrix should only contain 0 and 1')
                                    break
                                } else {
                                    continue
                                }
                            } else {
                                this.errorMessage('Error: The F matrix is empty')
                                break
                            }
                        }
                    } else {
                        this.errorMessage('The F matrix is empty')
                    }
                } else {
                    this.errorMessage('The F matrix is empty')
                }

                //Store service rates matrix
                if (values[6] !== '' && values[6] !== undefined) {
                    if (values[6].trim().toLowerCase() === 'service rates:') {
                        let counter = 0
                        for (var l = 7; l < fMatrixStart - 1; l++) {
                            if (values[l] !== undefined || values[l] !== '') {
                                this.serviceRates[counter++] = values[l].split(',').map((entry) => parseFloat(entry))
                            } else {
                                this.errorMessage('Error: The service rates matrix is empty')
                                break
                            }
                        }
                    } else {
                        this.errorMessage('The service rates matrix is empty')
                    }
                } else {
                    this.errorMessage('The service rates matrix is empty')
                }

                //Number of configurations
                if (this.fMatrix.length > 0 && this.fMatrixValid === true) {
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
                }

                //Validate inputs
                this.validateInputs()
            },
            validateInputs() {
                //Reset
                this.arrivalRatesValid = true
                this.serviceRatesValid = true
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
                
                //Validate service rates
                if (this.serviceRates === undefined || this.serviceRates.length === 0) {
                    this.serviceRatesValid = false
                    this.errorMessage("Error: The service rates matrix is empty.")
                } else {
                    //Check serviceRates dimensions
                    for (var j = 0; j < this.serviceRates.length; j++) {
                        if (this.serviceRates.length !== this.numOfServers || this.serviceRates[j].length !== this.numOfTasks) {
                            this.serviceRatesValid = false
                            this.errorMessage("Error: The dimensions of the service rates matrix are incorrect.")
                            break
                        } 
                    }

                    for (var j = 0; j < this.serviceRates.length; j++) {
                        //Check for negative values in service rates
                        if (this.serviceRates[j].some(v => v < 0)) {
                            this.serviceRatesValid = false
                            this.errorMessage("Error: The service rates matrix should not contain negative values.")
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
                    }
                }
            },
            async solveOptimizationProblem() {
                //this.$nuxt.$loading.start()
                this.isLoading = true

                //scroll to div
                this.$el.querySelector("#import-vectors-result").scrollIntoView(true)

                //Store inputs in case user changes values in the textarea
                this.storeInputs()

                if (this.arrivalRatesValid && this.serviceRatesValid && this.fMatrixValid) {
                    this.errorMessage("")

                    //Solve optimization problem
                    let results = {}
                    
                    //Original problem
                    results["originalProblem"] = (await this.solveOriginalProblem()).replace(/'/g, '"') //new

                    //Fully Flexible Structure
                    results["fullyFlexible"] = (await this.solveForFullyFlexibleStructure()).replace(/'/g, '"') //new

                    //Remove Task n
                    for (var n = 0; n < this.numOfTasks; n++) {
                        results["noTask" + (n + 1)] = (await this.solveWithoutTaskN(n)).replace(/'/g, '"') //new
                    }

                    //Display output
                    this.isLoading = false
                    document.getElementById('import-vectors-result').innerHTML = '<h1 class="result__title">Results</h1>'
                    document.getElementById('import-vectors-result').innerHTML += '<p class="lp-result"><b>The capacity of the submitted structure is: </b>' + JSON.parse(results["originalProblem"]).output.gamma.toFixed(5) + '</p>'
                    document.getElementById('import-vectors-result').innerHTML += '<p class="lp-result"><b>The capacity of the fully flexible structure is: </b>' + JSON.parse(results["fullyFlexible"]).output.gamma.toFixed(5) + '</p><br>'
                    if (JSON.parse(results["originalProblem"]).output.gamma.toFixed(5) >= JSON.parse(results["fullyFlexible"]).output.gamma.toFixed(5)) {
                        document.getElementById('import-vectors-result').innerHTML += '<p class="lp-result">The submitted structure is as efficient as a fully flexible system.</p>'
                    } else {
                        document.getElementById('import-vectors-result').innerHTML += '<p class="lp-result">The submitted structure is <em>not</em> as efficient as a fully flexible system.</p>'
                    }
                    document.getElementById('import-vectors-result').innerHTML += '<p class="asterisks">*****</p>'

                    for (var i = 1; i <= this.numOfTasks; i++) {
                        document.getElementById('import-vectors-result').innerHTML += '<p class="lp-result"><b>The capacity of the structure when task <em>' + i + '</em> is removed: </b>' + JSON.parse(results["noTask" + i]).output.gamma.toFixed(5) + '</p>'
                    }
                }
            },
            solveOriginalProblem() {
                //Generate configurations
                this.configs = this.computeConfigurations(this.numOfServers, this.numOfTasks, this.fMatrix)

                //Export configs
                this.export('configurations', this.configs)

                //Generate service rates from configurations
                this.configsServiceRatesMatrix = this.computeServiceRatesOfConfigurations(this.configs, this.serviceRates)

                //Apply minNumOfServers constraints
                if (this.minServersPerTask.length > 0) {
                    let appliedMinConstraints = minNumOfServers(this.minServersPerTask, this.configs, this.configsServiceRatesMatrix)
                    this.configs = appliedMinConstraints.configs
                    this.configsServiceRatesMatrix = appliedMinConstraints.serviceRates
                }   

                //Apply maxNumOfServers constraints
                if (this.maxServersPerTask.length > 0) {
                    let appliedMaxConstraints = maxNumOfServers(this.maxServersPerTask, this.configs, this.configsServiceRatesMatrix)
                    this.configs = appliedMaxConstraints.configs
                    this.configsServiceRatesMatrix = appliedMaxConstraints.serviceRates
                }  

                //Build A matrix
                //let A = ["-2,-2,0,-1,-1,64", "-3,0,-5,-5,-2,53", "-1,-3,-1,0,-3,123", "1,1,1,1,1,0"]
                let A = buildMatrixA(this.configsServiceRatesMatrix, this.arrivalRates)

                //Export service rates after applying constraints (if any)
                this.export('service-rate-matrix', this.configsServiceRatesMatrix)

                //Pass A matrix to Python solver and get results
                let lpResult = solveLPinPython(A)
                
                return lpResult
            },
            solveForFullyFlexibleStructure() {
                let configsNew = []
                let configsServiceRatesMatrixNew = []

                //Generate configurations
                configsNew = this.computeConfigurations(this.numOfServers, this.numOfTasks, new Array(this.numOfServers).fill(new Array(this.numOfTasks).fill(1)))

                //Generate service rates from configurations
                configsServiceRatesMatrixNew = this.computeServiceRatesOfConfigurations(configsNew, this.serviceRates)

                //Apply minNumOfServers constraints
                if (this.minServersPerTask.length > 0) {
                    let appliedMinConstraints = minNumOfServers(this.minServersPerTask, configsNew, configsServiceRatesMatrixNew)
                    configsNew = appliedMinConstraints.configs
                    configsServiceRatesMatrixNew = appliedMinConstraints.serviceRates
                }   

                //Apply maxNumOfServers constraints
                if (this.maxServersPerTask.length > 0) {
                    let appliedMaxConstraints = maxNumOfServers(this.maxServersPerTask, configsNew, configsServiceRatesMatrixNew)
                    configsNew = appliedMaxConstraints.configs
                    configsServiceRatesMatrixNew = appliedMaxConstraints.serviceRates
                }  

                //Build A matrix
                let A = buildMatrixA(configsServiceRatesMatrixNew, this.arrivalRates)

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

                //Modify configurations
                let configsNew = this.configs.map((row) => row.map((entry) => entry === (n + 1) ? 0 : entry))

                //Generate service rates from configurations
                let configsServiceRatesMatrixNew = this.computeServiceRatesOfConfigurations(configsNew, this.serviceRates)

                //Build A matrix
                let A = buildMatrixA(configsServiceRatesMatrixNew, arrivalRatesNew)

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
            computeServiceRatesOfConfigurations(configs, serviceRates) {
                //Reset
                this.configsServiceRatesMatrix = []

                let serverRateMatrix = []

                //Set all entries of serverRateMatrix to zeros
                for (var i = 0; i < configs.length; i++) {
                    serverRateMatrix[i] = (new Array(this.numOfTasks)).fill(0) //Length of one entry in matrix equals to num of tasks
                }

                //Update serverRateMatrix with service rates where appropriate
                for (var z = 0; z < configs.length; z++) {
                    for (var l = 0; l < configs[z].length; l++) {
                        if (configs[z][l] === 0) {
                            continue
                        } else {
                            serverRateMatrix[z][configs[z][l] - 1] = serviceRates[l][configs[z][l] - 1]
                        }
                    }

                    //If multiple servers are at the same task, add the corresponding service rates. 
                    //The implementation also takes into consideration if there are duplicates of more than 1 task.
                    var dups = this.getDuplicates(configs[z])

                    if (Object.keys(dups).length > 0) {
                        var duplicatedTasks = Object.keys(dups)

                        if (Object.keys(dups).includes("0") === false) {
                            for (var n = 0; n < duplicatedTasks.length; n++) {
                                var serverRateSum = 0

                                for (var server in dups[duplicatedTasks[n]]) {
                                serverRateSum += serviceRates[parseInt(dups[duplicatedTasks[n]][parseInt(server)])][parseInt(duplicatedTasks[n]) - 1]
                                }
                            
                                serverRateMatrix[z][parseInt(duplicatedTasks[n]) - 1] = serverRateSum
                            }
                        }
                    }
                }

                return serverRateMatrix
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
                
                textarea.value = "Number of Tasks:" + "\n" + this.numOfTasks + "\n" + "Number of Servers:" + "\n" + this.numOfServers + "\n" + "Arrival Rates:" + "\n" + this.arrivalRates + "\n" + "Service Rates:" + "\n"

                for (var z = 0; z < this.serviceRates.length; z++) {
                    textarea.value += this.serviceRates[z] + "\n"
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
                    this.isLoading = false
                    document.getElementById("import-vectors-errorMessage").innerHTML += '<p class="error-message">' + message + '</p>'
                }
            }
        }
    }   
</script>