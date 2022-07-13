
/* ------------------------------------------DAY 1------------------------------------------*/
/* 217 Contains Duplicate */
function containsDuplicate(nums) {
    let lookup = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (lookup.has(nums[i])) return true;
        lookup.set(nums[i], i);
        console.log(lookup)
    }
    return false;
}

console.log(containsDuplicate([3, 3]))

/* 53. Maximum Subarray 
Kadane's Algorithm explanation: https://www.youtube.com/watch?v=86CQq3pKSUw

O(n)
*/
function maxSubArray(nums) {
    let max = nums[0];
    let prev = nums[0];
    for (let i = 1; i < nums.length; i++) {
        prev = Math.max(nums[i], prev + nums[i]);
        max = Math.max(prev, max);
    }
    return max;
}
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
console.log(maxSubArray([4]))


/* 169. Majority Element */
function majorityElement(nums) {
    let lookup = new Map();
    for (let i = 0; i < nums.length; i++) {
        lookup.set(nums[i], lookup.get(nums[i]) + 1 || 1);
    }
    let largest = -Infinity;
    let maj;
    for (const [key, value] of lookup) {
        if (value > largest) {
            largest = value;
            maj = key;
        }
    }
    return maj;
}


function majorityElement2(nums) {
    const n = nums.length
    const map = new Map()
    for (let i = 0; i < n; i++) {
        map.set(nums[i], map.has(nums[i]) ? map.get(nums[i]) + 1 : 1)
        if (map.get(nums[i]) > (n / 2)) return nums[i]
    }
    return -1;
}

function majorityElement3(nums) {
    nums.sort((a, b) => a - b);
    return nums[Math.floor(nums.length / 2)];
}

console.log(majorityElement3([3, 2, 3]))



/* ------------------------------------------DAY 2------------------------------------------*/
