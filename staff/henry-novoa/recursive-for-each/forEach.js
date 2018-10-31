
counter = 0
function recursiveForEach(nums,callback){
    
    if(counter !== nums.length){
        callback(nums[counter],counter)
        counter++
        recursiveForEach(nums,callback)
    }
        
}

module.exports = recursiveForEach

