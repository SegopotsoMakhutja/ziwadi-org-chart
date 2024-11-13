import { Employee } from "@/types/employee";

export const getSubordinates = (
  employees: Employee[], 
  managerId: string
): Employee[] => {
  return employees.filter(emp => emp.managerId === managerId);
};

export const getAllReports = (
  employees: Employee[],
  managerId: string
): string[] => {
  const directReports = employees.filter(emp => emp.managerId === managerId);
  const allReports = [...directReports];
  
  directReports.forEach(report => {
    const subordinates = getAllReports(employees, report.id);
    allReports.push(...employees.filter(emp => subordinates.includes(emp.id)));
  });
  
  return allReports.map(emp => emp.id);
};