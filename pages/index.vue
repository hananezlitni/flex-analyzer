<template>
    <main>
        <tabs>
          <tab name="Import a Structure" :selected="true">
            <ImportStructure></ImportStructure>
          </tab>
          <tab name="Import Configurations">
            <ImportConfigurations></ImportConfigurations>
          </tab>
        </tabs>
    </main>
</template>

<script>
    import Tab from '../components/Tab';
    import Tabs from '../components/Tabs';
    import ImportStructure from '../components/ImportStructure'
    import ImportConfigurations from '../components/ImportConfigurations'
    import axios from 'axios';

    export default {
      name: 'ImportTool',
      components: {
          Tab, Tabs, ImportStructure, ImportConfigurations
      },
      data() {
        return {
            tabs: [],    
        }
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
      }
    }
</script>


