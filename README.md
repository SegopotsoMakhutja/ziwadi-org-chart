# Ziwadi Organization Chart Application

A organizational chart application built with Next.js and TypeScript.

## 🚀 Features

- **Interactive Org Chart**: Visualize hierarchical organizational structure
- **Employee Management**: Add and remove employees with automatic hierarchy updates
- **Dynamic Relationships**: Manage reporting relationships with intuitive UI
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Accessibility**: Built with ARIA labels and keyboard navigation support
- **Type Safety**: Full TypeScript implementation for robust code quality

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 5+
- **State Management**: React useState (Local State)
- **Styling**: Inline styles for simplicity
- **UUID Generation**: uuid v4

## 🏗 Architecture

### Data Structure

The application uses a flat array-based structure for storing employee data, prioritizing simplicity and performance:

```typescript
interface Employee {
  id: string;
  name: string;
  role: string;
  managerId: string | null;
}
```

### Key Design Decisions

1. **Flat Data Structure**
   - Uses managerId references instead of nested objects
   - Simplifies state management and updates

2. **Component Hierarchy**

```markdown
App (page.tsx)
├── AddEmployeeForm
└── EmployeeCard
    └── Recursive EmployeeCard (for subordinates)
```

3. **State Management**
   - Local state with useState for simplicity (data not persistent)
   - Centralized state management in the root component
   - Props drilling for data flow
   - Pure function utilities for data manipulation

### Core Utilities

```typescript
// Get direct subordinates
getSubordinates(employees, managerId)

// Get all reports (direct and indirect)
getAllReports(employees, managerId)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone
cd ziwadi-org-chart
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000)

**alternatively you can use docker-compose**

## 💻 Usage

### Adding Employees

1. Fill out the employee form with name and role
2. Select a manager (or leave as root for top-level employees)
3. Click "Add Employee"

### Managing the Organization

- Use the +/- buttons to expand/collapse subordinates
- Delete employees (and their subordinates) using the delete button
- View the entire organization hierarchy from root employees

## 🔧 Implementation Details

### State Updates

The application handles state updates efficiently:

```typescript
// Adding employees
const handleAddEmployee = (newEmployee: Omit<Employee, 'id'>) => {
  const employeeWithId = {
    ...newEmployee,
    id: uuidv4(),
  };
  setEmployees([...employees, employeeWithId]);
};

// Deleting employees (with cascade)
const handleDeleteEmployee = (id: string) => {
  const reportsToDelete = getAllReports(employees, id);
  setEmployees(employees.filter(emp => 
    emp.id !== id && !reportsToDelete.includes(emp.id)
  ));
};
```

### Performance Considerations

- Uses memoization for expensive operations
- Implements efficient filtering for hierarchical data

### Accessibility

- ARIA labels for interactive elements
- Keyboard navigation support
- Semantic HTML structure
- Clear visual hierarchy

## 🔍 Code Organization

```markdown
org-chart/
├── app/               # Next.js app directory
│   ├── layout.tsx     # main root layout
│   └── page.tsx       # Main application page
├── components/        # React components
│   ├── EmployeeCard.tsx
│   └── AddEmployeeForm.tsx
├── types/            # TypeScript interfaces
│   └── employee.ts
└── utils/            # Utility functions
    └── employeeUtils.ts
```

## 🛠 Future Enhancements

1. **Data Persistence**
   - Add API integration
   - Implement database storage

2. **Advanced Features**
   - Search and filtering
   - Export/import functionality

3. **UI Improvements**
   - Different view modes (list, grid, etc.)