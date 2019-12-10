 export function minNumOfServers(constraints, configs, serverRates) {
    //[1, 1, 1] => index: task #, entry: minimum # of servers
    for (var task = 0; task < constraints.length; task++) {
        if (constraints[task] === 0) {
            continue
        } else {
            for (var i = 0; i < configs.length; i++) {
                if (getOccurrence(configs[i], task + 1) < constraints[task]) {
                    configs[i] = configs[i].fill(0)
                    serverRates[i] = serverRates[i].fill(0)
                } else {
                    continue
                }
            }            
        }
    }

    return {
        configs: configs,
        serverRates: serverRates,
    }
}

export function maxNumOfServers(constraints, configs, serverRates) {
    //[1, 2, 1] => index: task #, entry: maximum # of servers
    for (var task = 0; task < constraints.length; task++) {
        if (constraints[task] === 0) {
            continue
        } else {
            for (var i = 0; i < configs.length; i++) {
                if (getOccurrence(configs[i], task + 1) > constraints[task]) {
                    configs[i] = configs[i].fill(0)
                    serverRates[i] = serverRates[i].fill(0)
                } else {
                    continue
                }
            }            
        }
    }

    return {
        configs: configs,
        serverRates: serverRates,
    }
}

/*export function maxNumOfServers(constraints, configs, serverRates) {
    //[1, 2, 1] => index: task #, entry: maximum # of servers

    for (var task = 1; task <= constraints.length; task++) {
        if (constraints[task] === 0) {
            continue
        } else {
            let configsColumn = getColumn(configs, task)

            if (getOccurrence(configsColumn, task) > constraints[task]) {
                let indexesOfOccurence = getIndexesOfOccurence(configsColumn, task)

                indexesOfOccurence.forEach(index => {
                    configs[index] = configs[index].fill(0)
                    serverRates[index] = serverRates[index].fill(0)
                })
            }
        }
    }

    return {
        configs: configs,
        serverRates: serverRates,
    }
}*/

/*function getColumn(arr, col) {
    return arr.map(function(row) {
        return row[col]
    })
}*/



function getOccurrence(array, value) {
    return array.filter((v) => (v === value)).length;
}

/*function getIndexesOfOccurence(array, task) {
    let results = [];

    for (var i = 0; i < array.length; i++ ){
        if (array[i] === task){
            results.push(i);
        }
    }

    return results
}*/