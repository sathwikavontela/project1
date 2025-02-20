import { useEffect, useState } from "react";
import axios from "axios";
import './Users.css'; 

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    displayUsers(); 
  }, []);

  const displayUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/users/userDetails', {
        withCredentials: true,
      });      
      //console.log(response.data); 
      setUsers(response.data.users); 
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again later.");
    }
  };

  return (
    <div className="users-container">
      <h1>Users List</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="users-list">
        {users.map((user, index) => (
          <div key={index} className="user-card">
            <h2 className="username">{user.username}</h2>
            <p><strong>Department:</strong> {user.department}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
