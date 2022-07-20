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
    while (node !== null) {
        if (seen.has(node)) return true; //if we have seen the node before, it means we get back to the node, aka hasCycle
        seen.add(node); //for every new node we see, add to seen
        node = node.next; //move on to the next node
    }
    return false; //when we get to the point of null, means we reach the tail of the linked list and we are never get back to the seen point, aka no cycle
}

console.log(hasCycle2([3, 2, 0, -4]))