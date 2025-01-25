import React, { useState, useEffect } from "react";

function StudentForm({ student, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    section: "",
    rollNumber: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        class: student.class,
        section: student.section,
        rollNumber: student.rollNumber,
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Submit the form data to parent (handleAddStudent or handleEditStudent)
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          disabled={!!student} // Disable input for "View"
        />
        <input
          type="text"
          name="class"
          value={formData.class}
          onChange={handleChange}
          placeholder="Class"
          disabled={!!student}
        />
        <input
          type="text"
          name="section"
          value={formData.section}
          onChange={handleChange}
          placeholder="Section"
          disabled={!!student}
        />
        <input
          type="text"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          placeholder="Roll Number"
          disabled={!!student}
        />
        <button type="submit">{student ? "Update" : "Add"} Student</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default StudentForm;
