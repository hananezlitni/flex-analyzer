exports.computeConfigurations = function(numOfServers, numOfTasks, fMatrix, serviceRates) {
  const ON = 1, OFF = 0;
  let configs = {};

  if (numOfServers > 0 && numOfTasks > 0) {
      numOfTasks += 1;
      // fix up fMatrix to include zero state in accordance with the number of tasks 
      fMatrix = fMatrix.map(function(row) {
          let deltaLength = numOfTasks - row.length;
          return new Array(deltaLength).fill(OFF).concat(row);
      });
      // start computing the configs
      computeConfigurationsHelper([], numOfServers, numOfTasks, fMatrix, configs);
  }

  // get the keys from the map and convert them to array 
  let configurations = Object.keys(configs).map(function(vectorString) {
      return vectorString.split(",").map(function(task) {
          return parseInt(task);
      });
  });

  if (configurations.length > 0) {
    let serviceRatesOfConfigs = computeServiceRatesOfConfigurations(3, configurations, serviceRates)

    if (serviceRatesOfConfigs.length > 0) {
      //Write CSV file content
      var csvContent = ""

      csvContent = "Configurations:" + "\r\n"
                  
      for (var x = 0; x < configurations.length; x++) {
        csvContent += configurations[x] + "\r\n"
      }

      csvContent += "Service Rates:" + "\r\n"

      for (var z = 0; z < serviceRatesOfConfigs.length; z++) {
        if (z == serviceRatesOfConfigs.length -1 ) {
            csvContent += serviceRatesOfConfigs[z]
        } else {
            csvContent += serviceRatesOfConfigs[z] + "\r\n"
        }
      }

      //Create CSV file
      var fs = require('fs');

      fs.writeFile('./configurations.csv', csvContent, 'utf8', function (err) {
        if (err) {
          console.log('Some error occured.')
        } else {
          console.log('CSV file created.')
        }
      });

      return ""
    }
  } else {
    return "An error occurred while generating the configurations."
  }  
}

function computeConfigurationsHelper(vectorArray, numOfServers, numOfTasks, fMatrix, map) {
  const ON = 1, OFF = 0;

  if (vectorArray.length < numOfServers) {
      for (let i = 0; i < numOfTasks; i++) {
          // vectorArray.length is the server index in the fMatrix
          let valueToAdd = fMatrix[vectorArray.length][i] === ON ? i : OFF;
          computeConfigurationsHelper(vectorArray.concat([valueToAdd]), numOfServers, numOfTasks, fMatrix, map);
      }
  } else {
      // we don't need a value here, we just need the map to make sure they are unique 
      // we could use a set as well
      map[vectorArray.toString()] = OFF;
  }
}

function computeServiceRatesOfConfigurations(numOfTasks, configs, serviceRates) {
  let serverRateMatrix = []

  //Set all entries of serverRateMatrix to zeros
  for (var i = 0; i < configs.length; i++) {
      serverRateMatrix[i] = (new Array(numOfTasks)).fill(0) //Length of one entry in matrix equals to num of tasks
  }

  //Update serverRateMatrix with service rates where appropriate
  for (var z = 0; z < configs.length; z++) {
      for (var l = 0; l < configs[z].length; l++) {
          if (configs[z][l] === 0) {
              continue
          } else {
              serverRateMatrix[z][configs[z][l] - 1] = serviceRates[l][configs[z][l] - 1]
          }
      }

      //If multiple servers are at the same task, add the corresponding service rates. 
      //The implementation also takes into consideration if there are duplicates of more than 1 task.
      var dups = getDuplicates(configs[z])

      if (Object.keys(dups).length > 0) {
          var duplicatedTasks = Object.keys(dups)

          if (Object.keys(dups).includes("0") === false) {
              for (var n = 0; n < duplicatedTasks.length; n++) {
                  var serverRateSum = 0

                  for (var server in dups[duplicatedTasks[n]]) {
                  serverRateSum += serviceRates[parseInt(dups[duplicatedTasks[n]][parseInt(server)])][parseInt(duplicatedTasks[n]) - 1]
                  }
              
                  serverRateMatrix[z][parseInt(duplicatedTasks[n]) - 1] = serverRateSum
              }
          }
      }
  }

  return serverRateMatrix
}

function getDuplicates(arr) {
  var duplicates = {};
  for (var i = 0; i < arr.length; i++) {
      if(duplicates.hasOwnProperty(arr[i])) {
          duplicates[arr[i]].push(i);
      } else if (arr.lastIndexOf(arr[i]) !== i) {
          duplicates[arr[i]] = [i];
      }
  }

  return duplicates;
}


