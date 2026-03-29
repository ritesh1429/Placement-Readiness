export const technicalQuestions = [
  // --- Operating Systems (OS) ---
  {
    id: 'os1', subject: 'OS',
    question: 'What is a deadlock in an Operating System?',
    options: [
      'A condition where a process is waiting for an event that will never happen',
      'When the OS crashes and needs a reboot',
      'When a thread is running endlessly',
      'A network failure'
    ],
    answer: 'A condition where a process is waiting for an event that will never happen'
  },
  {
    id: 'os2', subject: 'OS',
    question: 'Which scheduling algorithm allocates the CPU first to the process that requests the CPU first?',
    options: ['Shortest Job First (SJF)', 'Round Robin (RR)', 'First Come First Serve (FCFS)', 'Priority Scheduling'],
    answer: 'First Come First Serve (FCFS)'
  },
  {
    id: 'os3', subject: 'OS',
    question: 'What is the main function of Virtual Memory?',
    options: [
      'To increase the size of the hard disk',
      'To allow execution of processes that are not completely in memory',
      'To speed up CPU execution',
      'To act as cache memory'
    ],
    answer: 'To allow execution of processes that are not completely in memory'
  },
  {
    id: 'os4', subject: 'OS',
    question: 'Which of the following describes Paging?',
    options: [
      'Memory management scheme that permits physical address space of a process to be non-contiguous',
      'A method to resolve deadlocks',
      'Splitting large processes into smaller threads',
      'A CPU scheduling strategy'
    ],
    answer: 'Memory management scheme that permits physical address space of a process to be non-contiguous'
  },
  {
    id: 'os5', subject: 'OS',
    question: 'What is a context switch?',
    options: [
      'Turning off the computer',
      'Switching the CPU to another process, requiring saving the state of the old process and loading the state of the new process',
      'Changing from user mode to kernel mode',
      'Swapping a process from disk to RAM'
    ],
    answer: 'Switching the CPU to another process, requiring saving the state of the old process and loading the state of the new process'
  },
  {
    id: 'os6', subject: 'OS',
    question: 'What does Belady\'s Anomaly state regarding page replacement algorithms?',
    options: [
      'Increasing the number of page frames can increase the number of page faults for FIFO.',
      'LRU algorithm always performs worse than FIFO.',
      'Optimal page replacement is theoretically impossible.',
      'Thrashing occurs when the page fault rate equals the CPU utilization.'
    ],
    answer: 'Increasing the number of page frames can increase the number of page faults for FIFO.'
  },
  {
    id: 'os7', subject: 'OS',
    question: 'In a system with 32-bit logical addresses and 4KB page size, what is the size of the page table if each entry is 4 bytes? (Assume a single-level page table)',
    options: ['4 MB', '8 MB', '2 MB', '1 MB'],
    answer: '4 MB'
  },
  {
    id: 'os8', subject: 'OS',
    question: 'When does an Operating System experience Thrashing?',
    options: [
      'When the OS spends more time paging (swapping data in/out) than executing processes.',
      'When two processes are permanently deadlocked.',
      'When the CPU cache is repeatedly flushed.',
      'When multiple processes share the same logical memory space.'
    ],
    answer: 'When the OS spends more time paging (swapping data in/out) than executing processes.'
  },
  {
    id: 'os9', subject: 'OS',
    question: 'Which synchronization primitive utilizes an atomic integer variable that is accessed through wait() and signal() operations?',
    options: ['Mutex Locks', 'Monitors', 'Semaphores', 'Condition Variables'],
    answer: 'Semaphores'
  },
  {
    id: 'os10', subject: 'OS',
    question: 'In the context of the Banker\'s Algorithm for deadlock avoidance, a state is considered "Safe" if:',
    options: [
      'All processes are currently waiting.',
      'No processes have acquired their maximum declared resources.',
      'There is a sequence of all processes such that their resource requests can be satisfied by currently available resources plus resources held by previously completed processes.',
      'The available resources exactly match the allocated resources.'
    ],
    answer: 'There is a sequence of all processes such that their resource requests can be satisfied by currently available resources plus resources held by previously completed processes.'
  },

  // --- Computer Networks (CN) ---
  {
    id: 'cn1', subject: 'CN',
    question: 'Which layer of the OSI model does a Router operate on?',
    options: ['Physical Layer', 'Data Link Layer', 'Network Layer', 'Transport Layer'],
    answer: 'Network Layer'
  },
  {
    id: 'cn2', subject: 'CN',
    question: 'Which protocol is used to find the MAC address from an IP address?',
    options: ['SMTP', 'ARP', 'DNS', 'DHCP'],
    answer: 'ARP'
  },
  {
    id: 'cn3', subject: 'CN',
    question: 'What is the main difference between TCP and UDP?',
    options: [
      'TCP is connection-oriented and reliable, UDP is connectionless and unreliable',
      'UDP is connection-oriented, TCP is connectionless',
      'TCP is faster than UDP',
      'There is no difference'
    ],
    answer: 'TCP is connection-oriented and reliable, UDP is connectionless and unreliable'
  },
  {
    id: 'cn4', subject: 'CN',
    question: 'What does DNS stand for?',
    options: ['Dynamic Name System', 'Domain Name System', 'Data Name Service', 'Domain Network Server'],
    answer: 'Domain Name System'
  },
  {
    id: 'cn5', subject: 'CN',
    question: 'What is the size of an IPv4 address?',
    options: ['16 bits', '32 bits', '64 bits', '128 bits'],
    answer: '32 bits'
  },
  {
    id: 'cn6', subject: 'CN',
    question: 'In the TCP protocol, what is the primary purpose of the Slow Start algorithm?',
    options: [
      'To prioritize UDP traffic over TCP traffic.',
      'To prevent the sender from overwhelming the receiver\'s buffer initially.',
      'To exponentially increase the congestion window size to probe the network\'s available capacity.',
      'To establish the connection during the 3-way handshake.'
    ],
    answer: 'To exponentially increase the congestion window size to probe the network\'s available capacity.'
  },
  {
    id: 'cn7', subject: 'CN',
    question: 'Given an IP address 192.168.1.130 with a subnet mask of 255.255.255.192 (/26), what is the broadcast address of this subnet?',
    options: ['192.168.1.191', '192.168.1.255', '192.168.1.192', '192.168.1.127'],
    answer: '192.168.1.191'
  },
  {
    id: 'cn8', subject: 'CN',
    question: 'Which routing protocol uses the path-vector algorithm and is the primary backbone routing protocol of the Internet?',
    options: ['OSPF', 'BGP', 'RIP', 'EIGRP'],
    answer: 'BGP'
  },
  {
    id: 'cn9', subject: 'CN',
    question: 'What mechanism prevents IP packets from looping infinitely in a network if a routing loop occurs?',
    options: ['The Time-to-Live (TTL) field is decremented by each router.', 'CRC Checksums drop cyclical packets.', 'ICMP Destination Unreachable messages.', 'The Fragment Offset field reaches maximum.'],
    answer: 'The Time-to-Live (TTL) field is decremented by each router.'
  },
  {
    id: 'cn10', subject: 'CN',
    question: 'How does Port Address Translation (PAT) / Overloaded NAT distinguish between different internal private IP connections routing out to a single public IP address?',
    options: [
      'By appending MAC addresses to the packets.',
      'By modifying the Source TCP/UDP Port numbers in the Transport layer header.',
      'By changing the IP frame sequence numbers.',
      'By using IPv6 tunneling.'
    ],
    answer: 'By modifying the Source TCP/UDP Port numbers in the Transport layer header.'
  },

  // --- Database Management Systems (DBMS) ---
  {
    id: 'dbms1', subject: 'DBMS',
    question: 'What is the purpose of a Primary Key?',
    options: ['To allow null values in a column', 'To uniquely identify each record in a table', 'To link two different databases', 'To encrypt table data'],
    answer: 'To uniquely identify each record in a table'
  },
  {
    id: 'dbms2', subject: 'DBMS',
    question: 'Which of the following is a DDL (Data Definition Language) command?',
    options: ['SELECT', 'INSERT', 'CREATE', 'UPDATE'],
    answer: 'CREATE'
  },
  {
    id: 'dbms3', subject: 'DBMS',
    question: 'What does ACID stand for in DBMS?',
    options: ['Atomicity, Consistency, Isolation, Durability', 'Accuracy, Consistency, Independence, Durability', 'Atomicity, Concurrency, Isolation, Dependency', 'Accuracy, Concurrency, Integrity, Data'],
    answer: 'Atomicity, Consistency, Isolation, Durability'
  },
  {
    id: 'dbms4', subject: 'DBMS',
    question: 'What is normalization in a database?',
    options: ['Increasing data redundancy', 'A process of organizing data to minimize redundancy', 'A way to sort data alphabetically', 'The process of writing SQL queries'],
    answer: 'A process of organizing data to minimize redundancy'
  },
  {
    id: 'dbms5', subject: 'DBMS',
    question: 'Which type of join returns all rows from the right table, and the matched rows from the left table?',
    options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'],
    answer: 'RIGHT JOIN'
  },
  {
    id: 'dbms6', subject: 'DBMS',
    question: 'Which normal form dictates that a relation must not have independent multi-valued dependencies?',
    options: ['Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Boyce-Codd Normal Form (BCNF)', 'Fourth Normal Form (4NF)'],
    answer: 'Fourth Normal Form (4NF)'
  },
  {
    id: 'dbms7', subject: 'DBMS',
    question: 'What is the core difference between a Clustered Index and a Non-Clustered Index?',
    options: [
      'A table can have multiple clustered indexes but only one non-clustered index.',
      'Clustered indexes physically sort the data rows on the disk, whereas non-clustered indexes create a separate logical structure linking to the rows.',
      'Non-clustered indexes are automatically created on primary keys.',
      'Clustered indexes do not use B-Trees, non-clustered indexes do.'
    ],
    answer: 'Clustered indexes physically sort the data rows on the disk, whereas non-clustered indexes create a separate logical structure linking to the rows.'
  },
  {
    id: 'dbms8', subject: 'DBMS',
    question: 'In Strict Two-Phase Locking (Strict 2PL), when does a transaction release its exclusive (WRITE) locks?',
    options: [
      'As soon as the write operation is completed.',
      'Only after the transaction commits or aborts.',
      'During the shrinking phase as soon as no more locks are needed.',
      'Exclusively when another transaction explicitly requests the lock.'
    ],
    answer: 'Only after the transaction commits or aborts.'
  },
  {
    id: 'dbms9', subject: 'DBMS',
    question: 'What is the primary function of Write-Ahead Logging (WAL) in database systems?',
    options: [
      'To log user interactions for security compliance.',
      'To ensure atomicity and durability by writing modifications to the log on disk before applying them to the actual database pages.',
      'To increase query read performance via log buffering.',
      'To convert complex SQL queries into logging formats.'
    ],
    answer: 'To ensure atomicity and durability by writing modifications to the log on disk before applying them to the actual database pages.'
  },
  {
    id: 'dbms10', subject: 'DBMS',
    question: 'Given tables A and B, which query simulates the exact behavior of the MINUS (or EXCEPT) operator in SQL to find records in A that are not in B?',
    options: [
      'SELECT * FROM A INNER JOIN B ON A.id = B.id',
      'SELECT * FROM A LEFT JOIN B ON A.id = B.id WHERE B.id IS NULL',
      'SELECT * FROM A RIGHT JOIN B ON A.id = B.id WHERE A.id IS NULL',
      'SELECT * FROM A CROSS JOIN B'
    ],
    answer: 'SELECT * FROM A LEFT JOIN B ON A.id = B.id WHERE B.id IS NULL'
  },

  // --- Object-Oriented Programming (OOPS) ---
  {
    id: 'oops1', subject: 'OOPS',
    question: 'Which principle of OOPS is used to hide the internal details and show only the functionality?',
    options: ['Inheritance', 'Encapsulation', 'Abstraction', 'Polymorphism'],
    answer: 'Abstraction'
  },
  {
    id: 'oops2', subject: 'OOPS',
    question: 'In C++ or Java, can an interface have implemented methods?',
    options: ['Yes, by default', 'No, interfaces can only have abstract methods (historically in Java prior to 8)', 'Only if they are static', 'Interfaces are not part of OOPS'],
    answer: 'No, interfaces can only have abstract methods (historically in Java prior to 8)'
  },
  {
    id: 'oops3', subject: 'OOPS',
    question: 'What is method overriding?',
    options: ['Having multiple methods with same name but varying parameters', 'A subclass providing a specific implementation of a method already provided by its parent class', 'Deleting a method from a class', 'Calling a method recursively'],
    answer: 'A subclass providing a specific implementation of a method already provided by its parent class'
  },
  {
    id: 'oops4', subject: 'OOPS',
    question: 'What does encapsulation mean?',
    options: ['Wrapping up of data and information under a single unit', 'Inheriting properties from a base class', 'Creating instances of a class', 'Hiding implementations'],
    answer: 'Wrapping up of data and information under a single unit'
  },
  {
    id: 'oops5', subject: 'OOPS',
    question: 'What is the term for a class that cannot be instantiated?',
    options: ['Final class', 'Abstract class', 'Static class', 'Anonymous class'],
    answer: 'Abstract class'
  },
  {
    id: 'oops6', subject: 'OOPS',
    question: 'The Liskov Substitution Principle (LSP) in the SOLID design principles dictates that:',
    options: [
      'Classes should be open for extension but closed for modification.',
      'A class should have only one reason to change.',
      'Objects of a superclass should be replaceable with objects of its subclasses without affecting program correctness.',
      'High-level modules should not depend on low-level modules.'
    ],
    answer: 'Objects of a superclass should be replaceable with objects of its subclasses without affecting program correctness.'
  },
  {
    id: 'oops7', subject: 'OOPS',
    question: 'How do virtual tables (vtables) enable dynamic polymorphism (dynamic dispatch) under the hood?',
    options: [
      'By compiling all subclass variations into a massive nested switch statement.',
      'By maintaining an array of function pointers in each object that points to the most derived implementation of a virtual method.',
      'By intercepting method execution at the CPU level.',
      'By casting the object strictly to its base class structure during compilation.'
    ],
    answer: 'By maintaining an array of function pointers in each object that points to the most derived implementation of a virtual method.'
  },
  {
    id: 'oops8', subject: 'OOPS',
    question: 'A Private Constructor in Java or C++ is primarily used to:',
    options: [
      'Prevent any subclass from inheriting from the class.',
      'Restrict object instantiation to strictly within the class itself, commonly used in the Singleton pattern.',
      'Ensure that member variables are deeply encrypted upon initialization.',
      'Optimize the memory footprint of the constructor logic.'
    ],
    answer: 'Restrict object instantiation to strictly within the class itself, commonly used in the Singleton pattern.'
  },
  {
    id: 'oops9', subject: 'OOPS',
    question: 'What structural design pattern allows you to attach new behaviors to an object dynamically by placing it inside a wrapper object?',
    options: ['Observer Pattern', 'Factory Pattern', 'Decorator Pattern', 'Singleton Pattern'],
    answer: 'Decorator Pattern'
  },
  {
    id: 'oops10', subject: 'OOPS',
    question: 'What does the \'volatile\' keyword guarantee in multi-threaded Java applications?',
    options: [
      'It guarantees that a variable will be entirely locked from other threads during a synchronized block.',
      'It guarantees that a thread reading a volatile variable will always see the most recent modification made by any thread (visibility).',
      'It guarantees that ++ operations on the variable are completely atomic.',
      'It guarantees that the thread will not be interrupted while accessing the variable.'
    ],
    answer: 'It guarantees that a thread reading a volatile variable will always see the most recent modification made by any thread (visibility).'
  },

  // --- Data Structures & Algorithms (DSA) ---
  {
    id: 'dsa1', subject: 'DSA',
    question: 'Which basic data structure operates on a Last-In-First-Out (LIFO) principle?',
    options: ['Queue', 'Linked List', 'Stack', 'Tree'],
    answer: 'Stack'
  },
  {
    id: 'dsa2', subject: 'DSA',
    question: 'What is the time complexity of Binary Search in the worst case?',
    options: ['O(1)', 'O(n)', 'O(n log n)', 'O(log n)'],
    answer: 'O(log n)'
  },
  {
    id: 'dsa3', subject: 'DSA',
    question: 'Which sorting algorithm has the best average-case time complexity?',
    options: ['Bubble Sort', 'Insertion Sort', 'Selection Sort', 'Merge Sort'],
    answer: 'Merge Sort'
  },
  {
    id: 'dsa4', subject: 'DSA',
    question: 'What is a characteristic of a Binary Search Tree (BST)?',
    options: ['All node values are greater than the root', 'Left child is smaller than parent, right child is greater than parent', 'It allows duplicate nodes at the same level', 'It cannot be unbalanced'],
    answer: 'Left child is smaller than parent, right child is greater than parent'
  },
  {
    id: 'dsa5', subject: 'DSA',
    question: 'Which algorithmic paradigm is Dijkstra\'s shortest path algorithm based on?',
    options: ['Dynamic Programming', 'Divide and Conquer', 'Greedy Algorithm', 'Backtracking'],
    answer: 'Greedy Algorithm'
  },
  {
    id: 'dsa6', subject: 'DSA',
    question: 'What data structure composition is optimal for building a Least Recently Used (LRU) Cache guaranteeing O(1) performance for GET and SET?',
    options: [
      'A Binary Search Tree and a Queue',
      'A Hash Map and a Doubly Linked List',
      'An Array and a Min-Heap',
      'A Stack and a Hash Map'
    ],
    answer: 'A Hash Map and a Doubly Linked List'
  },
  {
    id: 'dsa7', subject: 'DSA',
    question: 'What is the time complexity to insert a new element into a Min-Heap of size N?',
    options: ['O(1)', 'O(N)', 'O(log N)', 'O(N log N)'],
    answer: 'O(log N)'
  },
  {
    id: 'dsa8', subject: 'DSA',
    question: 'In the Knapsack problem, why does the Greedy approach fail for the 0/1 variation but succeed optimally for the Fractional variation?',
    options: [
      '0/1 Knapsack constraints forbid taking partial weights, meaning selecting items strictly by highest value-to-weight ratio can lead to wasted capacity.',
      'Greedy algorithms cannot perform floating-point divisions required for 0/1 variations.',
      'Fractional knapsack requires dynamic programming tabulation.',
      '0/1 Knapsack involves negative weights, which greed logic cannot handle.'
    ],
    answer: '0/1 Knapsack constraints forbid taking partial weights, meaning selecting items strictly by highest value-to-weight ratio can lead to wasted capacity.'
  },
  {
    id: 'dsa9', subject: 'DSA',
    question: 'QuickSort has a theoretical worst-case time complexity of O(N²). In which scenario does this worst case occur, and what is the standard mitigation?',
    options: [
      'All elements are completely random; mitigated by using MergeSort instead limit.',
      'When the array is already perfectly sorted (or reverse sorted) and the pivot is chosen poorly; mitigated by using randomized pivot selection.',
      'When there are no duplicate elements; mitigated by inserting duplicates.',
      'When the dataset exceeds the system memory buffer; mitigated by switching to an iterative tree.'
    ],
    answer: 'When the array is already perfectly sorted (or reverse sorted) and the pivot is chosen poorly; mitigated by using randomized pivot selection.'
  },
  {
    id: 'dsa10', subject: 'DSA',
    question: 'Given a Binary Search Tree (BST), what traversal sequence provides the most efficient way to find the Kth smallest element natively in O(H + K) time?',
    options: [
      'Pre-order traversal',
      'Post-order traversal',
      'Level-order traversal',
      'In-order traversal'
    ],
    answer: 'In-order traversal'
  },

  // --- Aptitude (Quantitative & Logical) ---
  {
    id: 'apt1', subject: 'Aptitude',
    question: 'A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?',
    options: ['120 metres', '180 metres', '324 metres', '150 metres'],
    answer: '150 metres'
  },
  {
    id: 'apt2', subject: 'Aptitude',
    question: 'If A is the brother of B; B is the sister of C; and C is the father of D, how D is related to A?',
    options: ['Brother', 'Sister', 'Nephew', 'Cannot be determined'],
    answer: 'Cannot be determined'
  },
  {
    id: 'apt3', subject: 'Aptitude',
    question: 'A fruit seller had some apples. He sells 40% apples and still has 420 apples. Originally, he had:',
    options: ['588 apples', '600 apples', '672 apples', '700 apples'],
    answer: '700 apples'
  },
  {
    id: 'apt4', subject: 'Aptitude',
    question: 'Three numbers are in the ratio of 3 : 4 : 5 and their L.C.M. is 2400. Their H.C.F. is:',
    options: ['40', '80', '120', '200'],
    answer: '40'
  },
  {
    id: 'apt5', subject: 'Aptitude',
    question: 'Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?',
    options: ['(1/3)', '(1/8)', '(2/8)', '(1/16)'],
    answer: '(1/8)'
  }
];
