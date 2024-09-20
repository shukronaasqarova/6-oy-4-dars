import React, { useState, useEffect } from 'react';
import './App.css'; 

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    nationality: '',
    languages: [],
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(savedUsers);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'languages') {
        setFormData({
          ...formData,
          languages: checked
            ? [...formData.languages, value]
            : formData.languages.filter((lang) => lang !== value),
        });
      } else if (name === 'nationality') {
        setFormData({ ...formData, nationality: checked ? value : '' });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUsers = [...users, formData];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setFormData({
      username: '',
      email: '',
      nationality: '',
      languages: [],
    });
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        
        <div>
          <label>
            <input
              type="checkbox"
              name="nationality"
              value="Uzbek"
              checked={formData.nationality === "Uzbek"}
              onChange={handleChange}
            />
            Uzbek
          </label>
          <label>
            <input
              type="checkbox"
              name="nationality"
              value="Russian"
              checked={formData.nationality === "Russian"}
              onChange={handleChange}
            />
            Russian
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="languages"
              value="English"
              checked={formData.languages.includes("English")}
              onChange={handleChange}
            />
            English
          </label>
          <label>
            <input
              type="checkbox"
              name="languages"
              value="Russian"
              checked={formData.languages.includes("Russian")}
              onChange={handleChange}
            />
            Russian
          </label>
        </div>

        <button type="submit">Add User</button>
      </form>

      <div>
        {users.map((user, index) => (
          <div key={index} className="card">
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Nationality: {user.nationality}</p>
            <p>Languages: {user.languages.join(", ")}</p>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserForm;
