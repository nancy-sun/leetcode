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
                end = pivot;
            } else {
                start = pivot + 1;
            }
        }
        return start;
    };
};

// console.log(solution(isBadVersion)(5))
