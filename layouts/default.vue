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
    width: auto;
    height: 45px;
    padding: 5px;
    margin: 5px;
    border-radius: 8px;
    font-size: 0.85em;
    text-transform: uppercase; 
    margin: 0 auto;
    font-family: $roboto;	
  }
  .button--action {
    color: $background-color--main;
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
    color: $accent-color;
  }
</style>
