<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <section class="modal-body" id="modalDescription">
            <slot name="body">
              <button type="button" class="btn-close" @click="close" aria-label="Close modal">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
              </button>

              <br>
              <h1>Import Structure</h1>
              <p><i>Please use the form below to import a structure in a CSV file. For more information about the accepted file and content format, please read <a href="#">this page</a>.</i></p>

              <form enctype="text/csv" @submit="$event.preventDefault()">
                  <input type="file" id="file" accept=".csv" @change="uploadFile" />
                  <br><br><br>
                  <input class="button button--action primary" type="submit" value="Import">
              </form>
            </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
      background-color: hsl(216, 29%, 97%);
      box-shadow: 2px 2px 20px 1px;
      overflow-x: auto;
      display: flex;
      flex-direction: column;
      width: 50%;
      height: 60%;
      border-radius: 15px;
  }
  .modal-body {
    display: flex;
    flex-direction: column;
    padding: 30px 20px;
    h1 {
      align-self: center;
      font-size: 2em;
    }
  }
  .btn-close {
      align-self: flex-end;
      width: 15px;
      height: 15px;
      margin: 15px;
      border: none;
      cursor: pointer;      
      svg {
        background-color: hsl(216, 29%, 97%);;
        fill: hsl(199, 84%, 55%);
      }
  }
  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .3s ease
  }
  form {
    align-self: center;
    display: flex;
    flex-direction: column;
    input[type="file"] {
      width: 300px;
      height: 30px;
      padding: 5px;
      border-bottom: 2px solid hsl(0, 0%, 50%);
    }
    button {
      align-self: center;
    }
  }
</style>

<script>
  import * as d3 from "d3";
  import * as axios from 'axios';
  //import { upload } from '~/middleware/FileUpload.service';

  export default {
    name: 'Modal',
    methods: {
      close() {
        this.$emit('close');
      },
      uploadFile() {
        let fileInput = document.getElementById('file');
        const formData = new FormData();

        formData.append('file', fileInput.files[0]);

       // try {
       //   axios.post('/upload', formData);
       // } catch(err) {
       //   console.log(err);
       // }
        

        //upload(formData);

        
      }
    },
  };
</script>
 