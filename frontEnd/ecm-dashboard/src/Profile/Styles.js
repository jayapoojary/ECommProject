export default theme => ({
    inputBox: () => ({
      height: '40px',
      color: '#333',
      display: 'block',
      margin: '10px auto',
      border: '2px solid #00aaff',
      borderRadius: '5px',
      width: '40%',
      textAlign: 'center',
      padding: '0 10px',
      fontSize: '14px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }),
    signupButton: () => ({
      height: '45px',
      color: '#fff',
      margin: '20px auto',
      backgroundColor: '#00aaff',
      width: '10%',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s ease',
      display: 'block',
      textAlign: 'center',
      '&:hover': {
        backgroundColor: '#007acc',
      },
    }),
  });