import React from 'react';
import { gql, useQuery } from '@apollo/client';

const USER_QUERY = gql`
  query {
    findalluser {
      users {
        id
        email
        username
      }
      message
      status
      success
    }
  }
`;

const Dashboard = () => {
  const { loading, error, data } = useQuery(USER_QUERY);
  console.log('Query Data:', data);
  console.log('Query Error:', error);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      {data.findalluser.success ? (
        <div>
          <h2>User List</h2>
          <ul>
            {data.findalluser.users.map((user) => (
              <li key={user.id}>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{data.findalluser.message}</p>
      )}
    </div>
  );
};

export default Dashboard;
