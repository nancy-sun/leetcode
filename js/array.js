
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

function containsDuplicate2(nums) {
    let set = new Set(nums);
    return set.size !== nums.length;
}

console.log(containsDuplicate2([3, 3]))

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



/* ------------------------------------------DAY 5------------------------------------------*/
/* 36. Valid Sudoku 
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.
*/
console.log(isValidSudoku([["8", "3", ".", ".", "7", ".", ".", ".", "."], ["6", ".", ".", "1", "9", "5", ".", ".", "."], [".", "9", "8", ".", ".", ".", ".", "6", "."], ["8", ".", ".", ".", "6", ".", ".", ".", "3"], ["4", ".", ".", "8", ".", "3", ".", ".", "1"], ["7", ".", ".", ".", "2", ".", ".", ".", "6"], [".", "6", ".", ".", ".", ".", "2", "8", "."], [".", ".", ".", "4", "1", "9", ".", ".", "5"], [".", ".", ".", ".", "8", ".", ".", "7", "9"]]))

function isValidSudoku(board) {
    /* could also declare as sets, 
    set.has() to check if it has the item, set.add() to push new item to set
    set.clear() to empty the set

    // let col = new Set();
    // let box = new Set();
    // let row = new Set();
    
    However, it's kinda tedious to use set in this case, cuz we always check if the item already exists first
    */

    let col = [];
    let box = [];
    let row = [];

    for (let i = 0; i < 9; i++) {
        //empty the check array every time for a new check
        row = [];
        col = [];
        box = [];
        for (let j = 0; j < 9; j++) {

            //check row
            if (row.includes(board[i][j])) {
                return false;
            } else if (board[i][j] !== ".") {
                row.push(board[i][j]);
            }

            //check column
            if (col.includes(board[j][i])) {
                return false;
            } else if (board[j][i] !== ".") {
                col.push(board[j][i]);
            }

            //check box
            let boxItem = (board[3 * Math.floor(i / 3) + Math.floor(j / 3)][3 * (i % 3) + (j % 3)])
            if (box.includes(boxItem)) {
                return false;
            } else if (boxItem !== ".") {
                box.push(boxItem);
            }
        }
    }
    return true;
}

/* 74. Search a 2D Matrix
Searches for a value target in an m*n integer matrix. Matrix needs to have: 
Integers in each row are sorted from left to right.
The first integer of each row is greater than the last integer of the previous row.
*/
function searchMatrix0(matrix, target) { //this is a stupid straight-forward no-brain solution lol
    let arr = matrix.flat();
    return arr.includes(target);
}

function searchMatrix1(matrix, target) {
    let row;
    for (let arr of matrix) {
        if (arr[0] <= target && arr[arr.length - 1] >= target) {
            row = arr;
        }
    }
    if (!row) return false;
    for (let num of row) {
        if (num === target) return true;
    }
    return false;
}

//binary search O(log mn) solution
function searchMatrix2(matrix, target) {
    let length = matrix[0].length; //since it's a matrix, n is constant for all m
    let start = 0;
    let end = (matrix.length * length) - 1; //total indexes in the matrix
    while (start <= end) {
        let mid = Math.floor((start + end) / 2) //mid number
        let midNum = matrix[Math.floor(mid / length)][mid % length]; //mid number in the middle array
        if (midNum === target) {
            return true;
        } else if (midNum < target) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return false;
}

//diagonal search O(m+n)
function searchMatrix3(matrix, target) {
    let i = 0;
    let j = matrix[0].length - 1; //start to compare from the last index of each row

    while (i < matrix.length && j >= 0) {
        if (matrix[i][j] === target) return true;
        if (matrix[i][j] < target) { //if the last item in the row < target, move to the next row/array
            i++;
        } else { //if the last item in the row > target, compare the previous index in the row
            j--;
        }
    }
    return false;
}

console.log(searchMatrix3([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3))






/* ------------------------------------------ Review ------------------------------------------*/
/* 1207. Unique Number of Occurrences
Given an array of integers, 
return true if the number of occurrences of each value in the array is unique, or false otherwise.
*/
function uniqueOccurrences(arr) {
    let lookup = new Map();
    for (let num of arr) {
        if (lookup.has(num)) {
            lookup.set(num, lookup.get(num) + 1);
        } else {
            lookup.set(num, 1);
        }
    }
    let values = new Set();
    for (const value of lookup.values()) {
        if (values.has(value)) return false;
        values.add(value);
    }
    return true;
}

function uniqueOccurrences2(arr) {
    let lookup = {};
    for (let num of arr) {
        lookup[num] = (lookup[num] || 0) + 1;
    }
    let values = Object.values(lookup);
    let valuesSet = new Set(values);
    if (values.length !== valuesSet.size) return false;
    return true;
}
console.log(uniqueOccurrences2([1, 2, 2, 1, 1, 3]))

/* 56. Merge Intervals
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, 
return an array of the non-overlapping intervals that cover all the intervals in the input.
*/
function merge(intervals) {
    if (intervals.length <= 1) return intervals;
    let sorted = intervals.sort((a, b) => a[0] - b[0]); //sort the intervals based on the first index in each interval
    for (let i = 1; i < sorted.length; i++) {
        let current = sorted[i];
        let previous = sorted[i - 1];
        if (current[0] <= previous[1]) {
            sorted[i] = [Math.min(previous[0], current[0]), Math.max(previous[1], current[1])]
            sorted.splice(i - 1, 1);
            i--;  //when merged array length shrinks,
        }
    }
    return sorted;
}
console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]]));


