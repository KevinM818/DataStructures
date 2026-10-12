/*
 * LEETCODE DSA CHEAT SHEET — JAVASCRIPT
 *
 * Goal:
 *   Recognize common patterns and recall their core implementations.
 *   Copy a template, then adapt its condition/state/return value to the problem.
 *
 * BIG-O QUICK GUIDE
 *   O(1)       Constant work
 *   O(log n)   Repeatedly halve the search space
 *   O(n)       One pass through the input
 *   O(n log n) Common efficient sorting / divide-and-conquer algorithms
 *   O(n^2)     Often nested loops over the same input
 *
 * IMPORTANT:
 *   Data structures and algorithms can be combined. For example:
 *   - A hash map inside a sliding window
 *   - A queue inside BFS
 *   - A stack inside iterative DFS
 */


/* ==========================================================================
 * 0. LOOP REFERENCE
 * ==========================================================================
 *
 * FOR LOOP
 *   Use when you need an index, a counter, a specific number of iterations,
 *   or control over the increment/decrement.
 *
 *   Common for arrays when the index matters.
 */
function exampleFor(nums) {
  for (let i = 0; i < nums.length; i++) {
    // nums[i] and i are both available
  }
}

/*
 * FOR...OF
 *   Use to iterate over values in an iterable (arrays, strings, sets, maps).
 *   Best when you need each value but do not need its index.
 */
function exampleForOf(nums) {
  for (const num of nums) {
    // Work with the current value
  }
}

/*
 * FOR...IN
 *   Iterates over enumerable property KEYS of an object.
 *   Usually use this for plain objects, not arrays.
 *   For arrays, for...in gives keys/indexes as strings and can include
 *   enumerable inherited properties, so prefer for, for...of, or array methods.
 */
function exampleForIn(obj) {
  for (const key in obj) {
    // key is a property name; obj[key] is its value
    // If needed, guard with Object.hasOwn(obj, key)
  }
}

/*
 * WHILE LOOP
 *   Use when the number of iterations is not known in advance and the loop
 *   should continue until a condition changes.
 *   Common in binary search, sliding windows, queues, and stacks.
 */
function exampleWhile(n) {
  while (n > 0) {
    n--;
  }
}

/*
 * LOOP CHOICE SUMMARY
 *   - for:      index / counter / exact iteration control
 *   - for...of: values in arrays, strings, sets, maps
 *   - for...in: object property keys
 *   - while:    continue while a condition is true
 *
 *   Extra reminders:
 *   - `break` exits the loop; `continue` skips to the next iteration.
 *   - Avoid changing an array while iterating unless the logic is deliberate.
 *   - Nested loops over n items often mean O(n^2), but inspect how often each
 *     pointer moves before concluding the complexity.
 */


/* ==========================================================================
 * 1. HASH MAP
 * ==========================================================================
 *
 * CORE IDEA:
 *   Store a value under a key so it can be looked up quickly.
 *   JavaScript Map is a good general-purpose hash map.
 *   Use Set if you only need to track whether a value exists.
 *
 * OPERATIONS:
 *   map.set(key, value)  Add/update
 *   map.get(key)         Read value
 *   map.has(key)         Check key exists
 *   map.delete(key)      Delete key
 *
 * COMPLEXITY:
 *   Average O(1) for get/set/has/delete; O(n) to iterate all entries.
 */
function hashMapOperations(key, value) {
  const map = new Map();

  map.set(key, value);
  const exists = map.has(key);
  const storedValue = map.get(key);
  map.delete(key);

  return { exists, storedValue };
}

/*
 * FREQUENCY COUNTER
 *   Use for counts of numbers, characters, or other values.
 *
 *   Example: [1, 2, 2, 3, 3, 3]
 *   Counts: 1 -> 1, 2 -> 2, 3 -> 3
 */
function countFrequencies(nums) {
  const freq = new Map();

  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  return freq;
}

/*
 * TRACK PREVIOUSLY SEEN VALUES — TWO SUM PATTERN
 *   Store a value and its index. For each current value, check whether the
 *   needed complement has already been seen.
 */
function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }

    seen.set(nums[i], i);
  }

  return [];
}

/*
 * HASH MAP REMINDERS:
 *   - Map stores key/value pairs; Set stores unique values.
 *   - Use map.has(key) when you need to distinguish a missing key from a
 *     stored value such as 0.
 *   - Hash maps are often useful for lookup, counting, duplicates, and
 *     complements.
 */


