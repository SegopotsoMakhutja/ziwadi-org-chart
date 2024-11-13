'use client';

import { useState } from 'react';
import { Employee } from '../types/employee';
import { getSubordinates } from '../utils/employeeUtils';

interface EmployeeCardProps {
  employee: Employee;
  employees: Employee[];
  onDelete: (id: string) => void;
  level: number;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  employees,
  onDelete,
  level
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const subordinates = getSubordinates(employees, employee.id);

  const cardStyles = {
    padding: '12px',
    marginLeft: `${level * 20}px`,
    marginTop: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  };

  const buttonStyles = {
    marginLeft: '8px',
    padding: '4px 8px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div>
      <div style={cardStyles}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>{employee.name}</strong> - {employee.role}
            {subordinates.length > 0 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ ...buttonStyles, backgroundColor: '#f0f0f0' }}
                aria-label={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? '−' : '+'}
              </button>
            )}
          </div>
          <button
            onClick={() => onDelete(employee.id)}
            style={{ ...buttonStyles, backgroundColor: '#ff4444', color: 'white' }}
            aria-label="Delete employee"
          >
            Delete
          </button>
        </div>
      </div>
      {isExpanded && subordinates.map(subordinate => (
        <EmployeeCard
          key={subordinate.id}
          employee={subordinate}
          employees={employees}
          onDelete={onDelete}
          level={level + 1}
        />
      ))}
    </div>
  );
};