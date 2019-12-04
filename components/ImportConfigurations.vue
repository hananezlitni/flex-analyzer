<template>
    <section>
        <div class="import">
        <h1 class="import__title">Import a Structure: Configurations</h1>

        <form class="import__configurations-form" @submit="$event.preventDefault()">
            <p id="errorMessage"></p>

            <div class="div-flex-center">
                <input type="text" id="file-name" class="import__file-name" placeholder="Import your vectors" readonly />
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

    <div id="result" class="result"></div>

    <br>

    <div class="div-flex-center buttons-div">
        <button class="button button--action button--not-filled" @click="clearAll">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 448 512">
                <path fill="#c7d6e9" d="M53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32zm70.11-175.8l89.38-94.26a15.41 15.41 0 0 1 22.62 0l89.38 94.26c10.08 10.62 2.94 28.8-11.32 28.8H256v112a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16V320h-57.37c-14.26 0-21.4-18.18-11.32-28.8zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/>
            </svg>
            Clear All
        </button>
        
        <button class="button button--action primary" type="submit" @click="submitStructure"> 
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
</style>

<script>
export default {
    data() {
        return {
            numOfTasks: 0,
            numOfServers: 0,
            configurations: [],
            serverRateMatrix: []
        }
    },
    methods: {
        /********** Import configurations **********/
        getConfigurationsFromCsv() {
          console.log("Hello")
          let input = document.getElementById('import-configurations__file-upload');
          var self = this

          if (input.files && input.files[0]) { 
              
              var myFile = input.files[0];
              var reader = new FileReader();

              document.getElementById('import-configurations__file-name').value = myFile.name
              reader.readAsBinaryString(myFile)

              reader.onload = function (e) {
                  let csvdata = e.target.result; 
                  /*let lines = csvdata.split('\n');
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
                  } */
              };
          }
        },
        validateConfigurations() {
            //Length of each configuration equals to number of servers
            if(!this.configurations.every((config) => config.length === this.numOfServers)) {
                this.errorMessage("The length of a configuration should equal to the number of servers.")
            }

            //Valid entries in configs
            if(!this.configurations.every((config) => config.every((entry) => entry <= this.numOfTasks))) {
                this.errorMessage("The configurations should not contain a number greater than " + this.numOfTasks)
            }

            //Negative values in configs
            if(!this.configurations.every((config) => config.every((entry) => entry > 0))) {
                this.errorMessage("The configurations should not contain negative values.")
            }
        },
        validateServerRateMatrix() {
            //Length of each server rate vector equals to number of tasks
            if(!this.serverRateMatrix.every((vector) => vector.length === this.numOfTasks)) {
                this.errorMessage("The length of a server rate vector should equal to the number of tasks.")
            }

            //Negative values in server rate matrix
            if(!this.serverRateMatrix.every((vector) => vector.every((entry) => entry > 0))) {
                this.errorMessage("The server rate vectors should not contain negative values.")
            }
        },
        importMinNumOfServers() {},
        importMaxNumOfServers() {},
        submitStructure() {},
        clearAll() {},
        /********** Helper functions **********/
        errorMessage(message) {
            document.getElementById("errorMessage").innerHTML += message
        }
    }
}
</script>