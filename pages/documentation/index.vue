<template>
  <main>
    <h2 href="#">Introduction</h2>
    <p>
      The Flexibility Structure Analyzer is a web-based tool that allows people who wish to design a flexible system to check and verify whether their designed system's structure is as efficient or robust as a fully flexible system and to compare it with systems. Thus, the analyzer not only provides a quick way for users to check their designed flexible systems, but also facilitates the design process. <br><br>
    </p>

    <h2 href="#">Definitions</h2>
    <p><b>Flexibility structure:</b> The training of each server.</p>
    <p><b>Number of tasks:</b> The number of tasks in the system.</p>
    <p><b>Number of servers:</b> The number of servers in the system.</p>
    <p><b>Arrival rate:</b> The rate at which a task arrives in the system. It is denoted by <em>λ</em>.</p>
    <p><b>Service rate:</b> The rate at which a server can process each task. It is denoted by <em>μ</em>.
                            In the service rates matrix, the rows represent the servers and the columns represent the tasks.</p>
    <p><b>F matrix:</b> A binary matrix in which the rows represent servers and the columns represent tasks. 
                        The value 1 means that the corresponding server is trained to perform
                        the corresponding task. Otherwise, the value is 0.</p>
    <p><b>Configuration:</b> A vector in which the index corresponds to the server number while the
                            entry corresponds to the task number. The entries are specified depending on the value
                            of the corresponding task and server in the F matrix. Configurations are especially
                            useful to check whether the structure meets the specified constraints. If a configuration
                            violates the constraints, the corresponding service rates are set to 0.</p>
    <p><b>Efficient structure:</b> The system can handle the same load as a fully flexible system (i.e. all servers are trained to perform all tasks).</p>
    <p><b>Robust structure:</b> The system is able to shift excess capacity from any task to any other task.</p>
    <p><b>Reference:</b> S. Andradottir, H. Ayhan, and D.G. Down, Design Principles for Flexible Systems Production and Operations Management, 2013 (volume 22, issue 5), 1144-1156.</p>

    <h2>Importing Vectors</h2>
    <br>
    <div class="div-flex-center">
      <button class="button button--action button--not-filled" @click="downloadVectorsSampleFile">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512"><path fill="#dddddd" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
        Sample file
      </button>
    </div>
    <p>The "Import Vectors" variation of the tool allows importing inputs as a CSV file as well as entering inputs on-screen. A sample file can be downloaded by clicking the button above for guidance. The inputs must be entered row-by-row in the CSV file, or line-by-line on-screen, in the following order:</p>
    <ol>
      <li>Number of tasks:
      <br><em>*number of tasks*</em></li>
      <li>Number of servers:
      <br><em>*number of servers*</em></li>
      <li>Arrival rates:
      <br><em>*arrival rates vector*</em></li>
      <li>Service rates:
      <br><em>*service rates matrix*</em></li>
      <li>F matrix:
      <br><em>*F matrix*</em></li>
    </ol>
    
    <h2>Importing Configurations</h2>
    <br>
    <div class="div-flex-center">
      <button class="button button--action button--not-filled" @click="downloadConfigurationsSampleFile">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512"><path fill="#dddddd" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
        Sample file
      </button>
    </div>
    <p>The "Import Configurations" variation of the tool allows directly importing the configurations and service rates as a CSV file. A sample file can be downloaded by clicking the button above for guidance. The inputs must be entered row-by-row in the CSV file in the following order</p>
    <ol>
      <li>Number of tasks:
      <br><em>*number of tasks*</em></li>
      <li>Number of servers:
      <br><em>*number of servers*</em></li>
      <li>Arrival rates:
      <br><em>*arrival rates vector*</em></li>
      <li>Configurations:
      <br><em>*configurations*</em></li>
      <li>Service rates:
      <br><em>*service rates*</em></li>
    </ol>

    <h2>Importing Constraints</h2>
    <div class="div-flex-center">
      <button class="button button--action button--not-filled" @click="downloadConstraints">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 512 512"><path fill="#dddddd" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/></svg>
        Sample files
      </button>
    </div>
    <p>Both variations of the tool allow importing the minimum and maximum number of servers at a task as CSV files. Sample files can be downloaded by clicking the button above for guidance. The constraints are imported row-by-row in the CSV files in the following order:</p>
    <ol>
      <li>Constraints:
      <br><em>*constraints vector*</em></li>
    </ol>
    <p>The indeces in the constraints vector represent the task number, while the entry in each index represents the minimum or maximum number of servers at the corresponding task.</p>
  </main>
</template>

<script>
export default {
  methods: {
    downloadVectorsSampleFile() {

    },
    downloadConfigurationsSampleFile() {

    },
    downloadConstraints() {

    }
  }
}
</script>
