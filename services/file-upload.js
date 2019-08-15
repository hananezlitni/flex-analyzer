
 
   /*------- Method for parse csv data and display --------------*/
   function getParsecsvdata(data) {

    let parsedata = [];

    let newLinebrk = data.split("\n");
    for(let i = 0; i < newLinebrk.length; i++) {

        parsedata.push(newLinebrk[i].split(","))
    }

    //console.table(parsedata);
} 
  
  export default getParsecsvdata;