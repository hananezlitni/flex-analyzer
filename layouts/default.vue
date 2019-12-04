<template>
  <div id="app">
    <header class="header">
			<h1 class="header__title">Flexibility Structure Analyzer</h1>
      <p class="header__team">
        Team leads: <a href="https://www2.isye.gatech.edu/people/faculty/Sigrun_Andradottir/" target="_blank">Sigrún Andradóttir</a>, <a href="https://www.isye.gatech.edu/users/hayriye-ayhan?entry=hs41" target="_blank">Hayriye Ayhan</a>, <a href="http://www.cas.mcmaster.ca/~downd/" target="_blank">Douglas G. Down</a>
        <br>
        Student contributors (initial version): Matt Fielding, Edward Peng, and Alvin Poon
        <br>
        Re-designed &amp; developed by Hanane Zlitni
      </p>
		</header> 
    <app-nav />
    <nuxt />
  </div>
</template>

<script>
  import AppNav from "~/components/AppNav.vue";

  export default {
    components: {
      AppNav
    }
  };
</script>

<style lang="scss">
  /************************* BASE ****************************/
  html {
    scroll-behavior: smooth;
  }
  #app {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    background-color: $background-color--app;
    font-family: $roboto;	
    color: $font-color;
    min-width: 1420px;
    box-sizing: border-box;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    &:before, &:after {
      box-sizing: inherit;
    }
  }
  main {
    grid-column: 4 / -1;
    grid-row: 2;
    min-height: 100vh;
    background-color: $background-color--main;
    padding: 50px 50px 0 50px;
    margin: 20px 50px 50px 10px;
    border-radius: 6px;
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.15);
  }
  p {
    padding: 15px;
    margin: 10px;
    line-height: 1.5;
  }
  a {
    color: $accent-color;
  }
  .header {
    grid-column: 1 / -1;
    padding: 25px 15px;
  }
  .header__title {
    text-align: center;
    color: $font-color;
    font-weight: 500;
  }
  .header__team {
    font-family: $roboto-mono;
    text-align: center;
    color: $accent-color;
    font-size: 0.95em;
    padding: 10px;
  }
  .button {
    width: 185px;
    height: 43px;
    padding: 0.55em 0;
    margin: 0 1em 1em 0;
    border-radius: 8px;
    font-size: 1.05em;
    font-family: $roboto;	
    cursor: pointer;
  }
  .button--action {
    color: $background-color--main;
  }
  .button--action--figure {
    width: 195px;
  }
  .primary {
    background-color: $accent-color;
    border: 2px solid $accent-color;
  }
  .secondary {
    background-color: $lightest-color;
    border: 2px solid $lightest-color;
  }
  .button--not-filled {
    background-color: inherit;
    border: 2px solid $accent-color;
    color: $lightest-color;
  }
  /************************* TOOL ****************************/
  .import {
    display: flex;
    flex-direction: column;
    padding: 40px 20px;
  }
  .import__title {
    align-self: center;
    font-size: 2em;
    margin-bottom: 1.5em;
  }
  .import__file-upload {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  .import__file-upload-label {
    width: 185px;
    height: 43px;
    border: 2px solid $accent-color;
    border-radius: 8px;
    align-self: center;
    text-align: center;
    padding: 0.55em 0;
    margin: 0 1em 1em 0;
  }
  .import__file-upload + label {
    font-family: $roboto;	
    font-size: 1.1em;
    color: $font-color;
    background-color: $background-color--main;
    display: inline-block;
    cursor: pointer; 
  }
  .import__file-upload:focus + label {
      outline: 1px dotted #000;
      outline: -webkit-focus-ring-color auto 5px;
  }
  .import__file-upload + label * {
      pointer-events: none;
  }
  .import__file-name, .import__constraints-file-name {
    width: 300px;
    height: 43px;
    padding: 10px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 2px solid $accent-color;
    background-color: $background-color--main;
    color: $font-color;
    font-size: 1em;
    font-family: $roboto;
    line-height: 1.5;
    margin-right: 1.5em;
    &:focus {
      outline: none;
    }
  }
  .import__constraints-title {
    align-self: center;
    font-size: 1.5em;
    margin-bottom: 1.3em;
  }
  .div-flex-center {
    display: flex;
    align-content: center;
    justify-content: center;
  }
  .buttons-div {
    margin-bottom: 3em;
  }
  .result {
    display: flex;
    flex-direction: column;
    padding: 40px 20px;
  }
  .result__title {
    align-self: center;
    font-size: 1.5em;
    margin-bottom: 1.5em;
  }
  #errorMessage {
    color: #ff4d4d;
    font-size: 1.2em;
    text-align: center;
    padding: 5px;
    margin: 5px;
  }
</style>
