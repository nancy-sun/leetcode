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

console.log(areThereDuplicates(2, 2, 3))