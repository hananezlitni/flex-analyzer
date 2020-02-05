<template>
    <main>
        <tabs>
          <tab name="Import Vectors" :selected="true">
            <ImportVectors></ImportVectors>
          </tab>
          <tab name="Import Configurations">
            <ImportConfigurations></ImportConfigurations>
          </tab>
        </tabs>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.3.0/raphael.min.js" />
    </main>
</template>

<script>
    import Tab from '../components/Tab';
    import Tabs from '../components/Tabs';
    import ImportVectors from '../components/ImportVectors'
    import ImportConfigurations from '../components/ImportConfigurations'
    import axios from 'axios';

    export default {
      name: 'ImportTool',
      components: {
          Tab, Tabs, ImportVectors, ImportConfigurations
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


