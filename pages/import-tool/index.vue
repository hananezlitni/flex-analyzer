<template>
    <main>
        <tabs>
            <tab name="Import Vectors" :selected="true">
                <div class="import">
                    <h1 class="import__title">Import a Structure: Vectors</h1>
                    <p class="import__note"><i>Please use the form below to import a structure as vectors. Please read <a href="/">the documentation</a> for information about the format of the content.</i></p>

                    <form class="import__vectors-form" @submit="$event.preventDefault()">
                        <textarea placeholder="Vectors..." class="import__vectors-form__textarea" />
                        <br><br><br>
                        <input class="button button--action primary import__button" type="submit" value="Import Vectors" @click="loadVectors">
                    </form>
                </div>
            </tab>
            <tab name="Import Configurations">
                <div class="import">
                    <h1 class="import__title">Import a Structure: Configurations</h1>
                    <p class="import__note"><i>Please use the form below to import a structure as configurations. Please read <a href="/">the documentation</a> for information about the format of the content.</i></p>

                    <form class="import__configurations-form" @submit="$event.preventDefault()">
                        <textarea placeholder="Configurations..." class="import__configurations-form__textarea" />
                        <br><br><br>
                        <input class="button button--action primary import__button" type="submit" value="Import Configurations" @click="loadConfigurations">
                    </form>
                </div>
            </tab>
        </tabs>
    </main>
</template>

<script>
    import * as d3 from "d3";
    import Tab from '../../components/Tab';
    import Tabs from '../../components/Tabs';

    export default {
        name: 'ImportTool',
        components: {
            Tab, Tabs
        },
        data() {
            return {
                tabs: [] 
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
            loadVectors() {
                console.log("loadVectors clicked!")
            },
            loadConfigurations() {
                console.log("loadConfigurations clicked!")
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
    }
</style>
