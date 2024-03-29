## Importing Structures

The "Import a Structure" variation of the tool allows importing inputs as a CSV file as well as entering inputs on-screen. For guidance, a sample file is provided and can be downloaded by clicking the download button below the instructions. The inputs must be entered row-by-row in the CSV file, or line-by-line on-screen, in the following order (italics indicate values, regular text is entered exactly as shown):

1. Number of Tasks:
2. *number of tasks*
3. Number of Servers:
4. *number of servers*
5. Arrival Rates:
6. *comma separated list, where element k is the arrival rate for task k*
7. Service Rates:
8. *Service rate matrix (row indicates server, column indicates task). Rows are entered as comma separated lists. These are the service rates that would be achieved if a server is trained for a task*
9. F Matrix:
10. *Flexibility matrix (row indicates server, column indicates task). Rows are entered as comma separated lists. An entry of 1 corresponds to the corresponding server being capable of processing the corresponding task, at the rate given in the service rate matrix*

***Important note: If you wish to re-import a structure, please make sure to click the "Clear All" button first so previous inputs are deleted.***

### Importing Large Structures

Large structures and structures with many task-server assignments (i.e. the number of 1's in the F matrix) produce a very large number of configurations, which can cause errors in the tool as it is running on a browser.

To prevent such errors, please follow the steps below to compute the configurations and the corresponding service rates locally on your computer:

1. Node.js is required to run the script. It can be downloaded at: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
2. Download the script that generates the configurations and service rates by clicking the "Script" button above.
3. Using the command line/terminal, navigate to the directory where the script is located.
4. Copy the following command and execute it in the command line/terminal:

```
node -p "require('./configs.js').computeConfigurations(*number of servers*,*number of tasks*,*f matrix*,*service rates*)"
```

Below is an example of using the command to compute the configurations of a 3x3 structure:

```
node -p "require('./configs.js').computeConfigurations(3,3,[[1,1,1],[1,0,1],[0,1,0]],[[2,1,4],[4,0,1],[0,2,0]])"
```

5. A CSV file containing the configurations and the corresponding service rates should be generated in the same directory where the script is located. After adding the required additional inputs (see sample file in the Import Configurations part of the tool), the generated CSV file can be imported for analysis.