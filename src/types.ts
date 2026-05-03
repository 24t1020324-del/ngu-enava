/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RoadmapNode {
  id: string;
  label: string;
  description: string;
  category: 'beginner' | 'intermediate' | 'advanced' | 'frameworks' | 'tooling';
  status: 'pending' | 'in-progress' | 'completed';
}

export interface Note {
  id: string;
  title: string;
  source: 'Gemini' | 'NotebookLM';
  content: string;
  tags: string[];
  date: string;
}

export const JAVA_ROADMAP: RoadmapNode[] = [
  // --- PHASE 1: NOOB (The Core) ---
  {
    id: 'java-basics',
    label: 'Java Syntax & Fundamentals',
    description: 'Primitive types, Wrapper classes, Operators, and Control Flow (loops, switches).',
    category: 'beginner',
    status: 'completed',
  },
  {
    id: 'oop-core',
    label: 'OOP Mastery',
    description: 'Inheritance, Interfaces, Abstract classes, Encapsulation, and Polymorphism.',
    category: 'beginner',
    status: 'in-progress',
  },
  {
    id: 'java-memory',
    label: 'JVM Memory & GC',
    description: 'Understanding Stack vs Heap, Metaspace, and how Garbage Collectors (G1, ZGC) work.',
    category: 'beginner',
    status: 'pending',
  },

  // --- PHASE 2: INTERMEDIATE (Standard Library) ---
  {
    id: 'collections-api',
    label: 'Collections Framework',
    description: 'Performance trade-offs between ArrayList, LinkedList, HashMap, and TreeMap.',
    category: 'intermediate',
    status: 'pending',
  },
  {
    id: 'generics',
    label: 'Generics & Wildcards',
    description: 'Type safety, Bounded parameters, and Erasure.',
    category: 'intermediate',
    status: 'pending',
  },
  {
    id: 'streams-lambdas',
    label: 'Functional Programming',
    description: 'Lambda expressions, Method references, and the Stream API (Map-Filter-Reduce).',
    category: 'intermediate',
    status: 'pending',
  },
  {
    id: 'io-nio',
    label: 'I/O & NIO.2',
    description: 'File handling, Buffers, Channels, and Path API.',
    category: 'intermediate',
    status: 'pending',
  },

  // --- PHASE 3: ADVANCED (Deep Tech) ---
  {
    id: 'concurrency-low-level',
    label: 'Low-level Concurrency',
    description: 'Synchronized, Volatile, ReentrantLocks, and Memory Barriers.',
    category: 'advanced',
    status: 'pending',
  },
  {
    id: 'concurrency-utils',
    label: 'Concurrent Utilities',
    description: 'Executors, CompletableFuture, CyclicBarrier, and CountDownLatch.',
    category: 'advanced',
    status: 'pending',
  },
  {
    id: 'reflection',
    label: 'Reflection & Proxy',
    description: 'Dynamic proxies, Field/Method access at runtime, and building custom annotations.',
    category: 'advanced',
    status: 'pending',
  },

  // --- PHASE 4: THE ECOSYSTEM (Professional) ---
  {
    id: 'maven-gradle',
    label: 'Build Tools',
    description: 'Dependency management, build lifecycle, and repo management (Maven/Gradle).',
    category: 'tooling',
    status: 'pending',
  },
  {
    id: 'testing-junit',
    label: 'Automated Testing',
    description: 'Unit testing with JUnit 5, Mockito, and AssertJ.',
    category: 'tooling',
    status: 'pending',
  },
  {
    id: 'logging',
    label: 'Logging & Metrics',
    description: 'SLF4J, Logback, and Prometheus instrumentation.',
    category: 'tooling',
    status: 'pending',
  },

  // --- PHASE 5: THE PRO (Spring & Microservices) ---
  {
    id: 'spring-core',
    label: 'Spring Framework Core',
    description: 'IOC/DI, Bean Scopes, Lifecycle, and AOP.',
    category: 'frameworks',
    status: 'pending',
  },
  {
    id: 'spring-data',
    label: 'Persistence & JPA',
    description: 'Hibernate, Spring Data JPA, and Transaction Management.',
    category: 'frameworks',
    status: 'pending',
  },
  {
    id: 'microservices-cloud',
    label: 'Microservices Architecture',
    description: 'API Gateways (Spring Cloud), Docker, Kubernetes, and Resilience4j.',
    category: 'frameworks',
    status: 'pending',
  },
];

export const MOCK_NOTES: Note[] = [
  {
    id: '1',
    title: 'JVM Architecture Deep Dive',
    source: 'NotebookLM',
    content: 'The JVM consists of Class Loader, JVM Memory (Heap, Stack), and Execution Engine...',
    tags: ['JVM', 'Performance'],
    date: '2024-05-01',
  },
  {
    id: '2',
    title: 'Stream API Best Practices',
    source: 'Gemini',
    content: 'Use Parallel Streams only when data is large... Always prefer simple loops for smaller sets.',
    tags: ['Streams', 'Clean Code'],
    date: '2024-05-02',
  },
];
