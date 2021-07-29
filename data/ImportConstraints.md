## Importing Constraints

Both variations of the tool allow importing the minimum and maximum number of servers at a   as CSV files. For guidance, a sample file is provided and can be downloaded by clicking the download button below the instructions. The constraints are imported row-by-row in the CSV files in the following order:

1. Constraints:
2. *constraints vector*

The indices in the constraints vector represent the task number, while the entry in each index represents the minimum or maximum number of servers at the corresponding task. For example, for the constraints vector [1,2,1], the minimum or maximum number (depending on the option chosen) of servers at task *3* is *1*.

***Important note: If you wish to re-import constraints, please make sure to click the "Clear All" button first so previous constraints are deleted.***