
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("/db.json")
      .then(res => res.json())
      .then(data => setStudents(data.students))
      .catch(error => console.log(error));
  }, []);

  const handleSearch = () => {
    const student = students.find(
      s => s.name.toLowerCase() === search.toLowerCase()
    );

    setResult(student || null);
  };

  return (
    <div className="container">
      <h1>Student Details Retrieval</h1>

      <input
        type="text"
        placeholder="Enter Student Name"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {result ? (
        <div className="details">
          <h2>Student Details</h2>
          <p>Name: {result.name}</p>
          <p>Course: {result.course}</p>
          <p>Faculty: {result.faculty}</p>
        </div>
      ) : (
        search && <p>Student not found</p>
      )}
    </div>
  );
}

export default App;
