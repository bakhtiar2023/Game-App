import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import myregistration from '../../assets/images/loginImage.jpg'
import '../App.css'
import { useFormik } from 'formik'

import { registrationSchema } from '../../schemas'

// registration page

function Register () {
  const navigate = useNavigate()
  const [passwordShown, setPasswordShown] = useState(false)
  const [checkboxValue, setCheckboxValue] = useState(false)

  const handleCheckboxChange = (event) => {
    setCheckboxValue(event.target.checked)
  }

  // inisiasi data yang akan di input menggunkan useFormik
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    // buat validasi kedalam bentuk schema dengan yup
    validationSchema: registrationSchema,
    // ketika di submit
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        // koneksikan ke API
        // kirim data yang kita inisiasi di values
        const response = await axios.post(
          'https://backend-team-1-five.vercel.app/registration',
          values
        )
        const message = response.data.message
        console.log('Pesan respons:', message)
        // Lakukan aksi yang diinginkan dengan pesan respons
        if (response.status === 200) {
          navigate('/Login')
        } else {
          return response.data.message
        }

        // Reset form
        formik.resetForm()
      } catch (error) {
        // ketika terjadi error
        console.error('Error:', error)
        const errorMessage = error.response.data.message
        console.log('Pesan kesalahan:', errorMessage)
        setFieldError('general', errorMessage)
      }
      // ketika data sudah dikirimkan set submitting false
      setSubmitting(false)
    }
  })

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  return (
    <div className="container-fluid registerContainer">
      <div className="container">
        <div className="content d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-row">
          <div className="col-md-6 mb-3 mb-xs-0">
            <img
              src={myregistration}
              alt="registration "
              className="img-fluid registrationImage"
            />
          </div>
          <div className="col-md-6 col-xs-3">
            <div className="card-body">
              <h1 className="card-title text-center">Sign Up</h1>
              {/* gunakan formik  */}
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group mt-4">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={`form-control ${formik.touched.username && formik.errors.username
                        ? 'is-invalid'
                        : ''
                      }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  {/* ketika form kita sentu */}
                  {formik.touched.username && formik.errors.username && (
                    <div className="invalid-feedback">
                      {formik.errors.username}
                    </div>
                  )}
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${formik.touched.email && formik.errors.email
                        ? 'is-invalid'
                        : ''
                      }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="password">Password</label>
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className={`form-control ${formik.touched.password && formik.errors.password
                        ? 'is-invalid'
                        : ''
                      }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback">
                      {formik.errors.password}
                    </div>
                  )}
                  <div className="d-flex flex-row">
                    <input
                      type="checkbox"
                      checked={checkboxValue ? 'checked' : ''}
                      onClick={togglePassword}
                      onChange={handleCheckboxChange}
                    />
                    <span className="checkmark"></span>
                    <label className="container fw-600">Show Password</label>
                  </div>
                </div>
                <div>
                  {formik.errors.general && (
                    <div className="alert alert-light" role="alert">
                      {formik.errors.general}
                    </div>
                  )}
                </div>
                <center>
                  <button
                    type="submit"
                    className="btn btn-dark mt-4 btn-color"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? 'Submitting' : 'Register'}
                  </button>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
