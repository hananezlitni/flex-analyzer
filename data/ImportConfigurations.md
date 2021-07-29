## Importing Configurations

The "Import Configurations" variation of the tool allows directly importing the configurations and service rates as a CSV file. For guidance, a sample file is provided and can be downloaded by clicking the download button below the instructions. The inputs must be entered row-by-row in the CSV file in the following order (italics indicate values, regular text is entered exactly as shown):

1. Number of Tasks:
2. *number of tasks*
3. Number of Servers:
4. *number of servers*
5. Arrival Rates:
6. *comma separated list, where element k is the arrival rate for task k*
7. Configurations:
8. *configurations (one on each row, where a row is a comma separated list and element j is the location (task number, zero means idle) for server j in the configuration)*
9. Service Rates:
10. *service rates (one on each row, where a row is a comma separated list and element k is the service rate at task k): Note that the ordering of the service rates must be consistent with the ordering of the configurations*

***Important note: If you wish to re-import a structure, please make sure to click the "Clear All" button first so previous inputs are deleted.***