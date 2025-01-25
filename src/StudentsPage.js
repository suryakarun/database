import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import StudentForm from "./StudentForm"; 
// Ensure this component is present
import './StudentsPage.css';


function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const snapshot = await getDocs(collection(db, "students"));
      setStudents(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);
  const handleDeleteStudent = async (studentId) => {
    try {
      console.log("Attempting to delete student with ID:", studentId); // Debugging log
  
      // Check if studentId is a number or string and log it
      if (typeof studentId === "string") {
        console.log("ID is a string:", studentId);
      } else if (typeof studentId === "number") {
        console.log("ID is a number:", studentId);
      } else {
        throw new Error("Invalid student ID type. It must be either a string or number.");
      }
  
      // Optimistic UI update: remove the student from the local list immediately
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== studentId)
      );
  
      // If it's a number, we need to convert it to a string for Firestore
      const studentDoc = doc(db, "students", studentId.toString());
  
      // Try deleting the student document from Firestore
      await deleteDoc(studentDoc);
      
      // Re-fetch students after successful deletion
      await fetchStudents(); 
  
      alert("Student deleted successfully.");
    } catch (error) {
      console.error("Error deleting student:", error.message);
  
      // If something goes wrong, re-fetch students and show the error
      await fetchStudents();
      alert(`Failed to delete student. Error: ${error.message}`);
    }
  };
  

  const handleAddStudent = async (studentData) => {
    try {
      await addDoc(collection(db, "students"), { ...studentData, id: Date.now() });
      alert("Student added successfully!");
      setModalVisible(false);
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student. Please try again.");
    }
  };

  const handleEditStudent = async (studentData) => {
    try {
      const studentDoc = doc(db, "students", studentData.id);
      await updateDoc(studentDoc, studentData);
      alert("Student updated successfully!");
      setModalVisible(false);
      fetchStudents();
    } catch (error) {
      console.error("Error editing student:", error);
      alert("Failed to edit student. Please try again.");
    }
  };

  return (
    <div className="container">
      <button className="add-student-btn"
        onClick={() => {
          setCurrentStudent(null);
          setModalVisible(true);
        }}
      >
        Add Student
      </button>

      {modalVisible && (
        <StudentForm
          onSubmit={currentStudent ? handleEditStudent : handleAddStudent}
          student={currentStudent}
          onClose={() => setModalVisible(false)}
        />
      )}

      <table className="students-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Roll Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>{student.rollNumber}</td>
              <td>
                <button className="view-btn" onClick={() => setCurrentStudent(student)}>View</button>
                <button
                className="edit-btn"
                  onClick={() => {
                    setCurrentStudent(student);
                    setModalVisible(true);
                  }}
                >
                  Edit
                </button>
                <button
                className="delete-btn"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this student?")) {
                      handleDeleteStudent(student.id);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentsPage;
