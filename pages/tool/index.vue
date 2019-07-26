<template>
  <main>
    <div class="tasks">
        <h2>Tasks</h2>
        <Tasks />
    </div>
    <div class="actions">
        <Modal
            v-show="isModalVisible"
            @close="closeModal"
        />
		<br><br><br><br><br>
		<input type="button" value="Import a Structure" class="button button--not-filled" @click="showModal">
		<input type="button" value="Export Structure" class="button button--not-filled">
        <input type="button" value="Clear All" class="button button--action secondary">
		<input type="button" value="Submit" class="button button--action primary">
	</div>
  </main>
</template>

<script>
    import Tasks from '~/components/Tasks.vue';
    import Modal from '~/components/Modal.vue';

    export default {
        components: {
            Tasks, Modal
        },
        data () {
            return {
                isModalVisible: false
            }
        },
        methods: {
            showModal() {
                this.isModalVisible = true;
            },
            closeModal() {
                this.isModalVisible = false;
            }
        }
    }
</script>


<style lang="scss" scoped>
    main {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        h2 {
            padding-bottom: 15px;
        }
    }
    .tasks {
        grid-column: 1 / 6;
    }
    .actions {
        grid-row: 3;
        grid-column: 1 / 13;
        margin: 20px; /* this will need to be removed later */
        padding-top: 100px; /* this will need to be removed later */
    }
</style>
