<template>
    <section>
        <div class="import">
        <h1 class="import__title">Import a Structure: Configurations</h1>
        <p class="import__note"><i>Please use the form below to import a structure as configurations. Please read <a href="/documentation" target="_blank">the documentation</a> for information about the format of the content.</i></p>

        <form class="import__configurations-form" @submit="$event.preventDefault()">
            <div class="buttons-div">
                <input type="text" id="import-configurations__file-name" class="import__file-name" readonly />
                <input type="file" id="import-configurations__file-upload" class="import__file-upload" @change="getConfigurationsFromCsv" />
                <label for="import-configurations__file-upload" class="import__file-upload-label">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512"><path fill="#dddddd" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
                    Choose a file
                </label>
            </div>

            <p id="errorMessage"></p>

            <input class="button button--action primary import__button" type="submit" value="Get Results">
        </form>
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
    .import__configurations-form__textarea {
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
        margin: 0 auto;
        &::placeholder {
            font-style: italic;
        }
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
        /********** Helper functions **********/
        errorMessage(message) {
            document.getElementById("errorMessage").innerHTML += message
        }
    }
}
</script>