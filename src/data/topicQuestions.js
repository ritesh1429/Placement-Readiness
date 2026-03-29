// A dictionary mapping a Topic Name directly to an array of exactly 5 MCQs

export const topicQuizData = {
  // --- QUANTITATIVE APTITUDE ---
  'Ages': [
    { q: 'The ratio of present ages of two brothers is 1:2 and 5 years back, the ratio was 1:3. What will be the ratio of their ages after 5 years?', options: ['1:4', '2:3', '3:5', '5:6'], answer: '3:5' },
    { q: 'A father said to his son, "I was as old as you are at present at the time of your birth." If the father\'s age is 38 years now, the son\'s age five years back was:', options: ['14', '19', '33', '38'], answer: '14' },
    { q: 'A is two years older than B who is twice as old as C. If the total of the ages of A, B and C be 27, then how old is B?', options: ['7', '8', '9', '10'], answer: '10' },
    { q: 'Present ages of Sameer and Anand are in the ratio of 5 : 4 respectively. Three years hence, the ratio of their ages will become 11 : 9 respectively. What is Anand\'s present age in years?', options: ['24', '27', '40', 'Cannot be determined'], answer: '24' },
    { q: 'The sum of the present ages of a father and his son is 60 years. Six years ago, father\'s age was five times the age of the son. After 6 years, son\'s age will be:', options: ['12', '14', '18', '20'], answer: '20' }
  ],
  'Percentages': [
    { q: 'If 20% of a = b, then b% of 20 is the same as:', options: ['4% of a', '5% of a', '20% of a', 'None of these'], answer: '4% of a' },
    { q: 'Two students appeared at an examination. One of them secured 9 marks more than the other and his marks was 56% of the sum of their marks. The marks obtained by them are:', options: ['39, 30', '41, 32', '42, 33', '43, 34'], answer: '42, 33' },
    { q: 'A fruit seller had some apples. He sells 40% apples and still has 420 apples. Originally, he had:', options: ['588', '600', '672', '700'], answer: '700' },
    { q: 'What percentage of numbers from 1 to 70 have 1 or 9 in the unit\'s digit?', options: ['1', '14', '20', '21'], answer: '20' },
    { q: 'If A is 20% more than B, by what percent is B less than A?', options: ['16.66%', '20%', '25%', '30%'], answer: '16.66%' }
  ],
  'Averages': [
    { q: 'The average of 5 consecutive odd numbers is 61. What is the difference between the highest and lowest numbers?', options: ['2', '4', '8', '16'], answer: '8' },
    { q: 'The average of first 50 natural numbers is:', options: ['12.25', '25.30', '25.5', '25.0'], answer: '25.5' },
    { q: 'The average of 20 numbers is zero. Of them, at the most, how many may be greater than zero?', options: ['0', '1', '10', '19'], answer: '19' },
    { q: 'Find the average of all the numbers between 6 and 34 which are divisible by 5.', options: ['18', '20', '24', '30'], answer: '20' },
    { q: 'The average weight of 8 person\'s increases by 2.5 kg when a new person comes in place of one of them weighing 65 kg. What might be the weight of the new person?', options: ['76', '76.5', '85', 'Data Inadequate'], answer: '85' }
  ],
  
  // --- DATA STRUCTURES ---
  'Arrays': [
    { q: 'Which of the following sorting algorithms provides the best time complexity in the worst-case scenario?', options: ['Quick Sort', 'Bubble Sort', 'Merge Sort', 'Insertion Sort'], answer: 'Merge Sort' },
    { q: 'What is the time complexity to access an element in an array by its index?', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'], answer: 'O(1)' },
    { q: 'Which data structure is used to handle collisions in a Hash Map frequently?', options: ['Array', 'Linked List', 'Stack', 'Queue'], answer: 'Linked List' },
    { q: 'An array elements are always stored in ________ memory locations.', options: ['Sequential', 'Random', 'Linked', 'Dynamic'], answer: 'Sequential' },
    { q: 'What is the maximum number of dimensions an array in C can have?', options: ['1', '2', '3', 'Compiler Dependent'], answer: 'Compiler Dependent' }
  ],
  'Linked Lists': [
    { q: 'Which linked list allows traversal in both directions?', options: ['Singly', 'Circular', 'Doubly', 'Multiply'], answer: 'Doubly' },
    { q: 'What is the time complexity of deleting a node at the beginning of a singly linked list?', options: ['O(N)', 'O(1)', 'O(log N)', 'O(N^2)'], answer: 'O(1)' },
    { q: 'Which algorithm is typically used to detect a cycle in a linked list?', options: ['Dijkstra', 'Floyd\'s Cycle-Finding', 'Kruskal', 'Bellman-Ford'], answer: 'Floyd\'s Cycle-Finding' },
    { q: 'In a doubly linked list, what does the "prev" pointer of the first node point to?', options: ['Itself', 'The Last Node', 'Null', 'Memory Address 0'], answer: 'Null' },
    { q: 'Linked lists are preferable over arrays when:', options: ['Size is purely fixed', 'Fast indexing is needed', 'Frequent insertions/deletions are required', 'Memory is highly limited'], answer: 'Frequent insertions/deletions are required' }
  ]
};

// Generic Fallback wrapper for any topic not hardcoded above
export const getTopicQuestions = (topicName) => {
  if (topicQuizData[topicName]) return topicQuizData[topicName];
  
  // Fallback 5 generic questions if topic is missing
  return [
    { q: `What is the core principle behind ${topicName}?`, options: ['Encapsulation', 'Optimization', 'Normalization', 'Abstraction'], answer: 'Optimization' },
    { q: `Which scenario best fits the application of ${topicName}?`, options: ['High latency networks', 'Data intensive operations', 'Static UI rendering', 'None of the above'], answer: 'Data intensive operations' },
    { q: `The worst-case time complexity of standard operations in ${topicName} is generally:`, options: ['O(1)', 'O(N)', 'O(N^2)', 'O(log N)'], answer: 'O(N)' },
    { q: `Which company heavily popularized modern ${topicName} paradigms?`, options: ['Google', 'Microsoft', 'Netflix', 'All of the above'], answer: 'All of the above' },
    { q: `How do you resolve bottlenecks in ${topicName}?`, options: ['Memory Leaks', 'Caching & Indexing', 'Thread Halting', 'Deallocation'], answer: 'Caching & Indexing' }
  ];
};
