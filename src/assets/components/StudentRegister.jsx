import { useState } from "react";
import axios from "axios";

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    lrn: '',
    school_id: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

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

    if (!formData.first_name) {
      errors.first_name = 'First name is required';
      isValid = false;
    }

    if (!formData.last_name) {
      errors.last_name = 'Last name is required';
      isValid = false;
    }

    if (!formData.lrn) {
      errors.lrn = 'Learner ID is required';
      isValid = false;
    }

    if (!formData.school_id) {
      errors.school_id = 'School ID is required';
      isValid = false;
    }

    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post('/api/register', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 201) {
          setMessage({ type: 'success', text: 'Registration successful' });
          // Clear form
          setFormData({
            first_name: '',
            last_name: '',
            lrn: '',
            school_id: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
        } else {
          setMessage({ type: 'error', text: response.data.error || 'Registration failed' });
        }
      } catch (error) {
        console.error('Register error:', error);
        setMessage({ type: 'error', text: error.response ? error.response.data.error : error.message });
      }
    }
  };

  return (
    <main>
      <div className="container d-flex justify-content-center align-items-center flex-column h-100">
        <form className="card w-lg-50 my-lg-3" onSubmit={handleSubmit}>
          <div className="card-header">
            <h2 className='text-center'>Register</h2>
          </div>
          <div className="card-body p-lg-5">
            <div className="mb-3 d-flex">
              <div className="w-50 mx-1">
              <label htmlFor="first_name" className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
                {errors.first_name && <div className="text-danger">{errors.first_name}</div>}
              </div>

              <div className="w-50 mx-1">
                <label htmlFor="last_name" className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
                {errors.last_name && <div className="text-danger">{errors.last_name}</div>}
              </div>
            </div>


            <div className="mb-3 d-flex">
              <div className="w-50 mx-1">
                <label htmlFor="lrn" className="form-label">Learner ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="lrn"
                  name="lrn"
                  value={formData.lrn}
                  onChange={handleChange}
                />
                {errors.lrn && <div className="text-danger">{errors.lrn}</div>}
              </div>
              <div className="w-50 mx-1">
                <label htmlFor="school_id" className="form-label">School ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="school_id"
                  name="school_id"
                  value={formData.school_id}
                  onChange={handleChange}
                />
                {errors.school_id && <div className="text-danger">{errors.school_id}</div>}
              </div>
            </div>
            
            <div className="mb-3">
              <div className="mx-1">
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
            </div>

            <div className="mb-3 d-flex">

              <div className="w-50 mx-1">
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

              <div className="w-50 mx-1">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
              </div>

            </div>


            <div className='text-center'>
              <small>Already have an account? <a href="/login">Login</a></small>
            </div>

            <br />

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">Register</button>
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
}

export default StudentRegister;
