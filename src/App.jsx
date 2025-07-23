import './App.css';
import employees from './EmployeData';
import EmployeeData from './EmployeData';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState(0);
  const [email, setEmail] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (employee) => {
    setIsUpdate(true);
    if (employee.id !== undefined) {
      setName(employee.name);
      setAge(employee.age);
      setDepartment(employee.department);
      setSalary(employee.salary);
      setEmail(employee.email);
      setEditId(employee.id);
    } else {
      alert(`This employee does not exist`);
    }
  };

  const handleClear = () => {
    setName('');
    setAge(0);
    setDepartment('');
    setSalary(0);
    setEmail('');
    setIsUpdate(false);
    setEditId(null);
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    if (isNaN(age) || age <= 0) {
      alert("Age must be a positive number anf greater than zero");
      return;
    }

    if (!department.trim()) {
      alert("Department is required");
      return;
    }

    if (isNaN(salary) || salary < 0) {
      alert("Salary must be a non-negative number");
      return;
    }

    if (!email.trim()) {
      alert("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Invalid email format");
      return;
    } else if (!email.endsWith('.com')) {
      alert("Invalid email format Email must ends with .com");
      return;
    }

    if (isUpdate && editId) {
      setData(
        data.map((employee) =>
          employee.id === editId
            ? {
              ...employee,
              name,
              age: parseInt(age),
              department,
              salary: parseInt(salary),
              email,
            }
            : employee
        )
      );
      handleClear();
    } else {
      const newEmployee = {
        id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
        name,
        age: parseInt(age),
        department,
        salary: parseInt(salary),
        email,
      };
      setData([...data, newEmployee]);
      handleClear();
    }
  };

  const handleDelete = (employee) => {
    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      setData(data.filter((item) => item.id !== employee.id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-center py-5 text-green-500 items-center">
        <h1 className="text-3xl font-bold">CRUD Operation in React JS</h1>
      </div>

      {/* Form Section */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Add Employee</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            className="border p-2 rounded"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type="text"
            placeholder="Department"
            className="border p-2 rounded"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <input
            type="number"
            placeholder="Salary"
            className="border p-2 rounded"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSave();
              }
            }}
          />
          <div className="mt-4 flex space-x-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => handleSave()}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSave();
                }
              }}
            >
              {!isUpdate ? 'Save' : 'Update'}
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => handleClear()}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Age</th>
              <th className="border border-gray-300 px-4 py-2">Department</th>
              <th className="border border-gray-300 px-4 py-2">Salary</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-200">
                <td className="border border-gray-300 px-4 py-2">{employee.id}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.age}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.department}</td>
                <td className="border border-gray-300 px-4 py-2">
                  ${employee.salary.toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">{employee.email}</td>
                <td className="border border-gray-300 px-4 py-2 space-x-4">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleEdit(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(employee)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;