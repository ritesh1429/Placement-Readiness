export const defaultCompanyQuestions = [
  // ─────────────────── PRODUCT-BASED ───────────────────
  {
    id: 'google',
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    color: '#ea4335',
    roadmap: {
      phases: [
        {
          title: 'Phase 1: Master DSA',
          items: ['Arrays & Hashing', 'Two Pointers & Sliding Window', 'Binary Search', 'Trees & Graphs (BFS/DFS)']
        },
        {
          title: 'Phase 2: System Design',
          items: ['Distributed Systems Basics', 'CAP Theorem', 'Load Balancing & Caching', 'Design Google Search / YouTube']
        },
        {
          title: 'Phase 3: Behavioral & Culture Fit',
          items: ['STAR Method Stories', 'Googliness & Leadership', 'Mock Interviews (Pramp, Interviewing.io)', 'Open Source Contributions']
        }
      ],
      tips: [
        'Focus on LeetCode Hard; Google expects clean, optimal solutions.',
        'Practice explaining your thought process aloud before giving code.',
        'Read "Designing Data-Intensive Applications" for system design.'
      ]
    },
    resources: [
      { name: 'Google Tech Dev Guide', url: 'https://techdevguide.withgoogle.com/', description: 'Official learning path from Google engineers.' },
      { name: 'LeetCode – Google Tag', url: 'https://leetcode.com/company/google/', description: 'Curated Google interview questions.' },
      { name: 'Grokking System Design', url: 'https://www.educative.io/courses/grokking-the-system-design-interview', description: 'Top course for system design prep.' },
      { name: 'NeetCode Roadmap', url: 'https://neetcode.io/roadmap', description: 'Structured DSA roadmap with video solutions.' }
    ],
    questions: [
      { id: 'g1', type: 'System Design', difficulty: 'Hard', question: 'Design a system to serve millions of search queries per second.', hint: 'Discuss Reverse Indexing, Distributed Caching (Memcached/Redis), and Load Balancing.' },
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
    roadmap: {
      phases: [
        {
          title: 'Phase 1: DSA Foundation',
          items: ['Arrays, Strings & HashMaps', 'Heaps & Priority Queues', 'Trees & Linked Lists', 'Dynamic Programming']
        },
        {
          title: 'Phase 2: Leadership Principles',
          items: ['Study all 16 LPs deeply', 'Prepare 2 STAR stories per LP', '"Dive Deep", "Customer Obsession", "Bias for Action"', 'Practice written communication']
        },
        {
          title: 'Phase 3: System Design',
          items: ['Design Amazon Cart / Order System', 'Microservices & Event-Driven Design', 'AWS Services overview (S3, SQS, Lambda)', 'Database Sharding & Replication']
        }
      ],
      tips: [
        'Amazon interviewers weigh behavioral equally with coding — don\'t under-prepare.',
        'For every coding question, briefly discuss time/space complexity.',
        'Know the difference between SQL and NoSQL and when to use each.'
      ]
    },
    resources: [
      { name: 'Amazon Leadership Principles', url: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles', description: 'The 16 LPs you must know inside out.' },
      { name: 'LeetCode – Amazon Tag', url: 'https://leetcode.com/company/amazon/', description: 'Most frequently asked Amazon questions.' },
      { name: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', description: 'Comprehensive free system design resource.' },
      { name: 'InterviewBit – Amazon', url: 'https://www.interviewbit.com/amazon-interview-questions/', description: 'Topic-wise Amazon interview questions.' }
    ],
    questions: [
      { id: 'a1', type: 'Graphs', difficulty: 'Medium', question: 'Number of Islands: Given a 2D grid map of \'1\'s (land) and \'0\'s (water), count the number of islands.', hint: 'Use DFS or BFS to traverse adjacent lands.' },
      { id: 'a2', type: 'Arrays', difficulty: 'Easy', question: 'Two Sum: Find two numbers such that they add up to a specific target number.', hint: 'Use a HashMap to store values and their indices to achieve O(N) time.' },
      { id: 'a3', type: 'Linked List', difficulty: 'Hard', question: 'Merge k Sorted Lists.', hint: 'Use a Min-Heap (Priority Queue) to track the smallest current element of each list.' },
      { id: 'a4', type: 'System Design', difficulty: 'Hard', question: 'Design an e-commerce checkout architecture that can handle Prime Day traffic.', hint: 'Discuss Microservices, Event-Driven Architecture (Kafka), and Database Sharding.' },
      { id: 'a5', type: 'Behavioral', difficulty: 'Hard', question: 'Describe a situation where you had to quickly pivot on a project due to changing requirements.', hint: 'Amazon LP: Bias for Action & Dive Deep. Emphasize adaptability.' }
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    color: '#00a4ef',
    roadmap: {
      phases: [
        {
          title: 'Phase 1: Core CS Concepts',
          items: ['Arrays, Strings, Linked Lists', 'Trees & BST Operations', 'OS Fundamentals (Processes, Threads)', 'OOPS Concepts & Design Patterns']
        },
        {
          title: 'Phase 2: Coding Rounds',
          items: ['LeetCode Medium difficulty', 'Graph Algorithms (BFS, DFS, Dijkstra)', 'Dynamic Programming basics', 'Recursion & Backtracking']
        },
        {
          title: 'Phase 3: System & Behavioral',
          items: ['Design Microsoft Teams / OneDrive', 'Azure Cloud fundamentals', 'Growth Mindset & Collaboration stories', 'HR round preparation']
        }
      ],
      tips: [
        'Microsoft focuses on problem-solving approach — explain your thinking step by step.',
        'Be familiar with at least one OOP language deeply (C++, C#, or Java).',
        'Expect 4-5 coding rounds; practice until Mediums feel easy.'
      ]
    },
    resources: [
      { name: 'LeetCode – Microsoft Tag', url: 'https://leetcode.com/company/microsoft/', description: 'Top Microsoft interview questions by frequency.' },
      { name: 'GeeksForGeeks – Microsoft', url: 'https://www.geeksforgeeks.org/microsoft-interview-questions/', description: 'Categorized Microsoft interview questions.' },
      { name: 'Azure Learn', url: 'https://learn.microsoft.com/en-us/training/', description: 'Free Microsoft Azure & product tutorials.' },
      { name: 'Design Patterns (Refactoring Guru)', url: 'https://refactoring.guru/design-patterns', description: 'Visual guide to all major design patterns.' }
    ],
    questions: [
      { id: 'm1', type: 'Arrays', difficulty: 'Medium', question: 'Find the minimum in a Rotated Sorted Array.', hint: 'Use a modified Binary Search. If mid > right, min is in right half.' },
      { id: 'm2', type: 'Linked List', difficulty: 'Medium', question: 'Detect a cycle in a Linked List.', hint: 'Floyd\'s Cycle-Finding Algorithm (Tortoise and Hare).' },
      { id: 'm3', type: 'Strings', difficulty: 'Medium', question: 'Determine if a string is a valid palindrome, considering only alphanumeric characters.', hint: 'Two pointers, one from start, one from end, skipping non-alphanumeric.' },
      { id: 'm4', type: 'OS', difficulty: 'Hard', question: 'Implement a Thread-Safe LRU Cache.', hint: 'Combine a Doubly Linked List, HashMap, and Mutex Locks for concurrency control.' },
      { id: 'm5', type: 'Behavioral', difficulty: 'Medium', question: 'What is your most technically complex personal project and why?', hint: 'Discuss architecture choices, scaling issues faced, and specific algorithms used.' }
    ]
  },

  // ─────────────────── SERVICE-BASED ───────────────────
  {
    id: 'infosys',
    name: 'Infosys',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg',
    color: '#007cc2',
    roadmap: {
      phases: [
        {
          title: 'Phase 1: Aptitude & Reasoning',
          items: ['Quantitative Aptitude (Percentages, Ratios, TW)', 'Logical Reasoning (Blood Relations, Syllogisms)', 'Data Interpretation (Bar/Pie Charts)', 'Verbal Ability (RC, Error Spotting)']
        },
        {
          title: 'Phase 2: Technical Skills',
          items: ['C / C++ / Java basics', 'OOPS concepts with examples', 'DBMS – SQL Queries & Normalization', 'OS & Networking fundamentals']
        },
        {
          title: 'Phase 3: HR & Communication',
          items: ['Tell me about yourself (crisp 2 min version)', 'Why Infosys? Company-specific answer', 'Situational & Value-based questions', 'Clear English communication practice']
        }
      ],
      tips: [
        'Infosys InfyTQ certification greatly boosts your shortlisting chances.',
        'The aptitude section has a negative marking; don\'t guess blindly.',
        'Verbal ability section is heavily weighted — read English newspapers daily.'
      ]
    },
    resources: [
      { name: 'Infosys InfyTQ Platform', url: 'https://www.infytq.com/', description: 'Official Infosys practice and certification portal.' },
      { name: 'IndiaBix – Infosys Papers', url: 'https://www.indiabix.com/', description: 'Aptitude, reasoning, and verbal practice questions.' },
      { name: 'PrepInsta – Infosys', url: 'https://prepinsta.com/infosys/', description: 'Complete Infosys pattern and mock tests.' },
      { name: 'GeeksForGeeks – Infosys', url: 'https://www.geeksforgeeks.org/infosys-interview-questions/', description: 'Previous year technical interview questions.' }
    ],
    questions: [
      { id: 'inf1', type: 'Aptitude', difficulty: 'Medium', question: 'A train 150m long passes a pole in 15 seconds and another train of the same length traveling in the opposite direction in 9 seconds. What is the speed of the second train?', hint: 'Speed of Train 1 = 150/15 = 10 m/s. Combined speed = 300/9. Speed 2 = Combined - Speed 1.' },
      { id: 'inf2', type: 'Reasoning', difficulty: 'Easy', question: 'If A is the brother of B, B is the sister of C, and C is the father of D, how is A related to D?', hint: 'Trace the chain: A→B (siblings), B→C (siblings), C→D (father). A is Uncle of D.' },
      { id: 'inf3', type: 'C/Java', difficulty: 'Medium', question: 'What is the output of: int x = 5; System.out.println(x++ + " " + ++x);', hint: 'x++ uses then increments (5), then ++x increments first (7). Output: 5 7.' },
      { id: 'inf4', type: 'DBMS', difficulty: 'Medium', question: 'Write a SQL query to find the second highest salary from an Employee table.', hint: 'Use SELECT MAX(salary) WHERE salary < (SELECT MAX(salary)...) or use DENSE_RANK().' },
      { id: 'inf5', type: 'Behavioral', difficulty: 'Easy', question: 'Where do you see yourself in 5 years? Why do you want to join Infosys?', hint: 'Align with Infosys\'s focus on digital transformation, AI, and cloud services. Be genuine.' }
    ]
  },
  {
    id: 'capgemini',
    name: 'Capgemini',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Capgemini_logo.svg/800px-Capgemini_logo.svg.png',
    color: '#0070ad',
    roadmap: {
      phases: [
        {
          title: 'Phase 1: Psychometric & Aptitude',
          items: ['Capgemini Game-based Assessment (AMCAT/Sova)', 'Quantitative Aptitude (20 Qs, 25 min)', 'Abstract/Logical Reasoning patterns', 'Behavioral Psychometric Test preparation']
        },
        {
          title: 'Phase 2: Technical Round',
          items: ['Pseudo-code & Algorithm questions', 'OOPS concepts (Inheritance, Polymorphism)', 'Basic Data Structures (Arrays, LinkedList)', 'SQL – Joins, Aggregate Functions']
        },
        {
          title: 'Phase 3: HR Interview',
          items: ['Why Capgemini specific answer', 'Values: Honesty, Boldness, Trust, Freedom', 'Situational questions (team conflicts)', 'Salary negotiation awareness']
        }
      ],
      tips: [
        'Capgemini uses the AMCAT pattern — practise on AMCAT official portal.',
        'The pseudo-code round is unique to Capgemini; practice it separately.',
        'Capgemini values cultural fit; align with their 7 core values in interviews.'
      ]
    },
    resources: [
      { name: 'PrepInsta – Capgemini', url: 'https://prepinsta.com/capgemini/', description: 'Exact pattern mock tests for every Capgemini round.' },
      { name: 'AMCAT Sample Papers', url: 'https://www.myamcat.com/', description: 'Official AMCAT practice and registration portal.' },
      { name: 'GeeksForGeeks – Capgemini', url: 'https://www.geeksforgeeks.org/capgemini-interview-questions/', description: 'Technical and HR question bank.' },
      { name: 'IndiaBix – Pseudo-code', url: 'https://www.indiabix.com/technical/programs/', description: 'Practice pseudo-code and programming logic.' }
    ],
    questions: [
      { id: 'cap1', type: 'Pseudo-code', difficulty: 'Medium', question: 'What does the following pseudo-code print? x=1; while(x<=5){ print x*x; x=x+2; }', hint: 'x takes values 1, 3, 5. Prints 1, 9, 25.' },
      { id: 'cap2', type: 'Aptitude', difficulty: 'Medium', question: 'A can do a work in 12 days. B can do it in 18 days. They work together for 4 days, then A leaves. How many more days does B need?', hint: 'Work/day together = 1/12+1/18 = 5/36. In 4 days: 20/36. Remaining 16/36 done by B at 1/18 per day.' },
      { id: 'cap3', type: 'OOPS', difficulty: 'Easy', question: 'What is the difference between method overloading and method overriding?', hint: 'Overloading = same name, different params (compile-time). Overriding = redefine in subclass (runtime).' },
      { id: 'cap4', type: 'SQL', difficulty: 'Medium', question: 'Write a query to find all employees who earn more than the average salary of their department.', hint: 'Use a correlated subquery: WHERE salary > (SELECT AVG(salary) FROM emp e2 WHERE e2.dept = e1.dept).' },
      { id: 'cap5', type: 'Behavioral', difficulty: 'Easy', question: 'Describe a time you worked in a team where there was a conflict. How did you handle it?', hint: 'Show empathy, communication. Use STAR. Highlight compromise and positive outcome.' }
    ]
  },
  {
    id: 'accenture',
    name: 'Accenture',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg',
    color: '#a100ff',
    roadmap: {
      phases: [
        {
          title: 'Phase 1: Cognitive & Aptitude',
          items: ['Cognitive Ability Test (Abstract Reasoning, Numerical)', 'Verbal Reasoning (Sentence arrangement, Synonyms)', 'Attention to Detail exercises', 'AMCAT / Wheebox based pattern']
        },
        {
          title: 'Phase 2: Technical Interview',
          items: ['C, C++, Java, Python basics', 'OOPS, DBMS, OS, CN core concepts', 'Basic coding (sorting, searching, string ops)', 'Project-based discussion (your resume)']
        },
        {
          title: 'Phase 3: HR Interview',
          items: ['Situational Leadership questions', 'Why Accenture & digital transformation vision', 'Communication & presentation skills', 'Flexibility for relocation & shifts']
        }
      ],
      tips: [
        'Accenture\'s communication round has a voice/essay component — practice writing.',
        'Resume projects will be discussed in depth — know every line you wrote.',
        'Accenture values "360° value" — research their recent projects before the interview.'
      ]
    },
    resources: [
      { name: 'Accenture Careers & Prep', url: 'https://www.accenture.com/in-en/careers', description: 'Official Accenture careers and insights hub.' },
      { name: 'PrepInsta – Accenture', url: 'https://prepinsta.com/accenture/', description: 'All rounds practice with Accenture pattern mocks.' },
      { name: 'GeeksForGeeks – Accenture', url: 'https://www.geeksforgeeks.org/accenture-interview-questions/', description: 'Frequently asked technical interview questions.' },
      { name: 'IndiaBix – Verbal Reasoning', url: 'https://www.indiabix.com/verbal-reasoning/questions-and-answers/', description: 'Strong verbal reasoning practice board.' }
    ],
    questions: [
      { id: 'acc1', type: 'Reasoning', difficulty: 'Easy', question: 'Arrange the following in a logical sequence: Sentence, Word, Paragraph, Letter, Essay.', hint: 'Build from smallest unit: Letter → Word → Sentence → Paragraph → Essay.' },
      { id: 'acc2', type: 'Aptitude', difficulty: 'Medium', question: 'If the cost price of 10 articles is equal to the selling price of 8, what is the profit percentage?', hint: 'Let CP=10x, SP for 8=10x → SP for 10 = 12.5x. Profit% = (2.5/10)*100 = 25%.' },
      { id: 'acc3', type: 'Technical', difficulty: 'Easy', question: 'What is a pointer in C? How is it different from a reference in C++?', hint: 'Pointer stores memory address and can be NULL or reassigned. Reference is an alias and cannot be null.' },
      { id: 'acc4', type: 'DBMS', difficulty: 'Medium', question: 'What is denormalization and when would you use it?', hint: 'Adding redundancy to improve read performance. Use when read speed > data consistency need (analytics, reporting).' },
      { id: 'acc5', type: 'Behavioral', difficulty: 'Easy', question: 'Tell me about yourself and why you are a strong fit for Accenture\'s culture of innovation.', hint: 'Mention a project using emerging tech. Align with Accenture\'s AI, cloud, and digital transformation focus.' }
    ]
  },
  {
    id: 'deloitte',
    name: 'Deloitte',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg',
    color: '#86bc25',
    roadmap: {
      phases: [
        {
          title: 'Phase 1: Aptitude & Verbal',
          items: ['Quantitative Aptitude (TCS iON/Wheebox pattern)', 'Data Interpretation tables and charts', 'Logical Reasoning (Coding-decoding, Series)', 'Verbal Ability (RC, Fill in the blanks)']
        },
        {
          title: 'Phase 2: Technical Case Round',
          items: ['Technical concepts (OOPS, DBMS, Networking)', 'Basic case study analysis', 'SQL queries and optimization basics', 'Programming: sorting & string manipulation']
        },
        {
          title: 'Phase 3: HR & Partner Round',
          items: ['Deloitte values: Integrity, Excellence, Respect', 'Consulting mindset & structured problem solving', 'Leadership experience stories', 'Current tech & business trends awareness']
        }
      ],
      tips: [
        'Deloitte has a unique "case study" discussion — practice structured thinking.',
        'The HR round can be quite long; show genuine enthusiasm for consulting + tech.',
        'Research Deloitte\'s current projects in India (UST, GDC, etc.) before the interview.'
      ]
    },
    resources: [
      { name: 'Deloitte Careers Portal', url: 'https://deloitte.com/in/en/careers.html', description: 'Official Deloitte India careers and application hub.' },
      { name: 'PrepInsta – Deloitte', url: 'https://prepinsta.com/deloitte/', description: 'Complete Deloitte pattern mock test series.' },
      { name: 'GeeksForGeeks – Deloitte', url: 'https://www.geeksforgeeks.org/deloitte-interview-questions/', description: 'Technical + HR interview question database.' },
      { name: 'Case Interview Guide (MConsultingPrep)', url: 'https://mconsultingprep.com/case-interview/', description: 'Free guide to ace Deloitte\'s case discussion.' }
    ],
    questions: [
      { id: 'del1', type: 'Aptitude', difficulty: 'Medium', question: 'A sum of money doubles itself in 10 years at simple interest. In how many years will it triple itself?', hint: 'Rate = 10%/year (SI). To triple, need 200% interest. Time = 200/10 = 20 years.' },
      { id: 'del2', type: 'Reasoning', difficulty: 'Medium', question: 'In a code, COMPUTER is written as RFUVQNPC. How is MEDICINE written?', hint: 'Each letter is shifted by a specific offset. Identify the pattern from COMPUTER→RFUVQNPC and apply it.' },
      { id: 'del3', type: 'Technical', difficulty: 'Easy', question: 'Explain ACID properties in DBMS with a real-world example.', hint: 'Bank transaction: Atomicity (all or nothing), Consistency (valid state), Isolation (no interference), Durability (committed = permanent).' },
      { id: 'del4', type: 'Coding', difficulty: 'Medium', question: 'Write a program to check if a number is prime. Optimize it beyond O(N).', hint: 'Check divisibility only up to √N. If no divisors found in that range, it\'s prime. Time complexity: O(√N).' },
      { id: 'del5', type: 'Behavioral', difficulty: 'Easy', question: 'Give an example of a time you demonstrated leadership without having an official leadership title.', hint: 'STAR format. Show initiative, ownership, team coordination. Deloitte values informal leadership.' }
    ]
  },

  // ─────────────────── TCS VARIANTS ───────────────────
  {
    id: 'tcs-ninja',
    name: 'TCS Ninja',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg',
    color: '#e7152b',
    roadmap: {
      phases: [
        {
          title: 'Phase 1: TCS NQT Aptitude',
          items: ['Numerical Ability (25 Qs)', 'Verbal Ability (24 Qs — RC & Grammar)', 'Reasoning Ability (30 Qs)', 'Programming Logic (10 Qs – Pseudo-code)']
        },
        {
          title: 'Phase 2: Coding Round',
          items: ['Two coding questions in 1 hour', 'C / C++ / Java / Python allowed', 'String manipulation problems', 'Array and Number-based problems (Easy-Medium)']
        },
        {
          title: 'Phase 3: Interview',
          items: ['Technical round: OOPS, DBMS, OS basics', 'MR (Managerial Round) — project discussion', 'HR round: Flexibility (service bond), relocation', 'TCS values and culture knowledge']
        }
      ],
      tips: [
        'TCS Ninja cut-off is usually 50–60% in NQT — don\'t skip verbal section.',
        'The programming logic round has MCQs, not actual coding — practise pseudo-code.',
        'TCS has a 2-year service bond — be clear about your acceptance before joining.'
      ]
    },
    resources: [
      { name: 'TCS NQT Official Portal', url: 'https://www.tcs.com/careers/tcs-nqt', description: 'Register and get official NQT practice material.' },
      { name: 'PrepInsta – TCS Ninja', url: 'https://prepinsta.com/tcs-ninja/', description: 'Previous year TCS Ninja papers and full mocks.' },
      { name: 'GeeksForGeeks – TCS NQT', url: 'https://www.geeksforgeeks.org/tcs-nqt-interview-questions/', description: 'NQT pattern coding + aptitude questions.' },
      { name: 'IndiaBix – Aptitude Practice', url: 'https://www.indiabix.com/', description: 'Large bank of aptitude and reasoning practice.' }
    ],
    questions: [
      { id: 'tcn1', type: 'Aptitude', difficulty: 'Easy', question: 'If 6 men can complete a work in 8 days, in how many days can 8 men complete the same work?', hint: 'Men × Days = Constant. 6×8 = 8×D → D = 6 days.' },
      { id: 'tcn2', type: 'Verbal', difficulty: 'Easy', question: 'Select the correct sentence: (A) He don\'t know the answer. (B) He doesn\'t knows the answer. (C) He doesn\'t know the answer. (D) He don\'t knows the answer.', hint: 'With 3rd person singular (He/She/It), use "doesn\'t" + base form. Option C is correct.' },
      { id: 'tcn3', type: 'Pseudo-code', difficulty: 'Medium', question: 'What does this pseudo-code output? i=0; sum=0; while(i<5){ i++; if(i%2==0) sum+=i; } print(sum)', hint: 'Even i values in 1-5: 2 and 4. sum = 2+4 = 6.' },
      { id: 'tcn4', type: 'Coding', difficulty: 'Easy', question: 'Write a program to reverse a string without using built-in reverse functions.', hint: 'Use two pointers: left=0, right=n-1. Swap characters and move pointers inward until they cross.' },
      { id: 'tcn5', type: 'OOPS', difficulty: 'Easy', question: 'What is runtime polymorphism? Give a Java example.', hint: 'Runtime polymorphism via method overriding. Parent ref holds child object; JVM resolves method at runtime.' }
    ]
  },

  // ─────────────────── OTHER SERVICE COMPANIES ───────────────────
  {
    id: 'wipro',
    name: 'Wipro WILP',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg',
    color: '#0ea5e9',
    roadmap: {
      phases: [
        {
          title: 'Phase 1: Online Assessment',
          items: ['Aptitude (Quantitative + Logical) – 16 Qs', 'Written English – Essay & Email Writing', 'Coding Ability – 1–2 programs (60 min)', 'Verbal Ability and Communication test']
        },
        {
          title: 'Phase 2: Technical Interview',
          items: ['Core CS: OOPS, DBMS, OS, CN', 'Coding discussion on your own code', 'Final year project / internship deep-dive', 'Problem-solving approach & optimization']
        },
        {
          title: 'Phase 3: HR Round',
          items: ['Wipro values: Spirit, Integrity, One Wipro', 'Relocation and shift flexibility', 'Salary structure and 3.5 LPA package details', 'Long-term career goals at Wipro']
        }
      ],
      tips: [
        'Wipro WILP Written English test is uncommon — practise formal email writing.',
        'The essay writing section asks for 200-250 words on a business/tech topic.',
        'Only 1 coding question in most batches — but it must compile and run for full marks.'
      ]
    },
    resources: [
      { name: 'PrepInsta – Wipro WILP', url: 'https://prepinsta.com/wipro/', description: 'Exact WILP pattern mock tests and previous papers.' },
      { name: 'GeeksForGeeks – Wipro', url: 'https://www.geeksforgeeks.org/wipro-interview-questions/', description: 'Technical interview Q&A and experience articles.' },
      { name: 'Grammarly (Email Writing)', url: 'https://www.grammarly.com/', description: 'Improve written English for Wipro\'s essay round.' },
      { name: 'HackerEarth Practice', url: 'https://www.hackerearth.com/practice/', description: 'Practice Easy to Medium coding problems online.' }
    ],
    questions: [
      { id: 'wip1', type: 'Aptitude', difficulty: 'Easy', question: 'A shopkeeper bought an article for ₹600 and sold it for ₹750. What is the profit percentage?', hint: 'Profit = 150. Profit% = (150/600)*100 = 25%.' },
      { id: 'wip2', type: 'Written English', difficulty: 'Medium', question: 'Write a formal email to your manager requesting a 3-day work-from-home arrangement.', hint: 'Start with Subject, Address formally, State reason clearly, Mention coverage plan, Close professionally.' },
      { id: 'wip3', type: 'Coding', difficulty: 'Medium', question: 'Write a program to find all prime numbers between 1 and 100 (Sieve of Eratosthenes).', hint: 'Create a boolean array. Start marking multiples of each prime as not prime from 2 onwards.' },
      { id: 'wip4', type: 'Technical', difficulty: 'Easy', question: 'What is the difference between TCP and UDP? When would you choose UDP over TCP?', hint: 'TCP: reliable, ordered, connection-oriented. UDP: fast, connectionless. Use UDP for video streaming, gaming, VoIP.' },
      { id: 'wip5', type: 'Behavioral', difficulty: 'Easy', question: 'Describe a situation where you had a tight deadline. How did you manage your time?', hint: 'Show prioritization, breaking tasks into smaller chunks, progress tracking. STAR method.' }
    ]
  },
  {
    id: 'zoho',
    name: 'Zoho',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Zoho-logo.png/800px-Zoho-logo.png',
    color: '#e42527',
    roadmap: {
      phases: [
        {
          title: 'Phase 1: Aptitude & Written Test',
          items: ['Strong focus on Pure Mathematics', 'Logical Reasoning & Puzzles', 'Coding Test: 5 programs of increasing difficulty', 'No negative marking — attempt all']
        },
        {
          title: 'Phase 2: Advanced Coding (5-6 hrs)',
          items: ['Hard problem-solving round (standalone)', 'Not LeetCode style — unique logic puzzles', 'Object-oriented design problems', 'Write clean, optimized, commented code']
        },
        {
          title: 'Phase 3: Technical + HR',
          items: ['Deep dive on your coding solutions', 'DSA + System architecture discussion', 'Culture fit: self-taught motivation, curiosity', 'Zoho\'s no-PE model (no private equity pressure)']
        }
      ],
      tips: [
        'Zoho\'s process is among the toughest for service companies — treat it like product-based prep.',
        'The advanced coding round can take a full day — practise long, hard problems.',
        'Zoho hires for "thinking ability" — learn to break down problems you\'ve never seen before.'
      ]
    },
    resources: [
      { name: 'Zoho Careers', url: 'https://careers.zohocorp.com/', description: 'Official job openings and campus recruitment info.' },
      { name: 'GeeksForGeeks – Zoho', url: 'https://www.geeksforgeeks.org/zoho-interview-questions/', description: 'Previous year Zoho coding round question analysis.' },
      { name: 'HackerRank Practice', url: 'https://www.hackerrank.com/domains/algorithms', description: 'Algorithm challenges matching Zoho difficulty.' },
      { name: 'ProjectEuler (Logic Puzzles)', url: 'https://projecteuler.net/', description: 'Math + programming puzzles similar to Zoho style.' }
    ],
    questions: [
      { id: 'zoh1', type: 'Coding', difficulty: 'Hard', question: 'Given a matrix, print all elements in spiral order.', hint: 'Maintain 4 boundaries (top, bottom, left, right). Traverse right, down, left, up and shrink boundaries after each pass.' },
      { id: 'zoh2', type: 'Coding', difficulty: 'Medium', question: 'Check if two strings are anagrams of each other without using sorting.', hint: 'Use a frequency count array of size 26. Increment for s1 chars, decrement for s2 chars. All values should be 0.' },
      { id: 'zoh3', type: 'Logic', difficulty: 'Hard', question: 'You have 8 balls, one of which is heavier. Using a balance scale with only 2 weighings, find the heavy ball.', hint: 'Split 8 into groups of 3, 3, 2. Weigh the two groups of 3. If equal, weigh the two remaining. If one group is heavier, weigh two of those 3.' },
      { id: 'zoh4', type: 'Coding', difficulty: 'Medium', question: 'Implement a stack using only queues.', hint: 'Use two queues. For push, enqueue to q1. For pop, transfer all elements except last to q2, dequeue last from q1, swap q1 and q2.' },
      { id: 'zoh5', type: 'OOPS', difficulty: 'Medium', question: 'Design a simple Library Management System with classes: Book, Member, and Library. Define key methods.', hint: 'Library has a list of Books and Members. Methods: addBook(), removeBook(), issueBook(member, book), returnBook(). Book has title, author, isAvailable.' }
    ]
  },
  {
    id: 'cognizant',
    name: 'Cognizant GenC',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Cognizant_logo.png',
    color: '#0033a0',
    roadmap: {
      phases: [
        {
          title: 'Phase 1: GenC Online Assessment',
          items: ['Quantitative Aptitude (20 Qs)', 'Reasoning Ability (20 Qs)', 'Verbal Ability (25 Qs)', 'Coding (2 programs in 45 min) — Easy-Medium']
        },
        {
          title: 'Phase 2: Technical Interview',
          items: ['Core subjects: OOPS, DBMS, OS', 'SQL: Joins, Group By, Subqueries', 'Programming language of your choice', 'Resume & project discussion']
        },
        {
          title: 'Phase 3: HR Interview',
          items: ['Cognizant\'s "Always Striving for Better"', 'Flexibility for shifts and relocation', 'Learning mindset and upskilling plans', 'Salary & bond clarification']
        }
      ],
      tips: [
        'Cognizant GenC hiring is campus-based — maintain 60% or above throughout.',
        'The coding section usually has 1 Easy + 1 Medium problem; aim to solve both.',
        'Cognizant GenC Next requires stronger DSA — prepare LeetCode Mediums for that role.'
      ]
    },
    resources: [
      { name: 'PrepInsta – Cognizant GenC', url: 'https://prepinsta.com/cognizant/', description: 'Exact GenC pattern mock tests and previous papers.' },
      { name: 'GeeksForGeeks – Cognizant', url: 'https://www.geeksforgeeks.org/cognizant-interview-questions/', description: 'Technical and HR interview questions.' },
      { name: 'IndiaBix – Aptitude', url: 'https://www.indiabix.com/', description: 'Comprehensive aptitude and verbal practice.' },
      { name: 'HackerEarth – Cognizant', url: 'https://www.hackerearth.com/', description: 'Platform used by Cognizant for online assessments.' }
    ],
    questions: [
      { id: 'cog1', type: 'Aptitude', difficulty: 'Easy', question: 'What is the compound interest on ₹8,000 at 10% per annum for 2 years?', hint: 'CI = P(1+r/100)^n - P = 8000(1.1)^2 - 8000 = 9680 - 8000 = ₹1,680.' },
      { id: 'cog2', type: 'Verbal', difficulty: 'Easy', question: 'Choose the correct synonym for "BENEVOLENT": (A) Hostile (B) Kind (C) Greedy (D) Cautious', hint: 'Benevolent means "well-meaning and kindly." Answer: (B) Kind.' },
      { id: 'cog3', type: 'Coding', difficulty: 'Easy', question: 'Write a program to count the number of vowels in a given string.', hint: 'Loop through each character. Check if it belongs to {a,e,i,o,u} (case-insensitive). Increment counter.' },
      { id: 'cog4', type: 'OOPS', difficulty: 'Medium', question: 'What is an abstract class in Java? Can we instantiate it? Give an example.', hint: 'Abstract class can have abstract + concrete methods. Cannot be instantiated directly. Used via subclass that implements abstract methods.' },
      { id: 'cog5', type: 'Behavioral', difficulty: 'Easy', question: 'How do you handle a situation where you disagree with your team lead\'s decision?', hint: 'Express your view professionally with data, respect the final call, commit fully to the team decision. Show emotional maturity.' }
    ]
  }
];
