import React, { useEffect, useState } from 'react';
import userAPI from '../http/user.js';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userAPI.getAll()
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
