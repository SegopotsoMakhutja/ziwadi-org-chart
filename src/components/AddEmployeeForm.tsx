'use client';

import { useState } from 'react';
import { Employee } from '../types/employee';

interface AddEmployeeFormProps {
  employees: Employee[];
  onAdd: (employee: Omit<Employee, 'id'>) => void;
}

export const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({
  employees,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [managerId, setManagerId] = useState<string | null>(null);

  const formStyles = {
    padding: '16px',
    marginBottom: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
  };

  const inputStyles = {
    margin: '8px 0',
    padding: '8px',
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '4px',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && role) {
      onAdd({ name, role, managerId });
      setName('');
      setRole('');
      setManagerId(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Employee Name"
          style={inputStyles}
          required
          aria-label="Employee Name"
        />
      </div>
      <div>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
          style={inputStyles}
          required
          aria-label="Role"
        />
      </div>
      <div>
        <select
          value={managerId || ''}
          onChange={(e) => setManagerId(e.target.value || null)}
          style={inputStyles}
          aria-label="Select Manager"
        >
          <option value="">No Manager (Root)</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.name} ({emp.role})
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '8px',
        }}
      >
        Add Employee
      </button>
    </form>
  );
};