/* ==========================================================================
 * 2. TWO POINTERS
 * ==========================================================================
 *
 * CORE IDEA:
 *   Use two indices to traverse a collection.
 *
 * COMMON CLUES:
 *   - Sorted array and pair sum
 *   - Compare elements from both ends
 *   - Palindrome check
 *   - Remove duplicates or move/filter elements in place
 *
 * COMPLEXITY:
 *   Often O(n) time and O(1) extra space.
 */

/*
 * PATTERN A: OPPOSITE DIRECTIONS
 *   Common for sorted arrays, pair sums, and palindromes.
 *   This example assumes nums is sorted ascending.
 */
function twoPointersPairSum(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === target) {
      return [left, right];
    }

    if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}

/*
 * PATTERN B: SAME DIRECTION (READ/WRITE POINTERS)
 *   `fast` explores; `slow` tracks the position for the next valid value.
 *   This example removes duplicates from a sorted array in place.
 *   The first slow + 1 elements are the unique values.
 */
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let slow = 0;

  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }

  return slow + 1;
}

/*
 * TWO POINTER REMINDERS:
 *   - Opposite directions often use `while (left < right)`.
 *   - Same direction often uses `fast < nums.length`.
 *   - Move a pointer only when the problem's logic justifies it.
 */


/* ==========================================================================
 * 3. SLIDING WINDOW
 * ==========================================================================
 *
 * CORE IDEA:
 *   Maintain a contiguous range with left/right boundaries.
 *   Expand by moving right; shrink by moving left.
 *
 * COMMON CLUES:
 *   - Longest/shortest substring or subarray
 *   - Contiguous range of a fixed size
 *   - Track a condition while a window expands/shrinks
 *
 * COMPLEXITY:
 *   Usually O(n) when each pointer only moves forward.
 */

/*
 * PATTERN A: FIXED-SIZE WINDOW
 *   Example: maximum sum of any subarray of size k.
 *   Add the incoming value and remove the value that leaves the window.
 */
function maxWindowSum(nums, k) {
  if (k <= 0 || k > nums.length) return null;

  let windowSum = 0;
  let maxSum = -Infinity;

  for (let right = 0; right < nums.length; right++) {
    windowSum += nums[right];

    // If the window grew beyond k, remove the oldest element.
    if (right >= k) {
      windowSum -= nums[right - k];
    }

    // A full window exists once right reaches k - 1.
    if (right >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);
    }
  }

  return maxSum;
}

/*
 * PATTERN B: VARIABLE-SIZE WINDOW
 *   Example: minimum length of a subarray whose sum >= target.
 *
 *   IMPORTANT ASSUMPTION:
 *   This simple sum-based version assumes all nums are positive (or at least
 *   nonnegative). With negative numbers, shrinking does not predictably
 *   decrease the sum, so this approach may not work.
 */
