<template>
  <div class="scrim" @click.self="close">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalContent">
        <header class="modal-header">
          <svg class="close-icon" @click="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Close</title>
            <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
          </svg>
        </header>
        <slot name="modal-content" id="modalContent"></slot>
        <slot name="download-button"></slot>
      </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      document.addEventListener("keydown", this.closeOnEsc);
    },
    beforeDestroy() {
      document.removeEventListener("keydown", this.closeOnEsc);
    },
    methods: {
      closeOnEsc(event) {
        if (event.keyCode == 27) {
          this.close();
        }
      },
      close() {
        this.$emit("close");
      }
    }
  };
</script>

<style lang="scss" scoped>
  .scrim {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .modal {
    position: relative;
    overflow: auto;
    width: 70vw;
    max-width: 750px;
    height: 80vh;
    padding: 0px 32px 50px;
    background-color: $background-color--app;
    border-radius: 10px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
    border: 1px solid black;

    @media screen and (max-width: 700px) {
      padding: 0px 20px 20px;
      width: calc(100% - 40px);
    }
  }
  .modal-header {
    margin: 3em 0 1em;
  }
  .close-icon {
    width: 24px;
    height: 24px;
    fill: $accent-color;
    cursor: pointer;
    position: absolute;
    top: 2em;
    right: 2em;
  }
</style>