/* 1710. Maximum Units on a Truck
You are assigned to put some amount of boxes onto one truck. 
You are given a 2D array boxTypes, where boxTypes[i] = [numberOfBoxesi, numberOfUnitsPerBoxi]:
numberOfBoxesi is the number of boxes of type i.
numberOfUnitsPerBoxi is the number of units in each box of the type i.

You are also given an integer truckSize, which is the maximum number of boxes that can be put on the truck. 
You can choose any boxes to put on the truck as long as the number of boxes does not exceed truckSize.

Return the maximum total number of units that can be put on the truck.
*/
function maximumUnits2(boxTypes, truckSize) {
    boxTypes.sort((a, b) => b[1] - a[1]); //sort number of units each box has from most to least
    let result = 0;
    for (let i = 0; i < boxTypes.length; i++) {
        if (truckSize <= 0) { //if the truck if full, break out of the look
            break;
        }
        if (truckSize > boxTypes[i][0]) { //if the truck has space to fit all boxes of a type
            result += boxTypes[i][0] * boxTypes[i][1]; //put all boxes*units in the truck
            truckSize -= boxTypes[i][0]; //decrease the truck size left 
        }
        else {  //if the truck has space but not enough space for all boxes in that type
            result += truckSize * boxTypes[i][1] //fit as many boxes of units as possible in the space left
            truckSize -= boxTypes[i][0]; //decrease the truck size left
        }
    }
    return result;
}

function maximumUnits(boxTypes, truckSize) {
    boxTypes.sort((a, b) => b[1] - a[1]); //sort number of units each box has from most to least
    let result = 0;
    for (let i = 0; i < boxTypes.length; i++) {
        let box = Math.min(boxTypes[i][0], truckSize);
        result += box * boxTypes[i][1];
        truckSize -= box;
    }
    return result;
}
console.log(maximumUnits([[5, 10], [2, 5], [4, 7], [3, 9]], 10));


/* 697. Degree of an Array
Given a non-empty array of non-negative integers nums, the degree of this array is defined as the maximum frequency of any one of its elements.

Find the smallest possible length of a (contiguous) subarray of nums, that has the same degree as nums.
*/

/*1275. Find Winner on a Tic Tac Toe Game
Given a 2D integer array moves where moves[i] = [rowi, coli] indicates that the ith move will be played on grid[rowi][coli]. 
return the winner of the game if it exists (A or B). 
In case the game ends in a draw return "Draw". If there are still movements to play return "Pending".
You can assume that moves is valid (i.e., it follows the rules of Tic-Tac-Toe), the grid is initially empty, and A will play first.
*/

//what is wrong with this solution ...
// function checkWin(arr) {
//     let col = new Set();
//     let row = new Set();
//     let diag1 = 0;
//     let diag2 = 0;
//     if (arr.length >= 3) {
//         for (let i = 0; i < arr.length; i++) {
//             row.add(arr[i][0]);
//             col.add(arr[i][1]);
//             if (arr[i] === [0, 0] || arr[i] === [1, 1] || arr[i] === [2, 2]) diag1++;
//             if (arr[i] === [0, 2] || arr[i] === [1, 1] || arr[i] === [2, 0]) diag2++;
//         }
//         if (col.size === 1 || row.size === 1 || diag1 === 3 || diag2 === 3) {
//             return true;
//         }
//     }
//     return false;
// }

