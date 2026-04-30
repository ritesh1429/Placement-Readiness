export const placementRoadmaps = {
  OS: {
    title: 'Operating Systems Roadmap',
    description: 'Master process management, memory allocation, concurrency, and system internals to ace OS interviews at top tech companies.',
    totalDuration: '4–6 Weeks',
    phases: [
      {
        title: 'Phase 1: Fundamentals & Process Management',
        duration: '1 Week',
        difficulty: 'Beginner',
        color: '#10b981',
        items: [
          'Introduction to OS — Functions, Types (Batch, Time-Sharing, Real-Time)',
          'System Calls — fork(), exec(), wait(), exit()',
          'Process vs Thread — heavyweight vs lightweight, PCB structure',
          'Process States & Transitions (New → Ready → Running → Waiting → Terminated)',
          'Context Switching — mechanism, overhead, and triggers',
          'Inter-Process Communication (IPC) — Pipes, Message Queues, Shared Memory',
        ],
        resources: [
          { name: 'GeeksForGeeks OS', url: 'https://www.geeksforgeeks.org/operating-systems/' },
          { name: 'GATE Smashers OS (YouTube)', url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p' },
        ]
      },
      {
        title: 'Phase 2: CPU Scheduling Algorithms',
        duration: '1 Week',
        difficulty: 'Intermediate',
        color: '#f59e0b',
        items: [
          'FCFS (First Come First Serve) — Non-preemptive, Convoy Effect',
          'SJF & SRTF — Shortest Job First (preemptive vs non-preemptive)',
          'Round Robin — Time Quantum, Context switch overhead',
          'Priority Scheduling — Ageing to prevent starvation',
          'Multilevel Queue & Feedback Queue Scheduling',
          'CPU Utilization, Throughput, Turnaround Time, Waiting Time calculations',
        ],
        resources: [
          { name: 'CPU Scheduling Visualization', url: 'https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/5_CPU_Scheduling.html' },
          { name: 'Neso Academy OS Playlist', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O' },
        ]
      },
      {
        title: 'Phase 3: Synchronization & Deadlocks',
        duration: '1 Week',
        difficulty: 'Intermediate',
        color: '#f59e0b',
        items: [
          'Critical Section Problem — Mutual Exclusion, Progress, Bounded Waiting',
          'Peterson\'s Solution — Software-based synchronization',
          'Mutex Locks & Semaphores (Binary & Counting)',
          'Classic Problems — Producer-Consumer, Reader-Writer, Dining Philosophers',
          'Deadlock — 4 Necessary Conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait)',
          'Deadlock Handling — Prevention, Avoidance (Banker\'s Algorithm), Detection & Recovery',
        ],
        resources: [
          { name: 'Banker\'s Algorithm Explained', url: 'https://www.geeksforgeeks.org/bankers-algorithm-in-operating-system-2/' },
          { name: 'Semaphores Deep Dive', url: 'https://www.geeksforgeeks.org/semaphores-in-process-synchronization/' },
        ]
      },
      {
        title: 'Phase 4: Memory Management',
        duration: '1 Week',
        difficulty: 'Advanced',
        color: '#ef4444',
        items: [
          'Logical vs Physical Address Space — MMU role',
          'Contiguous Allocation — Fixed & Variable Partitioning, Fragmentation',
          'Paging — Page Table, TLB, Effective Access Time (EAT) calculation',
          'Segmentation — Segment Table, Segmentation + Paging',
          'Virtual Memory — Demand Paging, Page Fault Handling',
          'Page Replacement Algorithms — FIFO, LRU, Optimal (Bélády\'s), LFU',
          'Thrashing — Causes and Working Set Model',
        ],
        resources: [
          { name: 'Virtual Memory (MIT OCW)', url: 'https://ocw.mit.edu/courses/6-828-operating-system-engineering-fall-2012/' },
          { name: 'Page Replacement Practice', url: 'https://www.geeksforgeeks.org/page-replacement-algorithms-in-operating-systems/' },
        ]
      },
      {
        title: 'Phase 5: File Systems & I/O',
        duration: '4–5 Days',
        difficulty: 'Intermediate',
        color: '#f59e0b',
        items: [
          'File Concept — Attributes, Operations, Types, Directory Structures',
          'File Allocation Methods — Contiguous, Linked, Indexed',
          'Free Space Management — Bit Vector, Linked List, Grouping',
          'Disk Scheduling — FCFS, SSTF, SCAN, C-SCAN, LOOK',
          'RAID Levels (0, 1, 5, 6, 10) — Trade-offs',
          'I/O Hardware — Polling, Interrupts, DMA',
        ],
        resources: [
          { name: 'Disk Scheduling Algorithms', url: 'https://www.geeksforgeeks.org/disk-scheduling-algorithms/' },
        ]
      }
    ],
    practiceQuestions: [
      { q: 'Explain all 4 necessary conditions for Deadlock. Give a real-world analogy.', hint: 'Think of 4 people sitting at a table, each holding one chopstick and waiting for the one on their right — Circular Wait!' },
      { q: 'What is the difference between a Process and a Thread? When would you use threads?', hint: 'Process: own memory space, expensive creation. Thread: shared memory, lightweight. Use threads for parallelism within the same app (e.g., web server handling multiple requests).' },
      { q: 'Calculate the Effective Access Time (EAT) if TLB hit ratio is 90%, TLB access = 10ns, memory access = 100ns.', hint: 'EAT = 0.90×(10+100) + 0.10×(10+100+100) = 0.90×110 + 0.10×210 = 99 + 21 = 120 ns.' },
      { q: 'How does the Banker\'s Algorithm prevent deadlock? Walk through an example.', hint: 'It checks safe state before granting any resource. A state is safe if there exists a sequence where every process can finish using available + released resources of prior ones.' },
      { q: 'What is Thrashing? How do you prevent it?', hint: 'When OS spends more time on paging than execution — CPU utilization drops sharply. Fix: reduce degree of multiprogramming, use Working Set Model, or Local Replacement policy.' },
      { q: 'Compare SCAN vs C-SCAN disk scheduling algorithms.', hint: 'SCAN moves head back and forth like an elevator. C-SCAN jumps to the start after reaching the end — more uniform wait times. SCAN can starve requests near one end.' },
      { q: 'What is a Race Condition? Write pseudocode showing how a Mutex prevents it.', hint: 'Two threads reading and writing a shared counter without sync — result is unpredictable. Mutex: lock() → critical section → unlock(). Only one thread in critical section at a time.' },
    ]
  },

  CN: {
    title: 'Computer Networks Roadmap',
    description: 'Understand how data travels across the internet — from physical cables to application protocols. Essential for backend and system design interviews.',
    totalDuration: '3–5 Weeks',
    phases: [
      {
        title: 'Phase 1: Network Models & Physical Layer',
        duration: '4–5 Days',
        difficulty: 'Beginner',
        color: '#10b981',
        items: [
          'OSI Model — 7 Layers, functions, protocols at each layer',
          'TCP/IP Model — 4 Layers and practical mapping to OSI',
          'Physical Layer — Transmission media (wired vs wireless), bandwidth, throughput',
          'Data encoding schemes — NRZ, Manchester, Differential Manchester',
          'Multiplexing — FDM, TDM, WDM, CDMA',
          'Switching — Circuit switching, Packet switching, Message switching',
        ],
        resources: [
          { name: 'Computer Networks - Kurose & Ross (textbook)', url: 'https://gaia.cs.umass.edu/kurose_ross/' },
          { name: 'Gate Smashers CN YouTube', url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_' },
        ]
      },
      {
        title: 'Phase 2: Data Link & Network Layer',
        duration: '1 Week',
        difficulty: 'Intermediate',
        color: '#f59e0b',
        items: [
          'Data Link Layer — Framing, Error Detection (CRC, Checksum, Parity), Error Correction (Hamming)',
          'Flow Control — Stop-and-Wait, Sliding Window (Go-Back-N, Selective Repeat)',
          'MAC Protocols — ALOHA (Pure & Slotted), CSMA/CD (Ethernet), CSMA/CA (Wi-Fi)',
          'IP Addressing — IPv4 (classful & classless), Subnetting, CIDR notation',
          'IPv6 — Address format, differences from IPv4, why we need it',
          'Routing Protocols — RIP (distance vector), OSPF (link state), BGP (path vector)',
          'NAT (Network Address Translation), DHCP, ARP, ICMP',
        ],
        resources: [
          { name: 'Subnet Calculator', url: 'https://www.subnet-calculator.com/' },
          { name: 'Routing Protocols Explained', url: 'https://www.geeksforgeeks.org/routing-protocols-classful-and-classless-routing-protocols/' },
        ]
      },
      {
        title: 'Phase 3: Transport Layer',
        duration: '5–6 Days',
        difficulty: 'Intermediate',
        color: '#f59e0b',
        items: [
          'TCP vs UDP — Connection-oriented vs connectionless, reliability, use cases',
          'TCP Three-Way Handshake — SYN, SYN-ACK, ACK (connection setup)',
          'TCP Four-Way Termination — FIN, FIN-ACK, ACK (connection teardown)',
          'TCP Congestion Control — Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery',
          'TCP Flow Control — Sliding Window, Receiver Buffer',
          'Port Numbers — Well-known (0–1023), Registered, Ephemeral',
          'UDP — Why use it? DNS, DHCP, VoIP, Gaming, Video Streaming',
        ],
        resources: [
          { name: 'TCP Visualization', url: 'https://www.cs.miami.edu/~burt/interactive/tcp.html' },
          { name: 'TCP vs UDP Explained', url: 'https://www.cloudflare.com/learning/ddos/glossary/user-datagram-protocol-udp/' },
        ]
      },
      {
        title: 'Phase 4: Application Layer & Security',
        duration: '5–6 Days',
        difficulty: 'Intermediate',
        color: '#f59e0b',
        items: [
          'DNS — Resolution process (recursive vs iterative), Record types (A, AAAA, MX, CNAME)',
          'HTTP vs HTTPS — Methods (GET, POST, PUT, DELETE), Status codes (200, 301, 404, 500)',
          'HTTP/1.1 vs HTTP/2 vs HTTP/3 — Multiplexing, Header compression, QUIC',
          'Email Protocols — SMTP (sending), IMAP/POP3 (receiving)',
          'FTP, SSH, Telnet — File transfer and remote access',
          'Cryptography Basics — Symmetric (AES), Asymmetric (RSA), Hashing (SHA)',
          'SSL/TLS Handshake — How HTTPS actually works step by step',
          'Firewalls, VPNs, Proxy Servers, CDN — How they protect and accelerate traffic',
        ],
        resources: [
          { name: 'How HTTPS Works (comic)', url: 'https://howhttps.works/' },
          { name: 'DNS Explained Visually', url: 'https://howdns.works/' },
        ]
      }
    ],
    practiceQuestions: [
      { q: 'What happens step-by-step when you type "google.com" in your browser and press Enter?', hint: 'DNS lookup → TCP handshake → TLS handshake → HTTP GET request → HTML response → Browser renders DOM. Mention each layer of OSI.' },
      { q: 'Explain the difference between TCP and UDP with practical examples of when to use each.', hint: 'TCP: HTTP, FTP, email (reliability needed). UDP: DNS, VoIP, gaming, live streaming (speed > reliability). Key: TCP has flow/congestion control, UDP does not.' },
      { q: 'How does subnetting work? What is the subnet mask for a /26 network?', hint: '/26 = 26 bits for network. Subnet mask: 255.255.255.192. Hosts per subnet: 2^6 - 2 = 62 usable. Useful to divide a class C network into 4 subnets.' },
      { q: 'What is ARP (Address Resolution Protocol) and when is it used?', hint: 'Translates IP → MAC address. Needed inside a LAN because switches use MAC. ARP request is broadcast; ARP reply is unicast. ARP cache stores recent mappings.' },
      { q: 'Explain TCP\'s Slow Start and Congestion Window (CWND) mechanism.', hint: 'CWND starts at 1 MSS and doubles each RTT (exponential). At ssthresh, grows linearly. On congestion (timeout): restart slow start. On triple duplicate ACK: fast retransmit.' },
      { q: 'What is the difference between a Hub, Switch, and Router?', hint: 'Hub: Layer 1, broadcasts to all ports. Switch: Layer 2, forwards based on MAC table. Router: Layer 3, routes based on IP, connects different networks.' },
    ]
  },

  DBMS: {
    title: 'Database Management Systems Roadmap',
    description: 'Learn to design efficient schemas, write complex queries, understand transactions, and scale databases — a must for every software engineering interview.',
    totalDuration: '4–5 Weeks',
    phases: [
      {
        title: 'Phase 1: ER Modeling & Relational Design',
        duration: '5–6 Days',
        difficulty: 'Beginner',
        color: '#10b981',
        items: [
          'Database vs DBMS vs RDBMS — Differences and examples',
          'ER Model — Entities, Attributes (simple, composite, multivalued, derived), Relationships',
          'Cardinality — 1:1, 1:N, M:N with real-world examples',
          'ER to Relational Schema conversion — Rules for each relationship type',
          'Keys — Primary Key, Candidate Key, Super Key, Foreign Key, Composite Key',
          'Relational Algebra — Select (σ), Project (π), Join (⋈), Union, Difference',
        ],
        resources: [
          { name: 'ER Diagram Tool (Lucidchart)', url: 'https://www.lucidchart.com/pages/er-diagrams' },
          { name: 'Relational Algebra Practice', url: 'https://www.geeksforgeeks.org/introduction-of-relational-algebra-in-dbms/' },
        ]
      },
      {
        title: 'Phase 2: Normalization',
        duration: '4–5 Days',
        difficulty: 'Intermediate',
        color: '#f59e0b',
        items: [
          '1NF (First Normal Form) — Atomic values, no repeating groups',
          '2NF (Second Normal Form) — No partial dependency (non-prime attr on part of composite key)',
          '3NF (Third Normal Form) — No transitive dependency',
          'BCNF (Boyce-Codd Normal Form) — Stricter than 3NF, every determinant is a super key',
          '4NF & 5NF — Dealing with multi-valued and join dependencies',
          'Denormalization — When and why to add redundancy back (performance vs consistency trade-off)',
        ],
        resources: [
          { name: 'Normalization Examples (GFG)', url: 'https://www.geeksforgeeks.org/normal-forms-in-dbms/' },
          { name: 'Interactive Normalization Quiz', url: 'https://www.w3schools.com/sql/sql_create_table.asp' },
        ]
      },
      {
        title: 'Phase 3: SQL — Queries & Advanced Techniques',
        duration: '1.5 Weeks',
        difficulty: 'Intermediate',
        color: '#f59e0b',
        items: [
          'DDL — CREATE, ALTER, DROP, TRUNCATE (with differences)',
          'DML — SELECT, INSERT, UPDATE, DELETE',
          'Joins — INNER, LEFT, RIGHT, FULL OUTER, SELF, CROSS Join with diagrams',
          'Aggregate Functions — COUNT, SUM, AVG, MAX, MIN with GROUP BY and HAVING',
          'Subqueries — Correlated vs Non-correlated, EXISTS vs IN',
          'Window Functions — ROW_NUMBER(), RANK(), DENSE_RANK(), LEAD(), LAG() — crucial for interviews',
          'CTEs (Common Table Expressions) — WITH clause, recursive CTEs',
          'Indexes — B-Tree Index, Hash Index, Composite Index, Covering Index, when to use',
          'Views, Stored Procedures, Triggers, Functions — Definitions, differences, use cases',
        ],
        resources: [
          { name: 'SQLZoo Practice', url: 'https://sqlzoo.net/wiki/SQL_Tutorial' },
          { name: 'LeetCode SQL 50', url: 'https://leetcode.com/studyplan/top-sql-50/' },
          { name: 'Mode SQL Tutorial', url: 'https://mode.com/sql-tutorial/' },
        ]
      },
      {
        title: 'Phase 4: Transactions & Concurrency Control',
        duration: '5–6 Days',
        difficulty: 'Advanced',
        color: '#ef4444',
        items: [
          'ACID Properties — Atomicity, Consistency, Isolation, Durability with examples',
          'Transaction States — Active, Partially Committed, Committed, Failed, Aborted',
          'Isolation Levels — Read Uncommitted, Read Committed, Repeatable Read, Serializable',
          'Concurrency Problems — Dirty Read, Non-repeatable Read, Phantom Read',
          'Concurrency Control — Lock-based (Shared/Exclusive), Two-Phase Locking (2PL)',
          'Deadlock in DBMS — Detection via Wait-for Graph, Prevention strategies',
          'Timestamp-based Concurrency — Thomas Write Rule',
          'MVCC (Multi-Version Concurrency Control) — Used in PostgreSQL, MySQL InnoDB',
        ],
        resources: [
          { name: 'Transaction Isolation Explained', url: 'https://www.postgresql.org/docs/current/transaction-iso.html' },
          { name: 'Two-Phase Locking (GFG)', url: 'https://www.geeksforgeeks.org/two-phase-locking-2-pl/' },
        ]
      },
      {
        title: 'Phase 5: NoSQL & Database Scaling',
        duration: '4–5 Days',
        difficulty: 'Advanced',
        color: '#ef4444',
        items: [
          'NoSQL Types — Document (MongoDB), Key-Value (Redis), Column (Cassandra), Graph (Neo4j)',
          'SQL vs NoSQL — When to choose which (ACID vs BASE, rigid schema vs flexible)',
          'CAP Theorem — Consistency, Availability, Partition Tolerance — pick 2',
          'Database Sharding — Horizontal partitioning, shard key selection, challenges',
          'Replication — Master-Slave, Master-Master, Read Replicas',
          'Indexing strategies at scale — Composite indexes, partial indexes, covering indexes',
          'Connection Pooling, Query Optimization, EXPLAIN plans',
        ],
        resources: [
          { name: 'MongoDB University (Free)', url: 'https://learn.mongodb.com/' },
          { name: 'CAP Theorem Explained', url: 'https://www.ibm.com/topics/cap-theorem' },
        ]
      }
    ],
    practiceQuestions: [
      { q: 'Write a SQL query to find the 3rd highest salary from an Employee table (handle duplicates with DENSE_RANK).', hint: 'WITH ranked AS (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk FROM Employee) SELECT DISTINCT salary FROM ranked WHERE rnk = 3;' },
      { q: 'Explain ACID properties with a real-world bank transaction example.', hint: 'Atomicity: debit + credit both succeed or both fail. Consistency: balance never negative. Isolation: two transfers don\'t interfere. Durability: even after crash, committed transactions persist.' },
      { q: 'What is the difference between DELETE, TRUNCATE, and DROP?', hint: 'DELETE: DML, row by row, WHERE clause possible, can rollback, triggers fire. TRUNCATE: DDL, removes all rows fast, cannot rollback (usually), no triggers. DROP: removes table structure entirely.' },
      { q: 'Explain 2NF with an example. Why is it important?', hint: 'Table: {StudentID, CourseID, StudentName, CourseName}. StudentName depends only on StudentID (partial dependency). Split into Student(StudentID, StudentName) and Course tables to achieve 2NF.' },
      { q: 'What are window functions? Give an example using RANK() vs DENSE_RANK().', hint: 'RANK: gaps in ranking for ties (1,1,3). DENSE_RANK: no gaps (1,1,2). Example: SELECT name, salary, RANK() OVER (PARTITION BY dept ORDER BY salary DESC) FROM employees;' },
      { q: 'What is a Deadlock in DBMS? How is it different from a Livelock?', hint: 'Deadlock: two transactions each hold a lock the other needs — both blocked forever. Livelock: both keep changing state in response to each other but neither makes progress. Fix deadlock: Wait-for-graph + rollback victim.' },
    ]
  },

  OOPS: {
    title: 'Object-Oriented Programming Roadmap',
    description: 'Master the core paradigms of OOP to write clean, modular, and reusable code. Critical for all software engineering interviews.',
    totalDuration: '3–4 Weeks',
    phases: [
      {
        title: 'Phase 1: OOP Basics & Core Concepts',
        duration: '4–5 Days',
        difficulty: 'Beginner',
        color: '#10b981',
        items: [
          'Class & Object — Blueprint vs Instance, real-world modeling',
          'Constructors — Default, Parameterized, Copy Constructor, Constructor Chaining',
          'Destructors — Role, when called, virtual destructors in C++',
          'Access Modifiers — public, private, protected + package-private (Java)',
          'Static Members — Static variables, static methods, when to use',
          'this keyword — Reference to current object, use cases',
          'Nested & Inner Classes — Static nested, inner, anonymous',
        ],
        resources: [
          { name: 'OOPS in Java (GFG)', url: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/' },
          { name: 'OOP Concepts Visualized', url: 'https://www.visual-paradigm.com/guide/uml-unified-modeling-language/what-is-object-oriented-programming/' },
        ]
      },
      {
        title: 'Phase 2: The 4 Pillars of OOP',
        duration: '1 Week',
        difficulty: 'Intermediate',
        color: '#f59e0b',
        items: [
          'Encapsulation — Data hiding, Getters/Setters, why it matters for security & maintenance',
          'Abstraction — Abstract classes vs Interfaces, hiding implementation details',
          'Inheritance — Single, Multi-level, Hierarchical, Hybrid; IS-A vs HAS-A relationship',
          'Diamond Problem — Multiple inheritance ambiguity, how Java (interfaces) & C++ (virtual) solve it',
          'Polymorphism — Compile-time (Overloading) vs Runtime (Overriding)',
          'Method Overloading — Same name, different parameters, resolved at compile time',
          'Method Overriding — Covariant return type, @Override annotation, rules',
          'Dynamic Dispatch — JVM resolves method call at runtime based on actual object type',
        ],
        resources: [
          { name: 'OOP 4 Pillars (Java Brains)', url: 'https://www.youtube.com/playlist?list=PLqq-6Pq4lTTanfgsbnFzBVLL4E5dnnBBt' },
          { name: 'Polymorphism Examples', url: 'https://www.geeksforgeeks.org/polymorphism-in-java/' },
        ]
      },
      {
        title: 'Phase 3: Advanced OOP',
        duration: '1 Week',
        difficulty: 'Intermediate',
        color: '#f59e0b',
        items: [
          'Abstract Classes vs Interfaces — Key differences, when to use each (Java 8+ default methods)',
          'Exception Handling — try/catch/finally, checked vs unchecked exceptions, custom exceptions',
          'Generics — Generic classes, generic methods, bounded type parameters, wildcards',
          'Collections Framework — List, Set, Map, Queue — implementations and trade-offs',
          'Comparable vs Comparator — Sorting with custom logic',
          'Immutable Classes — How to design them (String is immutable — why?)',
          'Object class methods — equals(), hashCode(), toString(), clone() contracts',
        ],
        resources: [
          { name: 'Java Collections (GFG)', url: 'https://www.geeksforgeeks.org/collections-in-java-2/' },
          { name: 'Effective Java (key ideas)', url: 'https://www.baeldung.com/java-effective-java' },
        ]
      },
      {
        title: 'Phase 4: Design Principles & Patterns',
        duration: '1 Week',
        difficulty: 'Advanced',
        color: '#ef4444',
        items: [
          'SOLID Principles — SRP, OCP, LSP, ISP, DIP — examples for each',
          'DRY, KISS, YAGNI — Coding best practices',
          'Creational Patterns — Singleton, Factory, Abstract Factory, Builder, Prototype',
          'Structural Patterns — Adapter, Decorator, Proxy, Facade, Composite',
          'Behavioral Patterns — Observer, Strategy, Command, Iterator, Template Method',
          'UML Diagrams — Class diagrams, sequence diagrams for system design',
        ],
        resources: [
          { name: 'Refactoring Guru Design Patterns', url: 'https://refactoring.guru/design-patterns' },
          { name: 'SOLID Principles in Java', url: 'https://www.baeldung.com/solid-principles' },
        ]
      }
    ],
    practiceQuestions: [
      { q: 'What is the Diamond Problem? How do Java and C++ handle it differently?', hint: 'Java: no multiple class inheritance, but interfaces (default methods) can cause ambiguity → must explicitly override. C++ uses virtual inheritance to share a single base class instance.' },
      { q: 'What is the difference between Abstraction and Encapsulation?', hint: 'Abstraction: hiding complexity, showing only essential features (what it does). Encapsulation: wrapping data+methods, hiding internal state (how it does it). Abstraction is design-level; Encapsulation is implementation-level.' },
      { q: 'Explain the Liskov Substitution Principle with a violation example.', hint: 'LSP: subclass should be substitutable for its base class. Violation: Square extends Rectangle — setting width also sets height in Square, but Rectangle users don\'t expect that. Fix: don\'t inherit if behavior changes.' },
      { q: 'Why should hashCode() be overridden whenever equals() is overridden?', hint: 'Java contract: if a.equals(b) then a.hashCode() == b.hashCode(). HashMaps use hashCode to find bucket, then equals to match key. Breaking this contract causes objects not found in HashMap despite being "equal".' },
      { q: 'Design a thread-safe Singleton pattern in Java. What are its pitfalls?', hint: 'Double-Checked Locking: check null → sync block → check null again → create. Use volatile keyword on instance. Drawback: complex. Alternative: use Enum-based singleton (simplest, thread-safe, serializable).' },
      { q: 'What is the difference between Composition and Inheritance? When do you prefer composition?', hint: 'Inheritance: IS-A (tight coupling, deep hierarchies). Composition: HAS-A (loose coupling, flexible). Prefer composition when behavior might change at runtime or when classes don\'t share strict IS-A. "Favor composition over inheritance" — GoF.' },
    ]
  },

  DSA: {
    title: 'Data Structures & Algorithms Roadmap',
    description: 'The definitive guide to cracking coding interviews at top tech product companies — from arrays to dynamic programming.',
    totalDuration: '8–12 Weeks',
    phases: [
      {
        title: 'Phase 1: Complexity & Basics',
        duration: '3–4 Days',
        difficulty: 'Beginner',
        color: '#10b981',
        items: [
          'Big O Notation — O(1), O(log N), O(N), O(N log N), O(N²) — recognize patterns',
          'Time vs Space Complexity — Trade-offs, auxiliary space',
          'Best / Average / Worst case analysis',
          'Array & String fundamentals — slice, reverse, rotate, two-pointer technique',
          'Bit Manipulation basics — AND, OR, XOR, left/right shift, common tricks',
        ],
        resources: [
          { name: 'Big O Cheatsheet', url: 'https://www.bigocheatsheet.com/' },
          { name: 'NeetCode Roadmap', url: 'https://neetcode.io/roadmap' },
        ]
      },
      {
        title: 'Phase 2: Core Data Structures',
        duration: '2–3 Weeks',
        difficulty: 'Intermediate',
        color: '#f59e0b',
        items: [
          'Arrays — Sliding Window, Two Pointers, Prefix Sum, Kadane\'s Algorithm',
          'Strings — Rabin-Karp, KMP, Z-algorithm, Anagram detection',
          'Hash Maps & Hash Sets — Collision handling, Load factor, Open addressing vs Chaining',
          'Linked Lists — Singly, Doubly, Circular; Floyd\'s Cycle, Merge, Reverse',
          'Stacks & Queues — Monotonic stack, Next Greater Element, LRU Cache (Deque)',
          'Heaps / Priority Queues — Min-Heap, Max-Heap, Heapify, K-th largest',
          'Trees — Binary Tree traversals (Inorder, Pre, Post, Level), Height, Diameter',
          'Binary Search Trees — Insert, Delete, Validate BST, Kth smallest',
          'Tries — Insert, Search, StartsWith — used in autocomplete, dictionary',
        ],
        resources: [
          { name: 'Visualgo (DS Animations)', url: 'https://visualgo.net/en' },
          { name: 'LeetCode Patterns', url: 'https://seanprashad.com/leetcode-patterns/' },
        ]
      },
      {
        title: 'Phase 3: Algorithms',
        duration: '2–3 Weeks',
        difficulty: 'Intermediate',
        color: '#f59e0b',
        items: [
          'Sorting — Bubble, Selection, Insertion, Merge, Quick, Heap, Counting, Radix Sort — complexity comparison',
          'Binary Search — Classic, on answer space, rotated array variants',
          'Recursion & Backtracking — N-Queens, Sudoku Solver, Permutations, Subsets',
          'Divide & Conquer — Merge Sort, Quick Sort, Binary Search, Strassen\'s Matrix',
          'Greedy Algorithms — Activity Selection, Huffman Coding, Dijkstra (greedy insight)',
        ],
        resources: [
          { name: 'Sorting Visualized', url: 'https://www.sortingalgorithms.io/' },
          { name: 'Backtracking Patterns (GFG)', url: 'https://www.geeksforgeeks.org/backtracking-algorithms/' },
        ]
      },
      {
        title: 'Phase 4: Graphs',
        duration: '1.5 Weeks',
        difficulty: 'Advanced',
        color: '#ef4444',
        items: [
          'Graph Representations — Adjacency List vs Matrix, when to use each',
          'BFS (Breadth-First Search) — Shortest path in unweighted graph, Level-order',
          'DFS (Depth-First Search) — Cycle detection, Topological Sort, Connected Components',
          'Topological Sort — Kahn\'s Algorithm (BFS-based) + DFS-based',
          'Shortest Path — Dijkstra (weighted), Bellman-Ford (negative weights), Floyd-Warshall (all pairs)',
          'Minimum Spanning Tree — Prim\'s, Kruskal\'s (Union-Find / Disjoint Set)',
          'Union-Find (DSU) — Path compression, Union by rank',
          'Articulation Points, Bridges, Strongly Connected Components (Tarjan\'s, Kosaraju\'s)',
        ],
        resources: [
          { name: 'Graph Algorithms (William Fiset)', url: 'https://www.youtube.com/playlist?list=PLDV1Zeh2NRsDGO4--qE8yH72HFL1Km93P' },
          { name: 'LeetCode Graph Problems', url: 'https://leetcode.com/tag/graph/' },
        ]
      },
      {
        title: 'Phase 5: Dynamic Programming',
        duration: '2 Weeks',
        difficulty: 'Advanced',
        color: '#ef4444',
        items: [
          'DP Fundamentals — Memoization (top-down) vs Tabulation (bottom-up)',
          '1D DP — Fibonacci, Climbing Stairs, House Robber, Coin Change',
          '2D DP — Grid paths, Unique Paths, Minimum Path Sum',
          'Classic DP Problems — Longest Common Subsequence (LCS), Longest Palindromic Subsequence',
          'Knapsack Variations — 0/1 Knapsack, Unbounded Knapsack, Subset Sum',
          'DP on Strings — Edit Distance, Wildcard Matching, Regular Expression Matching',
          'DP on Trees & Graphs — Tree DP, Bitmask DP',
          'Interval DP — Matrix Chain Multiplication, Burst Balloons',
        ],
        resources: [
          { name: 'DP Patterns (Aditya Verma YouTube)', url: 'https://www.youtube.com/playlist?list=PL_z_8CaSLPWekqhdCPmFohncHwz8TY2Go' },
          { name: 'LeetCode DP Study Plan', url: 'https://leetcode.com/studyplan/dynamic-programming/' },
        ]
      }
    ],
    practiceQuestions: [
      { q: 'Find the length of the Longest Common Subsequence (LCS) of two strings. Explain the DP approach.', hint: 'dp[i][j] = length of LCS of s1[0..i-1] and s2[0..j-1]. If s1[i-1]==s2[j-1]: dp[i][j]=dp[i-1][j-1]+1, else max(dp[i-1][j], dp[i][j-1]). Time: O(M×N).' },
      { q: 'Detect a cycle in a directed graph. What algorithm do you use?', hint: 'DFS with a "recursion stack" (visited + inStack arrays). If you reach a node already in the recursion stack, there\'s a cycle. For undirected: DFS with parent tracking, or Union-Find.' },
      { q: 'Given an array, find the maximum sum subarray. (Kadane\'s Algorithm)', hint: 'Track maxEndingHere and maxSoFar. At each element: maxEndingHere = max(arr[i], maxEndingHere + arr[i]). maxSoFar = max(maxSoFar, maxEndingHere). Time O(N), Space O(1).' },
      { q: 'Implement Dijkstra\'s Algorithm. What are its time complexity and limitations?', hint: 'Min-heap + visited[]. Pop min-dist node, relax all neighbors. Time: O((V+E) log V). Limitation: fails with negative weights (use Bellman-Ford instead).' },
      { q: 'Solve the 0/1 Knapsack problem using DP. Explain the recurrence relation.', hint: 'dp[i][w] = max value using first i items with capacity w. If weight[i]>w: dp[i][w]=dp[i-1][w]. Else: max(dp[i-1][w], val[i]+dp[i-1][w-wt[i]]). Fill bottom-up table.' },
      { q: 'What is the difference between Prim\'s and Kruskal\'s algorithm for MST?', hint: 'Prim\'s: vertex-based, grows MST from one node, uses min-heap, good for dense graphs O(E log V). Kruskal\'s: edge-based, sorts all edges, uses Union-Find, good for sparse graphs O(E log E).' },
    ]
  },

  WEBDEV: {
    title: 'Web Development Roadmap',
    description: 'A complete path from HTML basics to full-stack development with React and Node.js — covering everything needed for modern web developer roles.',
    totalDuration: '12–16 Weeks',
    phases: [
      {
        title: 'Phase 1: HTML & CSS Fundamentals',
        duration: '1 Week',
        difficulty: 'Beginner',
        color: '#10b981',
        items: [
          'HTML5 Semantic Elements — header, main, section, article, aside, footer, nav',
          'Forms & Validation — input types, required, pattern, custom validation API',
          'Accessibility (a11y) — ARIA roles, alt text, keyboard navigation, screen readers',
          'CSS Box Model — margin, border, padding, content, box-sizing: border-box',
          'Flexbox — justify-content, align-items, flex-wrap, flex-grow, flex-shrink',
          'CSS Grid — grid-template-columns, grid-area, auto-fill vs auto-fit',
          'CSS Variables (Custom Properties) — :root, var(), theme switching',
          'Responsive Design — media queries, mobile-first approach, viewport units',
          'CSS Animations & Transitions — keyframes, timing functions, transform',
        ],
        resources: [
          { name: 'CSS Flexbox Froggy (Game)', url: 'https://flexboxfroggy.com/' },
          { name: 'CSS Grid Garden (Game)', url: 'https://cssgridgarden.com/' },
          { name: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/' },
        ]
      },
      {
        title: 'Phase 2: JavaScript Core',
        duration: '2–3 Weeks',
        difficulty: 'Intermediate',
        color: '#f59e0b',
        items: [
          'Data Types — Primitive vs Reference, typeof, coercion, equality (== vs ===)',
          'Scope & Hoisting — var/let/const differences, temporal dead zone, function scope',
          'Closures — Lexical environment, practical use cases (counters, memoization, IIFE)',
          'Prototypes & Prototype Chain — __proto__, Object.create(), prototype-based inheritance',
          'ES6+ Features — Arrow functions, destructuring, spread/rest, template literals, optional chaining',
          'Promises & Async/Await — Event loop, microtasks vs macrotasks, Promise.all/race/allSettled',
          'Error Handling — try/catch, custom errors, async error handling patterns',
          'DOM Manipulation — querySelector, event delegation, createElement, MutationObserver',
          'Modules — import/export, ES modules vs CommonJS, dynamic import()',
          'Web APIs — Fetch API, localStorage, sessionStorage, Geolocation, WebSockets',
        ],
        resources: [
          { name: 'JavaScript.info (must-read)', url: 'https://javascript.info/' },
          { name: 'You Don\'t Know JS (free)', url: 'https://github.com/getify/You-Dont-Know-JS' },
          { name: 'JS Visualizer (Event Loop)', url: 'https://www.jsv9000.app/' },
        ]
      },
      {
        title: 'Phase 3: React.js',
        duration: '2–3 Weeks',
        difficulty: 'Intermediate',
        color: '#f59e0b',
        items: [
          'JSX & Virtual DOM — How React\'s reconciliation (diffing) works',
          'Component Architecture — Functional components, props, prop drilling problem',
          'Core Hooks — useState, useEffect (lifecycle equivalent), useRef, useMemo, useCallback',
          'Custom Hooks — Extracting logic, reusability, useDebounce, useFetch patterns',
          'Context API — createContext, useContext, avoid prop drilling',
          'React Router v6 — <Routes>, <Route>, useNavigate, useParams, nested routes',
          'State Management — Context + useReducer, when to reach for Redux/Zustand',
          'React Query / TanStack Query — Data fetching, caching, invalidation',
          'Performance Optimization — React.memo, lazy loading, code splitting with Suspense',
          'Error Boundaries — Catching render errors gracefully',
        ],
        resources: [
          { name: 'React Official Docs (new)', url: 'https://react.dev/' },
          { name: 'Scrimba React Course (Free)', url: 'https://scrimba.com/learn/learnreact' },
          { name: 'Jack Herrington (Advanced React)', url: 'https://www.youtube.com/@jherr' },
        ]
      },
      {
        title: 'Phase 4: Node.js & Backend',
        duration: '2–3 Weeks',
        difficulty: 'Intermediate',
        color: '#f59e0b',
        items: [
          'Node.js Core — Event-driven architecture, non-blocking I/O, libuv, event loop',
          'Built-in Modules — fs, path, http, os, events, stream, crypto',
          'Express.js — Routing, Middleware chain, Error handling middleware, Router',
          'REST API Design — HTTP verbs, status codes, resource naming, versioning',
          'Authentication — JWT (Access + Refresh tokens), bcrypt password hashing, cookie vs header storage',
          'Input Validation — express-validator, Joi — sanitizing and validating request data',
          'Environment Variables & Configuration — dotenv, config patterns',
          'Middleware — morgan (logging), cors, helmet (security headers), rate limiting',
          'File Uploads — multer, storing locally vs cloud (AWS S3/Cloudinary)',
        ],
        resources: [
          { name: 'Node.js Official Docs', url: 'https://nodejs.org/en/docs/' },
          { name: 'Express.js Guide', url: 'https://expressjs.com/en/guide/routing.html' },
          { name: 'JWT.io Debugger', url: 'https://jwt.io/' },
        ]
      },
      {
        title: 'Phase 5: Databases for Web',
        duration: '1 Week',
        difficulty: 'Intermediate',
        color: '#f59e0b',
        items: [
          'MongoDB + Mongoose — Schema design, models, CRUD, aggregation pipeline',
          'PostgreSQL basics — Tables, relations, SQL queries for web developers',
          'ORM/ODM — Sequelize (SQL), Mongoose (MongoDB), Prisma (modern TypeScript ORM)',
          'Database Connection Pooling — pg-pool, Mongoose connection management',
          'Indexing for performance — MongoDB compound indexes, PostgreSQL explain analyze',
          'Redis for caching — SET/GET, expiry, session storage, pub/sub basics',
        ],
        resources: [
          { name: 'MongoDB University', url: 'https://learn.mongodb.com/' },
          { name: 'Prisma Docs', url: 'https://www.prisma.io/docs/' },
          { name: 'Redis University', url: 'https://university.redis.com/' },
        ]
      },
      {
        title: 'Phase 6: DevOps, Testing & Deployment',
        duration: '1 Week',
        difficulty: 'Advanced',
        color: '#ef4444',
        items: [
          'Git — Branching strategy (Gitflow), rebase vs merge, squash commits, cherry-pick',
          'Unit Testing — Jest + React Testing Library, testing by behavior not implementation',
          'Integration & E2E Testing — Supertest (API tests), Cypress / Playwright',
          'CI/CD Pipelines — GitHub Actions, automating test + build + deploy',
          'Docker basics — Dockerfile, docker-compose, containerizing Node + React apps',
          'Cloud Deployment — Vercel/Netlify (frontend), Railway/Render (backend), AWS basics',
          'Performance & SEO — Core Web Vitals (LCP, CLS, FID), Lighthouse, lazy loading images',
          'Web Security — OWASP Top 10, SQL injection, XSS, CSRF protection, HTTPS, CSP',
        ],
        resources: [
          { name: 'Docker Curriculum (Free)', url: 'https://docker-curriculum.com/' },
          { name: 'GitHub Actions Docs', url: 'https://docs.github.com/en/actions' },
          { name: 'Kent C. Dodds Testing', url: 'https://testingjavascript.com/' },
        ]
      }
    ],
    practiceQuestions: [
      { q: 'Explain the JavaScript Event Loop. What is the difference between microtasks and macrotasks?', hint: 'Call stack → Web APIs → Callback queue (macrotasks: setTimeout, setInterval) → Microtask queue (Promises, queueMicrotask). Microtasks are processed after every task before next macrotask. This is why Promise.then() runs before setTimeout.' },
      { q: 'What is a React closure trap in useEffect? How do you fix it?', hint: 'useEffect captures stale state/props from its closure. Fix: add the variable to dependency array, or use useRef to hold mutable value, or use setState with functional updater (prev => prev + 1).' },
      { q: 'Explain the difference between JWT and Session-based authentication. When would you pick each?', hint: 'Session: server stores state, scales poorly. JWT: stateless, self-contained, easy to scale but cannot be invalidated before expiry. Use Sessions for traditional web apps, JWT for APIs/SPAs/mobile. Add refresh tokens for JWT security.' },
      { q: 'What are CORS errors and how do you fix them in Express?', hint: 'Browser blocks cross-origin requests without proper Access-Control headers. Fix with cors() middleware in Express: app.use(cors({ origin: "http://localhost:3000" })). Pre-flight OPTIONS request handled automatically.' },
      { q: 'What is the Virtual DOM in React and how does reconciliation work?', hint: 'Virtual DOM is a lightweight JS object tree mirroring the real DOM. On state change, React creates a new VDOM tree, diffs it with the previous (reconciliation using Fiber), and applies minimal real DOM patches (batched updates).' },
      { q: 'How does CSS specificity work? Resolve this: a class .btn, an ID #submit, and inline style all apply color to the same button.', hint: 'Specificity order (low → high): element (0,0,1) < class (0,1,0) < ID (1,0,0) < inline style (won\'t appear in rule) < !important. Inline style wins over ID wins over class. !important overrides everything.' },
    ]
  }
};
