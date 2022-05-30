import React, { useEffect, useState } from 'react';
import { userService } from '../services/userService.js';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll()
      .then(setUsers);
  }, [])

  return (
    <section className="section">
      <h1 className="title">Users</h1>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.email}
          </li>
        ))}
      </ul>
    </section>
  );
};
