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

function getOccurrence(array, value) {
    return array.filter((v) => (v === value)).length;
}