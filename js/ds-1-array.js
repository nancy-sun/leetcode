
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