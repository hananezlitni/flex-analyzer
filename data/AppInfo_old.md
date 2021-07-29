## Flexibility Structure Analyzer

The Flexibility Structure Analyzer is a web-based tool that allows people who wish to design a flexible system to check and verify whether their designed system's structure is as efficient or robust as a fully flexible system and to compare it with systems. Thus, the analyzer not only provides a quick way for users to check their designed flexible systems, but also facilitates the design process.

### Definitions

**Flexibility structure:** The service rates for each server at each task.

**Number of tasks:** The number of tasks in the system.

**Number of servers:** The number of servers in the system.

**Arrival rate:** The rate at which a task arrives in the system. It is denoted by λ.

**Service rate:** The rate at which a server can process each task. It is denoted by μ. In the service rates matrix, the rows represent the servers and the columns represent the tasks.

**F matrix:** A binary matrix in which the rows represent servers and the columns represent tasks. The value 1 means that the corresponding server is trained to perform the corresponding task. Otherwise, the value is 0.

**Configuration:** A vector in which the index corresponds to the server number while the entry corresponds to the task number. The entries are specified depending on the value of the corresponding task and server in the F matrix. Configurations are especially useful to check whether the structure meets the specified constraints. If a configuration violates the constraints, the corresponding service rates are set to 0.

**Efficient structure:** The system can handle the same load as a fully flexible system (i.e. all servers are trained to perform all tasks).

**Robust structure:** The system is able to shift excess capacity from any task to any other task.

**Reference:** S. Andradottir, H. Ayhan, and D.G. Down, Design Principles for Flexible Systems Production and Operations Management, 2013 (volume 22, issue 5), 1144-1156.