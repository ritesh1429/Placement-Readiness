export const placementRoadmaps = {
  OS: {
    title: 'Operating Systems Roadmap',
    description: 'Master process management, memory allocation, and concurrency to ace OS interviews.',
    phases: [
      {
        title: 'Phase 1: Fundamentals & Processes',
        items: ['Introduction to OS, Types of OS', 'Process vs Thread', 'Process States & PCB', 'Context Switching']
      },
      {
        title: 'Phase 2: CPU Scheduling & Synchronization',
        items: ['Scheduling Algorithms (FCFS, SJF, RR, Priority)', 'Critical Section Problem', 'Mutex & Semaphores', 'Deadlock (Conditions, Prevention, Banker\'s Algorithm)']
      },
      {
        title: 'Phase 3: Memory Management',
        items: ['Paging & Segmentation', 'Virtual Memory & Thrashing', 'Page Replacement Algorithms (LRU, FIFO, Optimal)']
      }
    ],
    practiceQuestions: [
      { q: 'Explain Deadlock and its 4 necessary conditions.', hint: 'Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.' },
      { q: 'What is the difference between a Process and a Thread?', hint: 'Heavyweight vs Lightweight, Shared Memory vs Isolated.' },
      { q: 'Explain Paging and Virtual Memory.', hint: 'Translating logical to physical addresses, executing programs larger than RAM.' },
      { q: 'What is Thrashing?', hint: 'When the OS spends more time paging than executing.' },
      { q: 'How does Banker\'s Algorithm work?', hint: 'Resource allocation and deadlock avoidance algorithm.' }
    ]
  },
  CN: {
    title: 'Computer Networks Roadmap',
    description: 'Understand how data travels across the globe, from physical wires to application protocols.',
    phases: [
      {
        title: 'Phase 1: Network Models',
        items: ['OSI Model (7 Layers)', 'TCP/IP Model (4 Layers)', 'Differences between OSI and TCP/IP']
      },
      {
        title: 'Phase 2: Network & Transport Layers',
        items: ['IP Addressing (IPv4 vs IPv6, Subnetting)', 'Routing Algorithms', 'TCP vs UDP', 'Three-way Handshake']
      },
      {
        title: 'Phase 3: Application Layer & Security',
        items: ['DNS, HTTP/HTTPS, FTP, SMTP', 'Cryptography Basics', 'Firewalls & VPNs']
      }
    ],
    practiceQuestions: [
      { q: 'Explain the OSI Model layers in order.', hint: 'Physical, Data Link, Network, Transport, Session, Presentation, Application.' },
      { q: 'What happens when you type google.com in your browser?', hint: 'DNS resolution, TCP Handshake, HTTP Request, Render.' },
      { q: 'What is the difference between TCP and UDP?', hint: 'TCP is reliable/connection-oriented; UDP is fast/connectionless.' },
      { q: 'Explain Subnetting.', hint: 'Dividing a large network into smaller, manageable sub-networks.' },
      { q: 'What is ARP?', hint: 'Address Resolution Protocol maps IP addresses to MAC addresses.' }
    ]
  },
  DBMS: {
    title: 'Database Management Systems Roadmap',
    description: 'Learn to design efficient schemas, write complex queries, and understand database internals.',
    phases: [
      {
        title: 'Phase 1: ER Modeling & Relational Design',
        items: ['Entities, Attributes, Relationships', 'Primary, Foreign, Candidate, Super Keys', 'Schema Design']
      },
      {
        title: 'Phase 2: Normalization & SQL Queries',
        items: ['1NF, 2NF, 3NF, BCNF', 'Joins (Inner, Left, Right, Full)', 'Nested Queries & Group By', 'Indexing']
      },
      {
        title: 'Phase 3: Transactions & Concurrency',
        items: ['ACID Properties', 'Transaction States', 'Concurrency Control techniques', 'Deadlocks in DB']
      }
    ],
    practiceQuestions: [
      { q: 'What are ACID properties?', hint: 'Atomicity, Consistency, Isolation, Durability.' },
      { q: 'Explain the different types of Normalization.', hint: '1NF (Atomic), 2NF (No partial dependency), 3NF (No transitive dependency).' },
      { q: 'What is the difference between DROP, TRUNCATE, and DELETE?', hint: 'DDL vs DML, removing table structure vs data.' },
      { q: 'What are Joins? Explain INNER and LEFT JOIN.', hint: 'Combining tables based on a related column.' },
      { q: 'What is an Index and how does it improve performance?', hint: 'A data structure (often B-Trees) that speeds up data retrieval.' }
    ]
  },
  OOPS: {
    title: 'Object-Oriented Programming Roadmap',
    description: 'Master the core paradigms of OOP to write clean, modular, and reusable code.',
    phases: [
      {
        title: 'Phase 1: Basics of OOP',
        items: ['Classes & Objects', 'Constructors & Destructors', 'Access Modifiers (Public, Private, Protected)']
      },
      {
        title: 'Phase 2: The 4 Pillars',
        items: ['Encapsulation', 'Abstraction', 'Inheritance (Types & Diamond Problem)', 'Polymorphism (Overloading vs Overriding)']
      },
      {
        title: 'Phase 3: Advanced Concepts',
        items: ['Interfaces & Abstract Classes', 'Static members', 'Exception Handling', 'SOLID Principles']
      }
    ],
    practiceQuestions: [
      { q: 'What are the four pillars of OOP?', hint: 'Encapsulation, Abstraction, Inheritance, Polymorphism.' },
      { q: 'What is the difference between Overloading and Overriding?', hint: 'Compile-time (same name, diff args) vs Run-time (redefining in subclass).' },
      { q: 'Explain Abstract Classes vs Interfaces.', hint: 'Interfaces are 100% abstract (prior to Java 8), abstract classes can have logic.' },
      { q: 'What is the Diamond Problem in multiple inheritance?', hint: 'Ambiguity when a class inherits from two classes that have a common ancestor.' },
      { q: 'What does Encapsulation achieve?', hint: 'Data hiding and bundling data with methods that operate on it.' }
    ]
  },
  DSA: {
    title: 'Data Structures & Algorithms Roadmap',
    description: 'The definitive guide to cracking coding interviews at top tech product companies.',
    phases: [
      {
        title: 'Phase 1: Arrays, Strings & Math',
        items: ['Time & Space Complexity (Big O)', 'Array manipulations, Two Pointers', 'Sliding Window', 'Hashing & HashMaps']
      },
      {
        title: 'Phase 2: Core Data Structures',
        items: ['Linked Lists (Singly, Doubly)', 'Stacks & Queues', 'Binary Trees & Traversals', 'Binary Search Trees']
      },
      {
        title: 'Phase 3: Advanced Algorithms',
        items: ['Heaps / Priority Queues', 'Graph Traversals (BFS, DFS)', 'Dynamic Programming (1D & 2D)', 'Greedy Algorithms']
      }
    ],
    practiceQuestions: [
      { q: 'Find the starting point of a loop in a Linked List.', hint: 'Floyd\'s Cycle-Finding Algorithm (Tortoise and Hare).' },
      { q: 'Reverse a Linked List.', hint: 'Maintain prev, curr, and next pointers.' },
      { q: 'Valid Parentheses.', hint: 'Use a Stack data structure.' },
      { q: 'Binary Tree Level Order Traversal.', hint: 'Use a Queue for BFS.' },
      { q: 'Find the shortest path in an unweighted graph.', hint: 'Use BFS.' }
    ]
  }
};
