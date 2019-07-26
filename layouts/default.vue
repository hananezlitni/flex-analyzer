<template>
  <div id="app">
    <header>
			<h1>Flexibility Structure Analyzer</h1>
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
  /************************* IMPORTS ****************************/
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,900');
  @import url('https://fonts.googleapis.com/css?family=Playfair+Display');
  @import url('https://fonts.googleapis.com/css?family=Playfair+Display+SC:400,700');

  /************************* VARIABLES ****************************/
  $roboto: 'Roboto', sans-serif;
  $roboto-mono: 'Roboto Mono', monospace;
  $background-color: hsl(216, 29%, 97%);
  $lightest-color: hsl(214, 44%, 85%);
  $lightest-color2: hsl(214, 40%, 90%);
  $gray-color: hsl(0, 0%, 50%);
  $accent-color: hsl(199, 84%, 55%);
  $main-color: hsl(203, 100%, 27%);
  $font-color: hsl(210, 24%, 16%);

  /************************* BASE ****************************/
  #app {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    min-height: 100%;
    background-color: $background-color;
    font-family: $roboto;	
    color: $font-color;
    min-width: 1420px;
    box-sizing: border-box;
    height: 100%;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    /*outline: 1px solid red;*/
    &:before, &:after {
      box-sizing: inherit;
    }
  }
  header {
    grid-column: 1 / -1;
    grid-row: 1;
    background-color: #FFFFFF;
    padding: 15px;
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.15);
    h1 {
      text-align: center;
      color: $font-color;
      font-weight: 500;
    }
  }
  main {
    grid-column: 4 / -1;
    background-color: #FFFFFF;
    padding: 50px 50px 0 50px;
    margin: 50px 50px 50px 10px;
    border-radius: 6px;
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.15);
  }
  p {
    padding: 15px;
    margin: 10px;
    line-height: 1.5;
  }
  .button {
    height: 45px;
    padding: 5px;
    margin: 5px;
    border-radius: 8px;
    font-size: 0.85em;
    text-transform: uppercase; 
    margin: 0 auto;
  }
  .button--action {
    width: 120px;
    color: #FFFFFF;
  }
  .primary {
    background-color: hsl(199, 84%, 55%);
    border: 2px solid hsl(199, 84%, 55%);
  }
  .secondary {
    background-color: hsl(214, 44%, 85%);
    border: 2px solid hsl(214, 44%, 85%);
  }
  .button--not-filled {
    width: 180px;
    background-color: #FFFFFF;
    border: 2px solid hsl(199, 84%, 55%);
    color: hsl(199, 84%, 55%);
  }
</style>
