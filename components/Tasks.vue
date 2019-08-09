<template>
    <div>
        <label>Task {{ this.taskCount }} Arrival Rate: 
            <Input 
                placeholder=""
            />
            <div class="deleteBtn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
            </div>
        </label>
        <br><br>
        <div class="addRowBtn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
        </div>
    </div> 
</template>

<script>
export default {
    data() {
        return {
            tasksCount: 0
        }
    }, 
    computed: {
        taskCount: function() {
            return ++this.tasksCount
        }
    }
}
</script>


<style lang="scss" scoped>
    .addRowBtn, .deleteBtn {
        cursor: pointer;
        display: inline-block;
        svg {        
            fill: $accent-color;
            width: 20px;
            height: 20px;
        }
    }
    input {
        height: 25px;
        padding: 10px;
        margin: 8px;
        background-color: $font-color;
        border: none;
        border-radius: 3px;
        width: 80px;
        height: 30px;
    }
    label {
        font-weight: 300;
    }
</style>

