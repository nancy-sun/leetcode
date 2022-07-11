
//get back to two sum just to make myself feel better..from struggling with binary search😢
var twoSum = function (nums, target) {
    if (nums.length === 2) return [0, 1];
    let lookup = new Map();
    for (let i = 0; i < nums.length; i++) {
        let diff = target - nums[i];
        if (lookup.has(diff)) return [i, lookup.get(diff)];
        lookup.set(nums[i], i);
    }
};

// console.log(twoSum([2, 7, 11, 15], 18))









/* Binary Search - 07/09/2022*/

/* 704 Binary Search 
Given an array of integers which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.
You must write an algorithm with O(log n) runtime complexity.
*/
function search(nums, target) {
    let low = 0;
    let high = nums.length - 1;
    while (low <= high) {
        let pivot = Math.floor((low + high) / 2);
        let num = nums[pivot];
        if (num === target) {
            return pivot;
        } else if (num < target) {
            low = pivot + 1;
        } else {
            high = pivot - 1;
        }
    }
    return -1;
};

//one line solution
function search(nums, target) {
    return nums.indexOf(target);
    // return nums.findIndex(num => num === target); 
};



/* 278 First Bad Version 
Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.
You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.
*/

/* video: https://www.youtube.com/watch?v=t5m_IMW1tPQ */

isBadVersion = function (version) {
    if (version <= 4) {
        return true;
    }
}

var solution = function (isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */

    return function (n) {
        let start = 1;
        let end = n;
        while (start < end) {
            let pivot = Math.floor((start + end) / 2);
            if (isBadVersion(pivot)) {
                end = pivot; //if the midpoint is a bad version, look for bad versions before
            } else {
                start = pivot + 1; //if the midpoint is not a bad version, look for the one after that till find the first bad version
            }
        }
        return start; //this should be the first bad version
    };
};

// console.log(solution(isBadVersion)(5))

/* 35 Search Insert Position
Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
Time O(log n)
*/

function searchInsert(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        let pivot = Math.floor((left + right) / 2);
        if (nums[pivot] === target) {
            return pivot;
        } else if (nums[pivot] > target) {
            right = pivot - 1;
        } else {
            left = pivot + 1;
        }
    }
    return left;
}

//another solution
function searchInsert(nums, target) {
    return binarySearch(nums, target, 0, nums.length - 1);
};


function binarySearch(array, target, start, end) {
    // If the target is less then the very last item then insert it at that item index
    // because anything index less then that has already been confirmed to be less then the target.
    // Otherwise insert it at that item index + 1
    // because any index grater then that has already been confirmed to be greater then the target
    if (start > end) return start;
    const midPoint = Math.floor((start + end) / 2);
    if (array[midPoint] === target) return midPoint;
    // search the left side
    if (array[midPoint] > target) return binarySearch(array, target, start, midPoint - 1);
    // search the right side
    if (array[midPoint] < target) return binarySearch(array, target, midPoint + 1, end);
}












/* more binary search practice */
/* 69. Sqrt(x)
Since the return type is an integer, the decimal digits are truncated, and only the integer part of the result is returned.
Note: You are not allowed to use any built-in exponent function or operator, such as pow(x, 0.5) or x ** 0.5.
*/

function mySqrt(x) {
    let left = 1;
    let right = Math.floor(x / 2) + 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (mid * mid > x) {
            right = mid - 1;
        } else if (mid * mid < x) {
            left = mid + 1;
        } else {
            return mid;
        }
    }
    return right;
}


/* 268. Missing Number
Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.
*/
function missingNumber(nums) {
    let sum = nums.length;
    for (let i = 0; i < nums.length; i++) {
        sum += i - nums[i];
    }
    return sum;
}


/* another solution */
function missingNumber(nums) {
    // construct array of size n+1, to leave a spot for the missing element.
    // Assign each val to -1 so we can see which position was not filled
    // O(n)
    const res = new Array(nums.length + 1).fill(-1);

    // "sort" the elements by assigning to the array based on val
    // O(n)
    for (const num of nums) {
        res[num] = num;
    }

    // the remaining -1 index is the missing value
    // O(n-1)
    return res.indexOf(-1);
};



