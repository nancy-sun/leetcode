/* ------------------------------------------DAY 6------------------------------------------*/
/* 387. First Unique Character in a String
find the first non-repeating character and return its index. If it does not exist, return -1.
*/
function firstUniqChar(s) {
    let lookup = new Map();
    for (let i = 0; i < s.length; i++) {
        if (!lookup.has(s[i])) {
            lookup.set(s[i], i)
        } else {
            lookup.set(s[i], -1);
        }
    }
    for (const [key, value] of lookup) {
        if (value !== -1) return value;
    }
    return -1;
}
// console.log(firstUniqChar("aada"))

/* 383. Ransom Note
Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.
Each letter in magazine can only be used once in ransomNote.
*/
function canConstruct(ransomNote, magazine) {
    let lookup = new Map();
    for (let i = 0; i < magazine.length; i++) {
        if (lookup.has(magazine[i])) {
            lookup.set(magazine[i], lookup.get(magazine[i]) + 1);
        } else {
            lookup.set(magazine[i], 1);
        }
    }
    for (let char of ransomNote) {
        if (lookup.get(char)) {
            lookup.set(char, lookup.get(char) - 1);
        } else {
            return false;
        }
    }
    return true;
}

function canConstruct2(ransomNote, magazine) {
    for (let char of ransomNote) {
        if (!magazine.includes(char)) return false;
        magazine = magazine.replace(char, "");
    }
    return true;
}
console.log(canConstruct2("asdf", "asdfd"))


/* 242. valid anagram
Given two strings s and t, return true if t is an anagram of s, and false otherwise.
*/
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    let lookup = new Map();
    for (let char of s) {
        if (lookup.has(char)) {
            lookup.set(char, lookup.get(char) + 1);
        } else {
            lookup.set(char, 1);
        }
    }
    for (let char of t) {
        if (!lookup.get(char)) {
            return false;
        } else {
            lookup.set(char, lookup.get(char) - 1);
        }
    }
    return true;
}

//smarter solution💡 but performance could be slower
function isAnagram2(s, t) {
    let arrS = s.split("").sort().join();
    let arrT = t.split("").sort().join();
    return arrS === arrT;
}
console.log(isAnagram2("rat", "tar"))


/* 13. Roman to Integer
Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.
Note: IV = 4, IX = 9
*/
function romanToInt(s) {
    let lookup = new Map([
        ["I", 1],
        ["V", 5],
        ["X", 10],
        ["L", 50],
        ["C", 100],
        ["D", 500],
        ["M", 1000]
    ]);
    let result = 0;
    for (let i = 0; i < s.length; i++) {
        if (lookup.get(s[i]) < lookup.get(s[i + 1])) {
            result -= lookup.get(s[i]);
        } else {
            result += lookup.get(s[i])
        }
    }
    return result;
}
console.log(romanToInt("MCMXCIV"))

/* 20. Valid Parentheses
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
An input string is valid if:
Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
*/
function isValid(s) {
    if (s.length % 2 !== 0) return false;
    let stack = [];
    for (let sym of s) {
        if (sym === ')' && stack[stack.length - 1] === '(') {
            stack.pop()
        } else if (sym === '}' && stack[stack.length - 1] === '{') {
            stack.pop()
        } else if (sym === ']' && stack[stack.length - 1] === '[') {
            stack.pop()
        } else {
            stack.push(sym)
        }

    }
    return !stack.length;
}

function isValid2(s) {
    const lookup = {
        "(": ")",
        "[": "]",
        "{": "}"
    };
    let stack = [];
    for (let sym of s) {
        if (lookup[sym]) {
            stack.push(lookup[sym]);
        } else if (sym !== stack.pop()) {
            return false;
        }
    }
    return !stack.length;
}
console.log(isValid2("()"))