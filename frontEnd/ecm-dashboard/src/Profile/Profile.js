import React from 'react';

const Profile = () => {
  const auth = JSON.parse(localStorage.getItem("currentUser"));
  console.log("auth ", auth);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Profile</h2>
      <div style={styles.info}>
        <p style={styles.text}><strong>User Name:</strong> {auth?.name}</p>
        <p style={styles.text}><strong>User Email:</strong> {auth?.email}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: '100vh',
    backgroundColor: '#f0f4f8',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  header: {
    color: '#333',
    marginBottom: '20px',
  },
  info: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  text: {
    color: '#333',
    fontSize: '16px',
    margin: '10px 0',
  },
};

export default Profile;
