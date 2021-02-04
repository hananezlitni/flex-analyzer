<template>
  <div id="app">
    <header class="header">
			<h1 class="header__title" v-html="AppTitle"></h1>
      <svg class="info-icon" @click="showAppInfoModal = true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>More information</title>
        <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1.25 17c0 .69-.559 1.25-1.25 1.25-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25c.691 0 1.25.56 1.25 1.25zm1.393-9.998c-.608-.616-1.515-.955-2.551-.955-2.18 0-3.59 1.55-3.59 3.95h2.011c0-1.486.829-2.013 1.538-2.013.634 0 1.307.421 1.364 1.226.062.847-.39 1.277-.962 1.821-1.412 1.343-1.438 1.993-1.432 3.468h2.005c-.013-.664.03-1.203.935-2.178.677-.73 1.519-1.638 1.536-3.022.011-.924-.284-1.719-.854-2.297z"/>
      </svg>
		</header> 
    <nuxt />
    <footer v-html="AppFooter"></footer>
    <app-modal v-if="showAppInfoModal" @close="showAppInfoModal = false">
      <section slot="modal-content" v-html="AppInfo"></section>
    </app-modal>
  </div>
</template>

<script>
  import marked from 'marked';
  import appTitleMD from '~/data/AppTitle.md';
  import appFooterMD from '~/data/AppFooter.md';
  import appInfoMD from '~/data/AppInfo.md';
  import AppModal from "~/components/AppModal.vue";

  export default {
    components: {
      AppModal
    },
    data() {
      return {
        showAppInfoModal: false,
        AppTitle: marked(appTitleMD),
        AppFooter: marked(appFooterMD),
        AppInfo: marked(appInfoMD)
      }
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
    background: radial-gradient(ellipse at center, $background-color--app 50%, #171d24 100%);
    font-family: $roboto;	
    color: $font-color;
    min-width: 80em;
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
    grid-column: 3 / 11;
    grid-row: 2;
    min-height: 100vh;
    background-color: $background-color--main;
    padding: 50px 50px 0 50px;
    border-radius: 6px;
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.15);
  }
  footer {
    grid-column: 3 / 11;
    grid-row: 3;
    display: flex;
    justify-content: flex-start;
    margin: 1em 0;
  }
  footer p {
    font-family: $roboto;
    text-align: left;
    color: $font-color;
    font-size: 0.95em;
    padding: 10px;
  }
  p {
    padding: 16px;
    line-height: 1.75;
  }
  a {
    color: $accent-color;
  }
  ol {
    padding: 8px 16px;
  }
  ol li {
    line-height: 1.5;
    padding: 8px 0;
    list-style-position: inside;
  }
  code {
    display: inline-block;
    font-family: $roboto-mono;
    font-size: 0.9em;
    color: $accent-color;
    background-color: $background-color--main;
    padding: 1em;
    border-radius: 5px;
    white-space: pre-wrap;
    word-break: keep-all
  }
  .header {
    grid-column: 1 / -1;
    padding: 25px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header__title {
    text-align: center;
    color: $font-color;
    font-weight: 500;
  }
  .button {
    width: 185px;
    height: auto;
    padding: 0.5em;
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
  .download-button {
    margin-top: 1em;
  }
  .button-group {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .info-icon {
    width: 20px;
    height: 20px;
    margin-left: 0.25em;
    fill: $accent-color;
    cursor: pointer;
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
  .import__subtitle {
    align-self: center;
    margin-top: 0;
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
    margin-bottom: 1.3em;
  }
  .import__constraints-title--h2 {
    font-size: 1.5em;
  }
  .import__constraints-title--h3 {
    font-size: 1.25em;
  }
  .import__file-name::placeholder, .import__constraints-file-name::placeholder {
    font-style: italic;
  }
  .div-flex-center {
    display: flex;
    align-content: center;
    justify-content: center;
  }
  .buttons-div {
    margin-bottom: 2em;
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
  .lp-result {
    padding: 3px;
    margin: 5px;
  }
  .asterisks {
    text-align: center;
  }
  .error-message {
    color: #ff4d4d;
    font-size: 1.2em;
    text-align: center;
    padding: 3px;
    margin: 5px;
  }
</style>
