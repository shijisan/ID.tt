import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    // Validate email
    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    // Validate password
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('/api/login', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          setMessage({ type: 'success', text: 'Login successful' });
          navigate('/student-dashboard');
        } else {
          setMessage({ type: 'error', text: response.data.error || 'Login failed' });
        }
      } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data : error.message);
        setMessage({ type: 'error', text: error.response ? error.response.data.error : error.message });
      }
    }
  };

  return (
    <main>
      <div className="container d-flex justify-content-center align-items-center flex-column h-100 my-2">
        <form className="card w-lg-50" onSubmit={handleSubmit}>
          <div className="card-header">
            <h2>Login</h2>
          </div>
          <div className="card-body p-lg-5">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>

            <div className='text-center'>
              <small>Don't have an account? <a href="/register">Register</a></small>
            </div>
            <br />

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>

            {message && (
              <div className={`mt-3 alert ${message.type === 'error' ? 'alert-danger' : 'alert-success'}`}>
                {message.text}
              </div>
            )}
          </div>

        </form>
      </div>
    </main>
  );
};

export default StudentLogin;
