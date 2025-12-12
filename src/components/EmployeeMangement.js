import React, { useState, useEffect } from "react";
import EmployeeList from "./EmployeeList";
import EmployeeModal from "./EmployeeModal";

const API_URL = "http://localhost:3001/employees";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    salary: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (emp = null) => {
    if (emp) {
      setEditingEmployee(emp);
      setFormData(emp);
    } else {
      setEditingEmployee(null);
      setFormData({
        name: "",
        email: "",
        position: "",
        department: "",
        salary: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (editingEmployee) {
      await updateEmployee(editingEmployee.id, formData);
    } else {
      await createEmployee(formData);
    }
  };

  const createEmployee = async (data) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const newEmp = await res.json();
    setEmployees([...employees, newEmp]);
    closeModal();
  };

  const updateEmployee = async (id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const updated = await res.json();

    setEmployees(
      employees.map((emp) => (emp.id === id ? updated : emp))
    );

    closeModal();
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete?")) return;

    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2 className="m-0">Employee Manager</h2>
        <button className="btn btn-primary" onClick={() => openModal()}>
          Add Employee
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <EmployeeList
          employees={employees}
          openModal={openModal}
          deleteEmployee={deleteEmployee}
        />
      )}

      {isModalOpen && (
        <EmployeeModal
          closeModal={closeModal}
          handleSave={handleSave}
          formData={formData}
          handleChange={handleChange}
          editingEmployee={editingEmployee}
        />
      )}
    </div>
  );
}