// function tictactoe(moves) {
//     let movesA = moves.filter((move, i) => i % 2 == 0);
//     let movesB = moves.filter((move, i) => i % 2 !== 0);

//     console.log(movesA)
//     if (checkWin(movesA)) {
//         return "A";
//     } else if (checkWin(movesB)) {
//         return "B";
//     } else {
//         if (moves.length === 9) {
//             return "Draw";
//         } else {
//             return "Pending";
//         }
//     }
// }



function tictactoe(moves) {
    const cases = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    const grid = new Uint8Array(9);
    for (let i = 0; i < moves.length; ++i) {
        grid[moves[i][0] * 3 + moves[i][1]] = (i % 2) + 1;
    }
    for (let i = 0; i < cases.length; ++i) {
        const role = grid[cases[i][0]];
        if (role !== 0 && grid[cases[i][1]] === role && grid[cases[i][2]] === role) {
            return role === 1 ? 'A' : 'B';
        }
    }
    return moves.length === 9 ? "Draw" : "Pending";
}
console.log(tictactoe([[0, 0], [2, 0], [1, 1], [2, 1], [2, 2]]))


/*14. Longest Common Prefix
Write a function to find the longest common prefix string amongst an array of strings.
If there is no common prefix, return an empty string "".
*/
function longestCommonPrefix(strs) {
    if (strs.length <= 1) return strs.toString();
    let firstWord = strs[0];
    for (let i = 0; i < firstWord.length; i++) {
        for (let str of strs) {
            if (str[i] !== firstWord[i]) return str.slice(0, i);
        }
    }
    return strs[0];
};

console.log(longestCommonPrefix(["cir", "car"]));

/*412. Fizz Buzz*/
function fizzBuzz(n) {
    let result = [];
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            result.push("FizzBuzz");
        } else if (i % 3 === 0) {
            result.push("Fizz");
        } else if (i % 5 === 0) {
            result.push("Buzz");
        } else {
            result.push(i.toString());
        }
    }
    return result;
}

/*680. Valid Palindrome II
Given a string s, return true if the s can be palindrome after deleting at most one character from it.
*/
function isPalindrome(s, left, right) {
    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

function validPalindrome(s) {
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) {
            return isPalindrome(s, left, right - 1) || isPalindrome(s, left + 1, right);
        }
        left++;
        right--;
    }
    return true;
}
console.log(validPalindrome("abcda"))


/*408. Valid Word Abbreviation
A string can be abbreviated by replacing any number of non-adjacent, non-empty substrings with their lengths. 
The lengths should not have leading zeros.

Given a string word and an abbreviation abbr, return whether the string matches the given abbreviation.
A substring is a contiguous non-empty sequence of characters within a string.
*/
function validWordAbbreviation(word, abbr) {
    let i = 0;
    let j = 0;
    let num = 0;
    while (i < abbr.length && j < word.length) {
        if (!isNaN(abbr[i])) { //!isNaN means it's a number 
            num = num * 10 + Number(abbr[i]);
            if (num === 0) return false; //getting here means there was a number, but after *10, it gets to 0, which means there's a leading 0
            i++;
        } else if (num > 0) {
            j += num;
            num = 0;
        } else if (abbr[i] === word[j]) {
            i++;
            j++;
        } else {
            return false;
        }
    }
    return i === abbr.length && j + num === word.length;
}

console.log(validWordAbbreviation("internationalization", "i12iz4n"))

/*1523. Count Odd Numbers in an Interval Range
Given two non-negative integers low and high. Return the count of odd numbers between low and high (inclusive).
*/
function countOdds(low, high) {
    let count = 0;
    for (let i = low; i <= high; i++) {
        if (i % 2 !== 0) count++;
    }
    return count;
}

function countOdds2(low, high) {
    let count = Math.floor((high - low + 1) / 2);
    if (low % 2 !== 0 && high % 2 !== 0) {
        return count + 1;
    }
    return count;
}

