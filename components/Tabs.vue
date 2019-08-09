<template>
    <div>
        <div>
            <ul class="tabs">
            <li class="tabs__item" v-for="tab in tabs" :key="tab.name" :class="{ 'is-active': tab.isActive }">
                <a @click="selectTab(tab)">{{ tab.name }}</a>
            </li>
            </ul>
        </div>

        <div class="tabs-details">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .tabs {
        list-style: none;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border-bottom: 1px solid #dbdbdb;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: center;
    }
    .tabs__item {
        display: block;
        margin: 0;
        padding: 0;
        width: 100%;
        a {
            text-decoration: none;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            border-bottom: 1px solid #dbdbdb;
            color: $gray-color;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            margin-bottom: -1px;
            padding: 0.5em 5em;
            vertical-align: top;
            cursor: pointer;
        }
    }
    .tabs__item.is-active a {
        border-bottom-color: $accent-color;
        color: $accent-color;
    }
</style>


<script>
export default {
    data() {
        return {tabs: [] };
    },
    
    created() {
        
        this.tabs = this.$children;
        
    },
    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name == selectedTab.name);
            });
        }
    }
}
</script>

