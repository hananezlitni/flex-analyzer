<template>
    <section>
        <div class="import">
        <h1 class="import__title">Import Configurations</h1>
        <p class="import__subtitle"><i>Click <a v-bind:href="importConfigs.loc" download="configs">here</a> to download a sample CSV file</i></p>

        <form class="import__configurations-form" @submit="$event.preventDefault()">
            <div id="import-configs-errorMessage"></div>

            <div class="div-flex-center">
                <input type="text" id="import-configurations__file-name" class="import__file-name" placeholder="Import your configurations" readonly />
                <input type="file" id="import-configurations__file-upload" class="import__file-upload" accept=".csv" @change="getConfigurationsFromCsv"/>
                <label for="import-configurations__file-upload" class="import__file-upload-label">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512"><path fill="#dddddd" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
                    Choose a file
                </label>
            </div>

            <h2 class="import__constraints-title">Minimum Number of Servers at a Task</h2>

            <div class="div-flex-center">
                <input type="text" id="import-configurations-constraints-file-name--min" class="import__constraints-file-name" placeholder="Import your constraints (optional)" readonly />
                <input type="file" id="import-configurations-constraints-file-upload--min" class="import__file-upload" accept=".csv" @change="importMinNumOfServers"/>
                <label for="import-configurations-constraints-file-upload--min" class="import__file-upload-label">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512"><path fill="#dddddd" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
                    Choose a file
                </label>
            </div>

            <h2 class="import__constraints-title">Maximum Number of Servers at a Task</h2>

            <div class="div-flex-center">
                <input type="text" id="import-configurations-constraints-file-name--max" class="import__constraints-file-name" placeholder="Import your constraints (optional)" readonly />
                <input type="file" id="import-configurations-constraints-file-upload--max" class="import__file-upload" accept=".csv" @change="importMaxNumOfServers"/>
                <label for="import-configurations-constraints-file-upload--max" class="import__file-upload-label">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512"><path fill="#dddddd" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
                    Choose a file
                </label>
            </div>
        </form>
    </div>

    <LoadingSpinner :loading="isLoading" />

    <div id="import-configs-result" class="result"></div>

    <br>

    <div class="div-flex-center buttons-div">
        <button class="button button--action button--not-filled" @click="clearAll">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 448 512">
                <path fill="#c7d6e9" d="M53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32zm70.11-175.8l89.38-94.26a15.41 15.41 0 0 1 22.62 0l89.38 94.26c10.08 10.62 2.94 28.8-11.32 28.8H256v112a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16V320h-57.37c-14.26 0-21.4-18.18-11.32-28.8zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/>
            </svg>
            Clear All
        </button>
        
        <button class="button button--action primary" type="submit" @click="solveLP"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512">
                <path fill="#13191f" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"/>
            </svg>
            Submit Structure
        </button>
    </div>
    </section>
</template>

<style lang="scss" scoped>
    .import__configurations-form {
        display: flex;
        flex-direction: column;
        align-self: center;
        align-items: center;
    }
    .div-flex-center {
        margin-bottom: 3em;
    }
    .import__title {
        margin-bottom: 0.75em;
    }
</style>

