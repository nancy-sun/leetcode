
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

/* 1. Two Sum */
/* hashmap */
function twoSumM(nums, target) {
    if (nums.length === 2) return [0, 1];
    let lookup = new Map();
    for (let i = 0; i < nums.length; i++) {
        let diff = target - nums[i];
        if (lookup.has(diff)) {
            return [lookup.get(diff), i];
        }
        lookup.set(nums[i], i);
    }
}

// console.log(twoSumM([2, 7, 11, 15], 9))

/* object */
function twoSum(nums, target) {
    if (nums.length === 2) return [0, 1];
    let lookup = {};
    for (let i = 0; i < nums.length; i++) {
        let diff = target - nums[i];
        if (lookup[diff] !== undefined) {
            return [lookup[diff], i];
        }
        lookup[nums[i]] = i;
    }
}



/* 88. Merge Sorted Array 
Given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
Merge nums1 and nums2 into a single array sorted in non-decreasing order.
The final sorted array should not be returned by the function, but instead be stored inside the array nums1. 
To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.

O(m+n)
*/

function merge(nums1, m, nums2, n) {
    let i = 0;
    let j = 0;
    nums1.splice(m);
    while (j < nums2.length) {
        if (nums1[i] === undefined || nums1[i] > nums2[j]) {
            nums1.splice(i, 0, nums2[j]);
            j++;
        }
        i++;
    }
}


/* 26. remove duplicates from sorted array */

var removeDuplicates = function (nums) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === nums[i + 1]) {
            nums.splice(i, 1);
            i--;
        }
    }
};


/* 121. Best Time to Buy and Sell stock */
var maxProfit = function (prices) {
    let buy = prices[0];
    let max = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < buy) {
            buy = prices[i]; // buy a lowest price
        }
        max = Math.max(max, (prices[i] - buy));
    }
    return max;
};


/* 696. Count Binary Substrings 
Note - if there are same numbers of 0 and 1, it's considered a substring. eg. "000111" - 000111 will count 1
*/
function countBinarySubstr(s) {
    let prev = 0;
    let curr = 1;
    let result = 0;

    for (let i = 1; i < s.length; i++) {
        if (s[i - 1] != s[i]) {
            result += Math.min(curr, prev);
            prev = curr;
            curr = 0;
        }
        curr++;
    }
    return result + Math.min(curr, prev);
}


console.log(countBinarySubstr("01"))



/* ------------------------------------------DAY 3------------------------------------------*/
