'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Employee } from '../types/employee';
import { getAllReports } from '../utils/employeeUtils';
import { EmployeeCard } from '../components/EmployeeCard';
import { AddEmployeeForm } from '@/components/AddEmployeeForm';

const initialEmployees: Employee[] = [
  { id: '1', name: 'John Doe', role: 'CEO', managerId: null },
  { id: '2', name: 'Jane Smith', role: 'CTO', managerId: '1' },
  { id: '3', name: 'Bob Johnson', role: 'Developer', managerId: '2' },
];

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const handleAddEmployee = (newEmployee: Omit<Employee, 'id'>) => {
    const employeeWithId = {
      ...newEmployee,
      id: uuidv4(),
    };
    setEmployees([...employees, employeeWithId]);
  };

  const handleDeleteEmployee = (id: string) => {
    const reportsToDelete = getAllReports(employees, id);
    setEmployees(employees.filter(emp => 
      emp.id !== id && !reportsToDelete.includes(emp.id)
    ));
  };

  const rootEmployees = employees.filter(emp => emp.managerId === null);

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#333',
        marginBottom: '20px' 
      }}>
        Ziwadi Org Chart
      </h1>
      
      <AddEmployeeForm 
        employees={employees}
        onAdd={handleAddEmployee}
      />

      <div style={{ 
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {rootEmployees.map(employee => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            employees={employees}
            onDelete={handleDeleteEmployee}
            level={0}
          />
        ))}
      </div>
    </div>
  );
}