console.log(countOdds2(3, 7))

/*34. Find First and Last Position of Element in Sorted Array
Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.
*/

function findFirst(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    let first = -1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else {
            first = mid;
            right = mid - 1; //find if there is another target before it
        }
    }
    return first;
}

function findLast(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    let last = -1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else {
            last = mid;
            left = mid + 1; //find if there is another target after it
        }
    }
    return last;
}

function searchRange(nums, target) {
    if (nums.length === 0) return [-1, -1];
    let first = findFirst(nums, target);
    let last = findLast(nums, target);
    return [first, last];
};

/* ---------- */
function searchRange2(nums, target) {
    let result = [-1, -1];
    if (nums.length === 0) return result;
    let left = 0;
    let right = nums.length - 1
    let mid = Math.floor(nums.length / 2);

    while (left <= right) {
        if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else { //when mid is target
            result[0] = mid;
            while (result[0] >= 0 && nums[result[0]] === target) { //find first
                result[0]--;
            }
            result[0]++;
            result[1] = mid;
            while (result[1] <= nums.length - 1 && nums[result[1]] === target) { //find last
                result[1]++;
            }
            result[1]--;
            return result;
        }
        mid = Math.floor((right + left) / 2);
    }

    return result;
}

console.log(searchRange2([5, 7, 7, 8, 8, 10], 6))


/*268. Missing Number
Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.
*/
function missingNumber(nums) {
    let sum = nums.length;
    for (let i = 0; i < nums.length; i++) {
        sum += i - nums[i];
    }
    return sum;
}

/*136. Single Number
Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
You must implement a solution with a linear runtime complexity and use only constant extra space.
*/
function singleNumber(nums) {
    let lookup = new Map();
    for (let num of nums) {
        if (lookup.has(num)) {
            lookup.set(num, 0)
        } else {
            lookup.set(num, 1);
        }
    }
    let result;
    for (let [key, value] of lookup) {
        if (value === 1) result = key;
    }
    return result;
}

function singleNumber1(nums) {
    let num = 0; //change when the num is found
    for (let n of nums) {
        num ^= n; // ^ XOR, aka if they are the same, output will be 0, if different, output will be n 
        console.log(num)
    }
    return num;
}
console.log(singleNumber1([2, 2, 1]))

/*27. Remove Element
Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The relative order of the elements may be changed.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.

Return k after placing the final result in the first k slots of nums.

Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.
*/
function removeElement(nums, val) {
    let i = 0;
    let j = 0;
    while (i < nums.length) {
        if (nums[i] === val) {
            i++;
            continue;
        } else {
            nums[j] = nums[i];
            j++;
        }
        i++;
    }
    return j;
}

function removeElement1(nums, val) {
    let i = 0;
    for (let j = 0; j < nums.length; j++) {
        if (nums[j] !== val) {
            nums[i] = nums[j];
            i++;
        }
    }
    return i;
}
console.log(removeElement([3, 2, 2, 3], 3))

/*509. Fibonacci Number

The Fibonacci numbers, commonly denoted F(n) form a sequence, 
called the Fibonacci sequence, 
such that each number is the sum of the two preceding ones, starting from 0 and 1.
*/
function fib(n) {
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
}

function fib2(n) {
    if (n < 2) return n;
    let result = 0;
    let prev1 = 1;
    let prev2 = 0;
    for (let i = 2; i <= n; i++) {
        result = prev1 + prev2;
        prev2 = prev1;
        prev1 = result;
    }
    return result;
}
console.log(fib2(4))

/* 1332. Remove Palindromic Subsequences
You are given a string s consisting only of letters 'a' and 'b'. In a single step you can remove one palindromic subsequence from s.
Return the minimum number of steps to make the given string empty.
A string is a subsequence of a given string if it is generated by deleting some characters of a given string without changing its order. Note that a subsequence does not necessarily need to be contiguous.
A string is called palindrome if is one that reads the same backward as well as forward.
*/

function removePalindromeSub(s) { //since is either a or b, the output will either be 1 or 2
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) {
            return 2;
        }
        left++;
        right--
    }
    return 1;
}

function removePalindromeSub1(s) {
    let reversed = s.split("").reverse().join("");
    return reversed === s ? 1 : 2;
}
console.log(removePalindromeSub("ababaa"));