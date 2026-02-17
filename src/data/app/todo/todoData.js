// Todo data for TodoTable component
export const initialTodos = [
  {
    id: 1,
    task: "Design new dashboard layout",
    priority: "High",
    assign: "John Doe",
    date: "2024-01-15",
    notes: "Create a modern and responsive dashboard design",
    completed: false
  },
  {
    id: 2,
    task: "Implement user authentication",
    priority: "Medium",
    assign: "Jane Smith",
    date: "2024-01-16",
    notes: "Add login and registration functionality",
    completed: false
  },
  {
    id: 3,
    task: "Write API documentation",
    priority: "Low",
    assign: "Mike Johnson",
    date: "2024-01-17",
    notes: "Document all REST API endpoints",
    completed: true
  },
  {
    id: 4,
    task: "Setup database schema",
    priority: "High",
    assign: "Sarah Wilson",
    date: "2024-01-18",
    notes: "Create database tables and relationships",
    completed: false
  },
  {
    id: 5,
    task: "Implement file upload",
    priority: "Medium",
    assign: "David Brown",
    date: "2024-01-19",
    notes: "Add file upload functionality with validation",
    completed: false
  },
  {
    id: 6,
    task: "Create unit tests",
    priority: "Low",
    assign: "Lisa Davis",
    date: "2024-01-20",
    notes: "Write comprehensive unit tests for all components",
    completed: false
  },
  {
    id: 7,
    task: "Optimize performance",
    priority: "Medium",
    assign: "Tom Wilson",
    date: "2024-01-21",
    notes: "Improve application performance and loading times",
    completed: false
  },
  {
    id: 8,
    task: "Deploy to production",
    priority: "High",
    assign: "Emma Garcia",
    date: "2024-01-22",
    notes: "Deploy application to production environment",
    completed: false
  },
  {
    id: 9,
    task: "Code review",
    priority: "Low",
    assign: "Alex Martinez",
    date: "2024-01-23",
    notes: "Review all code changes and provide feedback",
    completed: false
  },
  {
    id: 10,
    task: "Update documentation",
    priority: "Medium",
    assign: "Chris Anderson",
    date: "2024-01-24",
    notes: "Update project documentation and README",
    completed: false
  }
];

// Todo item interface (for reference)
export const TodoItem = {
  id: Number,
  task: String,
  priority: String,
  assign: String,
  date: String,
  notes: String,
  completed: Boolean
};
