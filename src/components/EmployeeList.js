export default function EmployeeList({ employees, openModal, deleteEmployee }) {
  return (
    <div className="list-group">
      {employees.map((emp) => (
        <div key={emp.id} className="list-group-item">
          <div className="d-flex justify-content-between">
            <div>
              <strong>{emp.name}</strong> — {emp.position}
              <br />
              <small>{emp.email}</small>
            </div>

            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => openModal(emp)}
              >
                Edit
              </button>

              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteEmployee(emp.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
