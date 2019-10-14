<template>
    <main>
        <tabs>
            <tab name="Import Vectors" :selected="true">
                <div class="import">
                    <h1 class="import__title">Import a Structure: Vectors</h1>
                    <p class="import__note"><i>Please use the form below to import a structure as vectors. Please read <a href="/">the documentation</a> for information about the format of the content.</i></p>

                    <form class="import__vectors-form" @submit="$event.preventDefault()">
                        <input type="file" id="file-upload" class="import__vectors-form__input" @change="getCsvVectors($event)" />
                        <label for="file-upload" class="import__vectors-form__label">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512"><path fill="#dddddd" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
                            Choose a file
                        </label>

                        <p id="errorMessage"></p>
                        
                        <textarea placeholder="Vectors..." id="textArea" class="import__vectors-form__textarea" @keyup="getCsvData($event)" />
                        <input class="button button--action primary import__button" type="submit" value="Generate Figure" @click="generateFigure">
                    </form>
                </div>
                <div id="figure"></div> 
            </tab>
            <tab name="Import Configurations">
                <div class="import">
                    <h1 class="import__title">Import a Structure: Configurations</h1>
                    <p class="import__note"><i>Please use the form below to import a structure as configurations. Please read <a href="/">the documentation</a> for information about the format of the content.</i></p>

                    <form class="import__configurations-form" @submit="$event.preventDefault()">
                        <input type="file" id="file-upload" class="import__configurations-form__input" @change="getCsvConfigurations($event)" />
                        <label for="file-upload" class="import__vectors-form__label">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512"><path fill="#dddddd" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
                            Choose a file
                        </label>

                        <p id="errorMessage"></p>

                        <textarea placeholder="Configurations..." class="import__configurations-form__textarea" />
                        <input class="button button--action primary import__button" type="submit" value="Generate Figure" @click="loadConfigurations">
                    </form>
                </div>
            </tab>
        </tabs>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js" />
    </main>
</template>

<script>
    import * as d3 from "d3";
    import Tab from '../../components/Tab';
    import Tabs from '../../components/Tabs';
    import initCanvas from '../../services/structure'

    export default {
        name: 'ImportTool',
        components: {
            Tab, Tabs, initCanvas
        },
        data() {
            return {
                tabs: [],
                numOfTasks: 5,
                numOfServers: 5,
                fVector: [],
                fVectorValid: true            
            };
        },
        created() {
                this.tabs = this.$children; 
        },
        methods: {
            selectTab(selectedTab) {
                this.tabs.forEach(tab => {
                    tab.isActive = (tab.name == selectedTab.name);
                });
            },
            generateFigure() {
                if (this.fVector === undefined || this.fVector.length == 0) {
                    this.errorMessage("Error: The f vector is empty.")
                } else {
                    //Check fvector values are 0s and 1s only
                    for (var i = 0; i < this.fVector.length; i++) {
                        if (this.fVector[i].every(item => item === "0" || item === "1") === false) {
                            this.fVectorValid = false
                            document.getElementById("figure").innerHTML = ""
                            this.errorMessage("Error: The f vector can only contain 0 and 1.")
                            break
                        } else if (i == this.fVector.length - 1) {
                            this.fVectorValid = true
                        } else {
                            continue
                        }
                    }

                    //Check fvector dimensions
                    for (var j = 0; j < this.fVector.length; j++) {
                        if (this.fVector.length != this.numOfServers || this.fVector[j].length != this.numOfTasks) {
                            this.fVectorValid = false
                            document.getElementById("figure").innerHTML = ""
                            this.errorMessage("Error: The dimensions of the f vector are incorrect.")
                            break
                        } else if (i == this.fVector.length - 1) {
                            this.fVectorValid = true
                        } else {
                            continue
                        }
                    }

                    //Initialize figure if fvector is valid
                    if (this.fVectorValid) {
                        this.errorMessage("")
                        document.getElementById("figure").innerHTML = ""
                        initCanvas(this.numOfTasks, this.numOfServers, this.fVector) 
                    }
                }
            },
            loadConfigurations() {
                console.log("loadConfigurations clicked!")
            },
            getCsvVectors(e) {
                let input = document.getElementById('file-upload');
                let textarea = document.getElementById('textArea');
                var self = this

                if (textarea.value.length > 0) {
                    textarea.value = ''
                } 
                
                if (input.files && input.files[0]) {
                    var myFile = input.files[0];
                    var reader = new FileReader();
                    reader.readAsBinaryString(myFile)

                    reader.onload = function (e) {
                        let csvdata = e.target.result; 
                        let lines = csvdata.split('\n');
                        for(var i = 0; i < lines.length;i++) {
                            textarea.value += lines[i].replace(/['"]+/g, '')
                        }

                        let values = textarea.value.split("\n")
                        self.numOfTasks = values[0]
                        self.numOfServers = values[1]

                        let fVectorStart = 3 + parseInt(self.numOfServers)
                        let count = 0
                        for (i = fVectorStart; i < values.length; i++) {
                            self.fVector[count++] = values[i].split(',')
                        }
                    };
                }
            },
            getCsvData(e) {
                this.fVector = []
                let textarea = e.target.value;
                let values = textarea.split("\n")

                this.numOfTasks = values[0]
                this.numOfServers = values[1]

                let fVectorStart = 3 + parseInt(this.numOfServers)
                let count = 0
                for (var j = fVectorStart; j < values.length; j++) {
                    this.fVector[count++] = values[j].split(',')
                }
            },
            getCsvConfigurations(e) {
                
            },
            errorMessage(message) {
                document.getElementById("errorMessage").innerHTML = message
            }
        },
    }
</script>

<style lang="scss" scoped>
    .import {
        display: flex;
        flex-direction: column;
        padding: 40px 20px;
    }
    .import__title {
        align-self: center;
        font-size: 2em;
    }
    .import__vectors-form, .import__configurations-form {
        display: flex;
        flex-direction: column;
        align-self: center;
    }
    .import__vectors-form__textarea, .import__configurations-form__textarea {
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
        &::placeholder {
            font-style: italic;
        }
    }
    .import__button {
        align-self: center;
        margin-top: 2em;
    }
    .import__vectors-form__input,  .import__configurations-form__input {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }
    .import__vectors-form__label {
        width: 200px;
        height: 45px;
        border: 2px solid $accent-color;
        border-radius: 8px;
        align-self: center;
        text-align: center;
        padding: 0.55em 0;
        margin-bottom: 1em;
    }
    .import__vectors-form__input + label, .import__configurations-form__input + label {
        font-family: $roboto;	
        font-size: 1.1em;
        color: $font-color;
        background-color: $background-color--main;
        display: inline-block;
        cursor: pointer; 
    }
    .import__vectors-form__input:focus + label, .import__configurations-form__input:focus + label {
        outline: 1px dotted #000;
        outline: -webkit-focus-ring-color auto 5px;
    }
    .import__vectors-form__input + label *, .import__configurations-form__input + label * {
        pointer-events: none;
    }
    #figure {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    #errorMessage {
        color: #ff4d4d;
        font-size: 1.2em;
        text-align: center;
        padding: 5px;
        margin: 5px;
    }
</style>