function minSubarrayLength(target, nums) {
  let left = 0;
  let sum = 0;
  let minLength = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    // Shrink while the current window is valid.
    while (sum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return minLength === Infinity ? 0 : minLength;
}

/*
 * SLIDING WINDOW REMINDERS:
 *   - Fixed-size: keep the window length constant.
 *   - Variable-size: expand/shrink based on a condition.
 *   - For substring problems with constraints, a Map or Set may track what
 *     is inside the current window.
 */


/* ==========================================================================
 * 4. BINARY SEARCH
 * ==========================================================================
 *
 * CORE IDEA:
 *   Repeatedly eliminate half the search space.
 *
 * COMMON CLUES:
 *   - Sorted array
 *   - Find a target or insertion position
 *   - Find the first/last value satisfying a monotonic condition
 *   - "Minimum feasible..." / "maximum possible..." when feasibility changes
 *     monotonically over a search space
 *
 * COMPLEXITY:
 *   O(log n) time and O(1) extra space for iterative binary search.
 */

/*
 * PATTERN A: FIND AN EXACT TARGET
 *   Returns the index if found; otherwise -1.
 */
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

/*
 * PATTERN B: LOWER BOUND
 *   Return the first index where nums[index] >= target.
 *   Returns nums.length if all elements are less than target.
 *   Useful for insertion positions and finding the first occurrence.
 */
function lowerBound(nums, target) {
  let left = 0;
  let right = nums.length; // Exclusive upper bound

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

/*
 * BINARY SEARCH REMINDERS:
 *   Exact search:
 *     left = 0, right = length - 1, loop while left <= right.
 *
 *   Lower bound:
 *     left = 0, right = length, loop while left < right.
 *
 *   Be consistent about whether `right` is inclusive or exclusive.
 *   Binary search works on sorted arrays or a search space with a monotonic
 *   yes/no condition; it does not require an array in every problem.
 */


/* ==========================================================================
 * 5. BFS (BINARY TREES)
 * ==========================================================================
 *
 * CORE IDEA:
 *   Breadth-first search visits nodes level by level.
 *   It uses a queue (FIFO).
 *
 * COMMON CLUES:
 *   - Level-order traversal
 *   - Process nodes by depth
 *   - Minimum number of edges in an unweighted tree/graph
 *
 * ASSUMED NODE SHAPE:
 *   { val, left, right }
 *
 * COMPLEXITY:
 *   O(n) time to visit n nodes; queue space O(w), where w is max tree width.
 */
function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];
  let head = 0;

  while (head < queue.length) {
    // Capture the number of nodes in this level before adding children.
    const levelSize = queue.length - head;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue[head++];

      level.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}

/*
 * BFS REMINDERS:
 *   - Capture levelSize before processing a level.
 *   - New children belong to the next level.
 *   - Avoid repeated queue.shift() for large queues; it can require moving
 *     remaining array elements. A head index is a simple alternative.
 *   - For graphs, usually track visited nodes to avoid cycles.
 */


/* ==========================================================================
 * 6. DFS (BINARY TREES)
 * ==========================================================================
 *
 * CORE IDEA:
 *   Depth-first search explores one branch as far as possible before
 *   backtracking. It can be recursive or iterative.
 *
 * COMMON CLUES:
 *   - Tree height/depth
 *   - Subtree calculations
 *   - Root-to-leaf paths and path sums
 *   - Explore every branch
 *
 * COMPLEXITY:
 *   O(n) time to visit n nodes. Recursive auxiliary space O(h), where h is
 *   tree height (worst-case O(n) for a skewed tree).
 */

/*
 * PATTERN A: RECURSIVE DFS THAT RETURNS A VALUE
 *   Maximum depth of a binary tree.
 *
 *   Base case: an empty tree has depth 0.
 *   Solve left and right subtrees, then combine their answers.
 */
function maxDepth(root) {
  if (!root) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return 1 + Math.max(leftDepth, rightDepth);
}

/*
 * PATTERN B: PREORDER TRAVERSAL
 *   Process current node, then left subtree, then right subtree.
 */
function dfsPreorder(root, result = []) {
  if (!root) return result;

  result.push(root.val); // Node
  dfsPreorder(root.left, result); // Left
  dfsPreorder(root.right, result); // Right

  return result;
}

/*
 * THREE COMMON DFS ORDERS:
 *   Preorder:  Node -> Left -> Right
 *   Inorder:   Left -> Node -> Right
 *   Postorder: Left -> Right -> Node
 *
 *   Preorder: process node before its children.
 *   Inorder:   for a BST, visits values in ascending order.
 *   Postorder: useful when a node's answer depends on its children.
 */

/*
 * PATTERN C: ITERATIVE DFS USING A STACK
 *   Push right before left so left is processed first.
 *   This produces preorder traversal without recursive function calls.
 */
function dfsIterative(root) {
  if (!root) return [];

  const result = [];
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);

    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return result;
}

/*
 * DFS REMINDERS:
 *   - Start with the base case: what should an empty node return?
 *   - Ask whether the function returns a value or just visits nodes.
 *   - For graphs, track visited nodes to avoid cycles.
 *   - Recursive DFS can overflow the call stack on a very deep tree; iterative
 *     DFS can be useful in that situation.
 */


/* ==========================================================================
 * 7. QUEUES
 * ==========================================================================
 *
 * CORE IDEA:
 *   FIFO = First In, First Out.
 *   The first item added is the first item removed.
 *
 * COMMON USES:
 *   - BFS
 *   - Processing tasks in arrival order
 *   - Level-by-level traversal
 *
 * OPERATIONS:
 *   Enqueue: push to the back
 *   Peek:    read at head
 *   Dequeue: read at head and increment head
 *
 * COMPLEXITY:
 *   O(1) amortized per operation with this head-index pattern.
 */
function queueTemplate(items) {
  const queue = [...items];
  let head = 0;

  // Queue is non-empty while head is before the end.
  while (head < queue.length) {
    const front = queue[head++]; // Dequeue
    // Process front...

    // Add more work if needed:
    // queue.push(nextItem);
  }
}

