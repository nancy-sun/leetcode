/* ------------------------------------------DAY 7------------------------------------------*/
/* 141. First Unique Character in a String
Given head, the head of a linked list, determine if the linked list has a cycle in it.
There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. 

Note that pos is not passed as a parameter.
Return true if there is a cycle in the linked list. Otherwise, return false.
*/

function hasCycle(head) {
    //start from the head node
    let fast = head;
    let slow = head;

    while (fast && fast.next) { //when the next value is not null, means it links to a node, aka has cycle 
        fast = fast.next.next; //fast moves two steps
        slow = slow.next; //slow moves one step
        if (fast == slow) return true; //when fast meets with slow, means it's connected aka cycle
    }
    return false; //if they do not meet no cycle
}

function hasCycle2(head) {
    let seen = new Set(); //store seen node, eliminate chance of repetitive nums with Set
    let node = head; //set head to starting node
    while (node) {
        if (seen.has(node)) return true; //if we have seen the node before, it means we get back to the node, aka hasCycle
        seen.add(node); //for every new node we see, add to seen
        node = node.next; //move on to the next node
    }
    return false; //when we get to the point of null, means we reach the tail of the linked list and we are never get back to the seen point, aka no cycle
}

function hasCycle3(head) {
    let seen = []; //why use Set if there's no repetition? lol
    let node = head;
    while (node) {
        if (seen.includes(node)) return true;
        seen.push(node);
        node = node.next;
    }
    return false;
}

/* 21. Merge Two Sorted Lists
You are given the heads of two sorted linked lists list1 and list2.
Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.
*/

//recursion
function mergeTwoLists(list1, list2) {
    if (!list1) { //when reaching the end of node in list1
        return list2;
    } else if (!list2) { //when reaching the end of node in list2
        return list1;
    } else if (list1.val < list2.val) { //if list 1 head < list 2 head, take list1's head
        list1.next = mergeTwoLists(list1.next, list2); //list1.next is the list of unsorted list
        return list1; //list 1 now only has the sorted nodes
    } else { //take list2's head
        list2.next = mergeTwoLists(list1, list2.next);
        return list2; //list 2 now only has the sorted nodes
    } //running recursively, passing in the sorted and the unsorted
}

//iteration
function mergeTwoLists2(list1, list2) {
    const head = new ListNode(); //storing result list
    let node = head;
    while (list1 && list2) { //if neither of the list gets to the end, take the smaller node, iterate
        if (list1.val > list2.val) {
            node.next = list2;
            list2 = list2.next;
        } else {
            node.next = list1;
            list1 = list1.next;
        }
        node = node.next; //move to the next node
    } //merging until one list is empty
    node.next = list1 || list2; //when one of the lists gets to the end, attach the rest of the other list to it
    return head.next; //return the entire list with attached list.
}

console.log(mergeTwoLists([1, 2, 4], [1, 3, 4]));


/* 83. Remove Duplicates from Sorted List
Given the head of a sorted linked list, delete all duplicates such that each element appears only once. 
Return the linked list sorted as well. Return type ListNode
*/


function deleteDuplicates(head) {//have no idea why this is not working
    let node = head;
    while (node !== null && node.next !== null) {
        if (node.val === node.next.val) {
            node.next = node.next.next; //if duplicate, skip the next node, move to the next next node, think of this as i+2 in array
        } else {
            node = node.next; //move to the next node,
        }
    }
    return head
}
// deleteDuplicates([1, 1, 2]);

/* 206. Reverse Linked List
Given the head of a singly linked list, reverse the list, and return the reversed list.
*/
//iterative
function reverseList(head) {
    let previous = null; //no previous value to start
    let current = head;
    let next = null;
    while (current) {
        next = current.next;
        current.next = previous;
        previous = current;
        current = next;
    }
    return previous;
}

// reverseList([1,2,3,4,5])