<script>
    import importConfigs from "../files/import-configurations--valid.csv"    
    import { minNumOfServers, maxNumOfServers } from '../services/constraints.js'
    import { buildMatrixA } from '../services/data-processing.js'
    import { solveLPinPython } from '../services/solver.js'
    import LoadingSpinner from '../components/LoadingSpinner'

    export default {
        components: {
            LoadingSpinner
        },
        data() {
            return {
                importConfigs: { title: 'import-configs', loc: require('../files/import-configurations--valid.csv') },
                isLoading: false,
                numberOfTasks: 0,
                numberOfServers: 0,
                arrivalRatesVector: [],
                configurations: [],
                serviceRatesMatrix: [],
                minNumOfServersPerTask: [],
                maxNumOfServersPerTask: [],
                arrivalRatesVectorValid: true,
                configurationsValid: true,
                serviceRatesMatrixValid: true
            }
        },
        methods: {
            /********** Import configurations **********/
            getConfigurationsFromCsv() {
                let input = document.getElementById('import-configurations__file-upload');
                var self = this

                //Reset in case there's previous content
                this.numberOfTasks = 0
                this.numberOfServers = 0
                this.arrivalRatesVector = []
                this.configurations = []
                this.serviceRatesMatrix = []
                this.minNumOfServersPerTask = [],
                this.maxNumOfServersPerTask = [],
                this.arrivalRatesVectorValid = true
                this.configurationsValid = true
                this.serviceRatesMatrixValid = true
                document.getElementById("import-configs-result").innerHTML = ""
                this.errorMessage("")

                if (input.files && input.files[0]) { 
                    var myFile = input.files[0];
                    var reader = new FileReader();

                    document.getElementById('import-configurations__file-name').value = myFile.name
                    reader.readAsBinaryString(myFile)

                    reader.onload = function (e) {
                        let csvdata = e.target.result; 
                        let lines = csvdata.split('\n')
                        
                        for (var i = 0; i < lines.length; i++) {
                            lines[i] = lines[i].replace(/['"]+/g, '')
                        }

                        self.numberOfTasks = parseInt(lines[1])
                        self.numberOfServers = parseInt(lines[3])

                        //Arrival rates
                        if (lines[5] !== undefined) {
                            self.arrivalRatesVector = lines[5].split(',').map((entry) => parseFloat(entry))
                        }

                        //Configurations
                        let count = 0
                        for (var i = 7; i < lines.length; i++) {
                            if (lines[i] !== undefined || lines[i] !== '') {
                                if (lines[i].trim().toLowerCase() === "service rates:") {
                                    break
                                } else {
                                    self.configurations[count++] = lines[i].split(',').map((entry) => parseInt(entry))
                                }
                            } else {
                                break
                            }
                        }

                        //Service rates
                        count = 0
                        for (var j = 7 + self.configurations.length + 1; j < lines.length; j++) {  
                            if (lines[j] !== undefined || lines[j] !== '') {
                                self.serviceRatesMatrix[count++] = lines[j].split(',').map((entry) => parseFloat(entry))
                            } else {
                                break
                            }
                        }

                        //validate inputs
                        self.validateArrivalRates()
                        self.validateConfigurations()
                        self.validateServiceRatesMatrix()
                    };
                }
            },
            validateArrivalRates() {
                //Length of arrival rates equals to number of tasks
                if (this.arrivalRatesVector.length !== this.numberOfTasks) {
                    this.arrivalRatesVectorValid = false
                    this.errorMessage("Error: The length of the arrival rates vector is incorrect.")
                }

                //Check for negative values in arrival rates
                if (this.arrivalRatesVector.some(v => v < 0)) {
                    this.arrivalRatesVectorValid = false
                    this.errorMessage("Error: The arrival rates vector should not contain negative values.")
                }
            },
            validateConfigurations() {
                //Length of each configuration equals to number of servers
                if(this.configurations.some((config) => config.length !== this.numberOfServers)) {
                    this.configurationsValid = false
                    this.errorMessage("The length of a configuration should equal to the number of servers.")
                }

                //Valid entries in configs
                if(this.configurations.some((config) => config.some((entry) => entry > this.numberOfTasks))) {
                    this.configurationsValid = false
                    this.errorMessage("The configurations should not contain a number greater than " + this.numberOfTasks)
                }

                //Negative values in configs
                if(this.configurations.some((config) => config.some((entry) => entry < 0))) {
                    this.configurationsValid = false
                    this.errorMessage("The configurations should not contain negative values.")
                }
            },
            validateServiceRatesMatrix() {
                //Length of each server rate vector equals to number of tasks
                if(this.serviceRatesMatrix.some((vector) => vector.length !== this.numberOfTasks)) {
                    this.serviceRatesMatrixValid = false
                    this.errorMessage("The length of a service rate vector should equal to the number of tasks.")
                }

                //Negative values in server rate matrix
                if(this.serviceRatesMatrix.some((vector) => vector.some((entry) => entry < 0))) {
                    this.serviceRatesMatrixValid = false
                    this.errorMessage("The service rate vectors should not contain negative values.")
                }
            },
            importMinNumOfServers() {
                let minConstraint = document.getElementById('import-configurations-constraints-file-upload--min')
                var self = this
                
                //If user imported min # of servers per task
                if (minConstraint.files && minConstraint.files[0]) {
                    //Store constraints
                    var myFile = minConstraint.files[0];
                    var reader = new FileReader();

                    document.getElementById('import-configurations-constraints-file-name--min').value = myFile.name
                    reader.readAsBinaryString(myFile)

                    reader.onload = function (e) {
                        let csvConstraints = e.target.result;
                        let constraints = csvConstraints.split('\n')

                        for (var i = 0; i < constraints.length; i++) {
                            constraints[i] = constraints[i].replace(/['"]+/g, '')
                        }

                        self.minNumOfServersPerTask = constraints[1].split(',').map(Number)

                        let appliedConstraints = minNumOfServers(self.minNumOfServersPerTask, self.configurations, self.serviceRatesMatrix)
                        self.configurations = appliedConstraints.configs
                        self.serviceRatesMatrix = appliedConstraints.serviceRates
                    }
                }
            },
            importMaxNumOfServers() {
                let maxConstraint = document.getElementById('import-configurations-constraints-file-upload--max')
                var self = this
                
                //If user imported max # of servers per task
                if (maxConstraint.files && maxConstraint.files[0]) {
                    //Store constraints
                    var myFile = maxConstraint.files[0];
                    var reader = new FileReader();

                    document.getElementById('import-configurations-constraints-file-name--max').value = myFile.name
                    reader.readAsBinaryString(myFile)

                    reader.onload = function (e) {
                        let csvConstraints = e.target.result;
                        let constraints = csvConstraints.split('\n')

                        for (var i = 0; i < constraints.length; i++) {
                            constraints[i] = constraints[i].replace(/['"]+/g, '')
                        }

                        self.maxNumOfServersPerTask = constraints[1].split(',').map(Number)

                        let appliedConstraints = maxNumOfServers(self.maxNumOfServersPerTask, self.configurations, self.serviceRatesMatrix)
                        self.configurations = appliedConstraints.configs
                        self.serviceRatesMatrix = appliedConstraints.serviceRates
                    }
                }
            },
            async solveLP() {
                this.isLoading = true

                //scroll to div
                this.$el.querySelector("#import-configs-result").scrollIntoView(true)
                
                //Check if arrival rates are empty
                if (this.arrivalRatesVector === undefined || this.arrivalRatesVector.length === 0) {
                    this.arrivalRatesVectorValid = false
                    this.errorMessage("The arrival rates vector is empty.")
                } 
                
                //Check if server rates are empty
                if (this.serviceRatesMatrix === undefined || this.serviceRatesMatrix.length === 0) {
                    this.serviceRatesMatrixValid = false
                    this.errorMessage("The server rates matrix is empty.")
                }

                //If all is valid solve LP
                if (this.arrivalRatesVector.length > 0 && this.serviceRatesMatrix.length > 0 && this.arrivalRatesVectorValid && this.configurationsValid && this.serviceRatesMatrixValid) {
                    this.errorMessage("")

                    //Build A matrix
                    let A = buildMatrixA(this.serviceRatesMatrix, this.arrivalRatesVector)

                    //Solve optimization problem
                    let results = {}
                    
                    //Original problem
                    results["lp"] = (await solveLPinPython(A)).replace(/'/g, '"') //new

                    //Display output
                    this.isLoading = false
                    document.getElementById('import-configs-result').innerHTML = '<h1 class="result__title">Results</h1>'
                    document.getElementById('import-configs-result').innerHTML += '<p class="lp-result"><b>The capacity of the submitted structure is: </b>' + JSON.parse(results["lp"]).output.gamma.toFixed(5) + '</p>'
                }
            },
            clearAll() {
                document.getElementById('import-configurations__file-name').value = ""
                document.getElementById('import-configurations__file-upload').value = null
                document.getElementById('import-configurations-constraints-file-name--min').value = ""
                document.getElementById('import-configurations-constraints-file-upload--min').value = null
                document.getElementById('import-configurations-constraints-file-name--max').value = ""
                document.getElementById('import-configurations-constraints-file-upload--max').value = null
                document.getElementById("import-configs-result").innerHTML = ""
                this.errorMessage("")

                //Reset all data
                this.numberOfTasks = 0
                this.numberOfServers = 0
                this.configurations = []
                this.serviceRatesMatrix = []
                this.arrivalRatesVector = []
                this.minNumOfServersPerTask = []
                this.maxNumOfServersPerTask = []
                this.arrivalRatesVectorValid = true
                this.configurationsValid = true
                this.serviceRatesMatrixValid = true
            },
            /********** Helper functions **********/
            errorMessage(message) {
                if (message.length === 0) {
                    document.getElementById("import-configs-errorMessage").innerHTML = message
                } else {
                    this.isLoading = false
                    document.getElementById("import-configs-errorMessage").innerHTML += '<p class="error-message">' + message + '</p>'
                }
            }
        }
    }
</script>