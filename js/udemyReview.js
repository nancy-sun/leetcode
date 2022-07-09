/* Review some exercise from Udemy algo course to refresh my memory 07/07/2022 */


/* Frequency Counter
Write a function called sameFrequency. Given two positive integers, find out if the two numbers have the same frequency of digits.
Your solution MUST have time complexity O(N)
*/

function sameFrequency(num1, num2) {
    let lookup = {};
    let arr1 = num1.toString();
    for (let num of arr1) {
        lookup[num] = (lookup[num] || 0) + 1;
        console.log(lookup)
    }

    let arr2 = num2.toString();
    for (let num of arr2) {
        if (!lookup[num]) {
            return false;
        } else {
            lookup[num] -= 1;
        }
    }
    return true;
}


/* Frequency Counter / Multiple Pointers - areThereDuplicates
Implement a function called, areThereDuplicates which accepts a variable number of arguments. Checks whether there are any duplicates among the arguments passed in. 
Time - O(N), Space - O(M) */

function areThereDuplicates(...args) {
    let arr = [...args].sort();
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === arr[i + 1]) {
            return true
        }
    }
    return false;
}

/* frequency count */
function areThereDuplicates() {
    let collection = {}
    for (let val in arguments) {
        collection[arguments[val]] = (collection[arguments[val]] || 0) + 1;
    }
    for (let key in collection) {
        if (collection[key] > 1) return true;
    }
    return false;
}

function areThereDuplicates() {
    return new Set(arguments).size !== arguments.length;
}







/* 07/08/2022 */


/* Multi Pointers - averagePair 
Given a sorted array of ints and a target avg, determine if there's a pair of values in the array where the avg of the pair equals the target avg. There might be more than one pair that matches the avg target.
time O(N), space O(1)
*/
function averagePair(arr, tar) {
    if (arr.length <= 1) {
        return false;
    }
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
        let avg = (arr[left] + arr[right]) / 2;
        if (avg === tar) {
            return true;
        } else if (avg < tar) {
            left++;
        } else {
            right--;
        }
    }
    return false;
}
// console.log(averagePair([1, 2, 3], 2.5))

/* Multi Pointers - isSubsequence 
Takes 2 strings, check whether characters in Str1 from a subsequence of the characters in str2, without order changing.
time O(N+M), space O(1)
*/
function isSubsequence(str1, str2) {
    var i = 0;
    var j = 0;
    if (!str1) return true;
    while (j < str2.length) {
        if (str2[j] === str1[i]) i++;
        if (i === str1.length) return true;
        j++;
    }
    return false;
}

// console.log(isSubsequence("abc", "abrabc"))

/* Sliding Window - maxSubarraySum 
Given an array of ints, and a num, find the max sum of a subarray with the length of the num passed to the function. subarray must consist of consecutive elements from the original array.
time O(N), space O(1)
*/

function maxSubarraySum(arr, num) {
    let maxSum = 0;
    if (arr.length < num) return null;
    for (let i = 0; i < num; i++) {
        maxSum += arr[i]
    }
    let tempSum = maxSum;
    for (let i = num; i < arr.length; i++) {
        tempSum += arr[i] - arr[i - num];
        maxSum = Math.max(maxSum, tempSum);
    }
    return maxSum;
}

// console.log(maxSubarraySum([100, 200, 300, 400], 2))

/* Sliding Window - minSubArrayLen 
takes 2 params, an array of positive ints and a positive int. Return the minimal length of a contiguous subarray, which the sum is greater than or equal to the int passed to the function. If there isn't one, return 0.
time O(n), space O(1)
*/

function minSubArrayLen(arr, num) {
    let total = 0;
    let start = 0;
    let end = 0;
    let minLen = Infinity;

    while (start < arr.length) {
        if (total < num && end < arr.length) {
            total += arr[end];
            end++;
        } else if (total >= num) {
            minLen = Math.min(minLen, (end - start));
            total -= arr[start];
            start++;
        } else {
            break;
        }
    }
    return minLen === Infinity ? 0 : minLen;
}

// console.log(minSubArrayLen([2, 1, 3, 5, 4], 9))

/* Sliding Window - findLongestSubstring 
Accepts a string, return the length of longest substring of all distinct characters.
time O(n)
*/

function findLongestSubstring(str) {
    let longest = 0;
    let seen = {};
    let start = 0;

    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if (seen[char]) {
            start = Math.max(start, seen[char]);
        }
        longest = Math.max(longest, i - start + 1);
        seen[char] = i + 1;
    }
    return longest;
}

// console.log(findLongestSubstring("qqqqqqqqqq"))
// console.log(findLongestSubstring("zzxcz"))