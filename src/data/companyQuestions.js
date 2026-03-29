export const defaultCompanyQuestions = [
  {
    id: 'google',
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    color: '#ea4335',
    questions: [
      { id: 'g1', type: 'DSA', difficulty: 'Hard', question: 'Design a system to serve millions of search queries per second.', hint: 'Discuss Reverse Indexing, Distributed Caching (Memcached/Redis), and Load Balancing.' },
      { id: 'g2', type: 'DSA', difficulty: 'Medium', question: 'Find the longest substring without repeating characters.', hint: 'Use the Sliding Window technique with a HashSet or HashMap.' },
      { id: 'g3', type: 'Graphs', difficulty: 'Hard', question: 'Word Ladder: Find the length of shortest transformation sequence from beginWord to endWord.', hint: 'Use Breadth-First Search (BFS) for shortest path.' },
      { id: 'g4', type: 'Trees', difficulty: 'Medium', question: 'Invert a Binary Tree.', hint: 'Recursively swap left and right children, or use BFS/Queue.' },
      { id: 'g5', type: 'Behavioral', difficulty: 'Medium', question: 'Tell me about a time you had a fundamental disagreement with a coworker over a technical design.', hint: 'Use the STAR method. Focus on data-driven resolution and compromise.' }
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    color: '#ff9900',
    questions: [
      { id: 'a1', type: 'Trees', difficulty: 'Medium', question: 'Number of Islands: Given a 2D grid map of \'1\'s (land) and \'0\'s (water), count the number of islands.', hint: 'Use DFS or BFS to traverse adjacent lands.' },
      { id: 'a2', type: 'Arrays', difficulty: 'Medium', question: 'Two Sum: Find two numbers such that they add up to a specific target number.', hint: 'Use a HashMap to store values and their indices to achieve O(N) time.' },
      { id: 'a3', type: 'Linked List', difficulty: 'Hard', question: 'Merge k Sorted Lists.', hint: 'Use a Min-Heap (Priority Queue) to track the smallest current element of each list.' },
      { id: 'a4', type: 'System Design', difficulty: 'Hard', question: 'Design an e-commerce checkout architecture that can handle Prime Day traffic.', hint: 'Discuss Microservices, Event-Driven Architecture (Kafka), and Database Sharding.' },
      { id: 'a5', type: 'Behavioral', difficulty: 'Hard', question: 'Describe a situation where you had to quickly pivot on a project due to changing requirements.', hint: 'Amazon Leadership Principle: Bias for Action & Dive Deep. Emphasize adaptability.' }
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    color: '#00a4ef',
    questions: [
      { id: 'm1', type: 'Arrays', difficulty: 'Medium', question: 'Find the minimum in a Rotated Sorted Array.', hint: 'Use a modified Binary Search. If mid > right, min is in right half.' },
      { id: 'm2', type: 'LinkedList', difficulty: 'Medium', question: 'Detect a cycle in a Linked List.', hint: 'Floyd\'s Cycle-Finding Algorithm (Tortoise and Hare).' },
      { id: 'm3', type: 'Strings', difficulty: 'Medium', question: 'Determine if a string is a valid palindrome, considering only alphanumeric characters.', hint: 'Two pointers, one from start, one from end, skipping non-alphanumeric.' },
      { id: 'm4', type: 'OS', difficulty: 'Hard', question: 'Implement a Thread-Safe LRU Cache.', hint: 'Combine a Doubly Linked List, HashMap, and Mutex Locks for concurrency control.' },
      { id: 'm5', type: 'Behavioral', difficulty: 'Medium', question: 'What is your most technically complex personal project and why?', hint: 'Discuss architecture choices, scaling issues faced, and specific algorithms used.' }
    ]
  }
];
