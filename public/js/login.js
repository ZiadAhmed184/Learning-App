const login = async (email, password) => {
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:3000/auth/login',
        data: {
          email,
          password,
        },
      });
  
      if (res.data.status === 'success') {
        location.assign('/');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a non-2xx status code
        alert(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        alert('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        alert('Error:', error.message);
      }
    }
  };
  
  const formEl = document.querySelector('.login');
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
  