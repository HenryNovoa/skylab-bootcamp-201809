

function recursiveForEach(nums,callback,counter = 0){
    
    if(counter < nums.length){
        callback(nums[counter],counter)
     
        recursiveForEach(nums,callback,++counter)
    }
        
}

module.exports = recursiveForEach

