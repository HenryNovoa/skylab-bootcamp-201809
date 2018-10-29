

const argv = process.argv.slice(2)
let result = 0

//const res = argv.reduce((accum,val)=> accum + Number(val),0)

for(var i = 0; i < argv.length; i++){
    result += parseFloat(argv[i])
}
console.log(result)

// argv.array.forEach(element => {
//     result += parseFloat(element)
//  
// });
//console.log(result)

