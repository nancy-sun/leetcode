
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
/* 350. Intersection of Two Arrays II 
Given two integer arrays nums1 and nums2, return an array of their intersection. 
Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.
*/
function intersect(nums1, nums2) {
    let lookup = new Map();
    let result = [];
    for (let i = 0; i < nums1.length; i++) {
        if (lookup.has(nums1[i])) {
            lookup.set(nums1[i], (lookup.get(nums1[i]) + 1));
        } else {
            lookup.set(nums1[i], 1)
        }
    }
    for (let i = 0; i < nums2.length; i++) {
        if (lookup.get(nums2[i])) {
            lookup.set(nums2[i], (lookup.get(nums2[i]) - 1));
            result.push(nums2[i]);
        } else {
            continue;
        }
    }
    return result;
}


console.log(intersect([1, 2, 2, 1], [2, 2]));

/* 349. Intersection of Two Arrays */
var intersection = function (nums1, nums2) {
    let lookup = new Map(nums1.map((num, i) => [num, i]));
    console.log(lookup)
    let result = [];
    for (let num of nums2) {
        if (lookup.has(num)) {
            result.push(num);
            lookup.delete(num);
        }
    }
    return result;
};
console.log(intersection([1, 2, 2, 1], [2, 2]));

/* Note:
349 needs to return the unique, where as 350 is kinda using nums1 as a dictionary and returning the values that appear in nums1
349 - When declaring lookup as a hashmap by map the array. So when there are duplicates, it will replace the value of the key with the new index. I'm not really using the index values for any purpose in this case.
350 - Since we need to count the duplicates in the lookup in this case, the values of the hashmaps acts as a counter. When looping over nums2 array, deduct the count and save to the result
It will only push to the result x times as it appears in nums1. if no value of the key(num), we will skip.
(if 2 appears in nums1 only one time, but appears in nums2 2 times, 2 will only be pushed to result 1 time, cuz we deduct the value of 2 in lookup hashmap by 1 whenever we push 2 to the result)
*/


/* 121. Best Time to Buy and Sell stock */
var maxProfit = function (prices) {
    let buy = prices[0];
    let max = -Infinity;
    for (let i = 1; i < prices.length; i++) {
        // if (prices[i] < buy) {
        //     buy = prices[i]; // buy a lowest price
        // }
        buy = Math.min(buy, prices[i]);
        max = Math.max(max, (prices[i] - buy));
    }
    return max;
};



/* ------------------------------------------DAY 4------------------------------------------*/
/* 566. Reshape the Matrix
You are given an m x n matrix mat and two integers r and c representing the number of rows and the number of columns of the wanted reshaped matrix.
The reshaped matrix should be filled with all the elements of the original matrix in the same row-traversing order as they were.
If the reshape operation with given parameters is possible and legal, output the new reshaped matrix; Otherwise, output the original matrix.
*/
function matrixReshape(mat, r, c) {
    let merged = mat.flat();
    let result = [];
    if (r * c !== merged.length) return mat;
    while (merged.length) {
        result.push(merged.splice(0, c)); //changing the merged array dynamically
    }
    /* using a for loop, get pieces of the merged array with length c
    for(let i = 0; i < merged.length; i+c){
        let temp = merged.splice(i, c)
        result.push(temp);
    }
    */
    return result;
}
// console.log(matrixReshape([[1, 2], [3, 4]], 4, 1))

/* 118. Pascal's Triangle
Given an integer numRows, return the first numRows of Pascal's triangle.
In Pascal's triangle, each number is the sum of the two numbers directly
*/
function generate(numRows) {
    let result = [];
    for (let i = 0; i < numRows; i++) {
        result[i] = [];
        result[i][0] = 1; //the first index in every row is always 1
        for (let j = 1; j < i; j++) {
            result[i][j] = result[i - 1][j - 1] + result[i - 1][j];
        }
        result[i][i] = 1; //last index of each row is always 1
    }
    return result;
}

function generate2(numRows) {
    const result = [];
    let prevRow;

    for (let i = 1; i <= numRows; i++) {
        const row = new Array(i).fill(1); //i is the length of the array, if i = 3, [1, 1, 1]
        if (prevRow) {
            for (let j = 1; j < prevRow.length; j++) {
                const mid = prevRow[j] + prevRow[j - 1]; //calculate the mid part value by adding
                row[j] = mid;
            }
        }
        result.push(row);
        prevRow = row;
    }
    return result;
}

// console.log(generate2(5))