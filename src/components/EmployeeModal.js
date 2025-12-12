export default function EmployeeModal({
  closeModal,
  handleSave,
  formData,
  handleChange,
  editingEmployee,
}) {
  const fields = ["name", "email", "position", "department", "salary"];

  return (
    <div className="modal show d-block">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5>{editingEmployee ? "Edit Employee" : "Add Employee"}</h5>
            <button className="btn-close" onClick={closeModal}></button>
          </div>

          <div className="modal-body">
            {fields.map((f) => (
              <div className="mb-3" key={f}>
                <label className="form-label text-capitalize">{f}</label>
                <input
                  type={f === "salary" ? "number" : "text"}
                  name={f}
                  className="form-control"
                  value={formData[f]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