/*
 * QUEUE REMINDERS:
 *   - queue.push(value) adds to the back.
 *   - queue[head] peeks at the front.
 *   - queue[head++] dequeues logically.
 *   - queue.length - head is the number of remaining items.
 *   - For a short-lived queue, leaving processed items in the array is fine.
 */


/* ==========================================================================
 * 8. STACKS
 * ==========================================================================
 *
 * CORE IDEA:
 *   LIFO = Last In, First Out.
 *   The most recently added item is the first one removed.
 *
 * COMMON USES:
 *   - Matching brackets / nested structures
 *   - Iterative DFS
 *   - Undo / backtracking patterns
 *   - Next greater/smaller element (monotonic stack)
 *
 * COMPLEXITY:
 *   Basic push/pop/peek operations are O(1) amortized.
 */
function stackOperations(value) {
  const stack = [];

  stack.push(value); // Push
  const top = stack[stack.length - 1]; // Peek
  const removed = stack.pop(); // Pop
  const isEmpty = stack.length === 0;

  return { top, removed, isEmpty };
}

/*
 * PATTERN A: VALID PARENTHESES
 *   Opening brackets are pushed. Each closing bracket must match the most
 *   recent unmatched opening bracket.
 */
function isValidParentheses(s) {
  const stack = [];
  const pairs = {
    ")": "(",
    "]": "[",
    "}": "{"
  };

  for (const char of s) {
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    } else {
      // pop() returns undefined if the stack is empty, so this also catches
      // a closing bracket with no matching opening bracket.
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  // Any leftover opening bracket means the string is invalid.
  return stack.length === 0;
}

/*
 * PATTERN B: MONOTONIC STACK — NEXT GREATER ELEMENT
 *   Maintain indices whose next greater value has not yet been found.
 *   When the current value is greater than the value at the stack's top
 *   index, resolve that index and keep popping while the condition holds.
 *
 *   Example:
 *     nums   = [2, 1, 3]
 *     result = [3, 3, -1]
 *
 *   Each index is pushed and popped at most once, so the total time is O(n).
 */
function nextGreaterElements(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = [];

  for (let i = 0; i < nums.length; i++) {
    while (
      stack.length > 0 &&
      nums[i] > nums[stack[stack.length - 1]]
    ) {
      const index = stack.pop();
      result[index] = nums[i];
    }

    stack.push(i);
  }

  return result;
}

/*
 * STACK REMINDERS:
 *   - push() adds to the top; pop() removes from the top.
 *   - Store indices if you need positions or distances.
 *   - For a monotonic stack, decide whether it should be increasing or
 *     decreasing based on the problem's comparison.
 */


/* ==========================================================================
 * FINAL PATTERN RECOGNITION CHECKLIST
 * ==========================================================================
 *
 * HASH MAP
 *   Clue: fast lookup, frequency counts, duplicates, complements.
 *   Ask: "Have I seen this value? How many times?"
 *
 * TWO POINTERS
 *   Clue: sorted array, opposite ends, in-place filtering/rearranging.
 *   Ask: "Can I move one pointer without missing a valid answer?"
 *
 * SLIDING WINDOW
 *   Clue: contiguous subarray/substring; longest, shortest, fixed length.
 *   Ask: "Can I update the window state instead of recomputing it?"
 *
 * BINARY SEARCH
 *   Clue: sorted input or a monotonic true/false condition.
 *   Ask: "Can I eliminate half of the remaining search space?"
 *
 * BFS
 *   Clue: level order, minimum number of edges in an unweighted graph/tree.
 *   Ask: "Do I need to process items in discovery order?"
 *
 * DFS
 *   Clue: paths, depth, subtree answers, explore branches.
 *   Ask: "Can I solve this node using answers from its children?"
 *
 * QUEUE
 *   Clue: first-in, first-out processing.
 *   Ask: "Does the earliest item need to be processed first?"
 *
 * STACK
 *   Clue: nested structures, most-recent unresolved item, next greater/smaller.
 *   Ask: "Does the latest item need to be handled first?"
 *
 *
 * PRACTICE METHOD:
 *   1. Identify one or two likely patterns before looking at code.
 *   2. Write the template from memory.
 *   3. Adapt the condition, tracked state, and return value.
 *   4. Test edge cases: empty input, one element, duplicates, and no solution.
 */
