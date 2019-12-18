 export function minNumOfServers(constraints, configs, serviceRates) {
    //[1, 1, 1] => index: task #, entry: minimum # of servers
    for (var task = 0; task < constraints.length; task++) {
        if (constraints[task] === 0) {
            continue
        } else {
            for (var i = 0; i < configs.length; i++) {
                if (getOccurrence(configs[i], task + 1) < constraints[task]) {
                    configs[i] = configs[i].fill(0)
                    serviceRates[i] = serviceRates[i].fill(0)
                } else {
                    continue
                }
            }            
        }
    }

    return {
        configs: configs,
        serviceRates: serviceRates,
    }
}

export function maxNumOfServers(constraints, configs, serviceRates) {
    //[1, 2, 1] => index: task #, entry: maximum # of servers
    for (var task = 0; task < constraints.length; task++) {
        if (constraints[task] === 0) {
            continue
        } else {
            for (var n = 0; n < configs.length; n++) {
                if (getOccurrence(configs[n], task + 1) > constraints[task]) {
                    configs[n] = configs[n].fill(0)
                    serviceRates[n] = serviceRates[n].fill(0)
                } else {
                    continue
                }
            }            
        }
    }

    return {
        configs: configs,
        serviceRates: serviceRates,
    }
}

/*export function maxNumOfServers(constraints, configs, serviceRates) {
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
                    serviceRates[index] = serviceRates[index].fill(0)
                })
            }
        }
    }

    return {
        configs: configs,
        serviceRates: serviceRates,
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