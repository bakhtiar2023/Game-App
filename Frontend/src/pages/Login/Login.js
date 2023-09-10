import React, { useState } from 'react'
import mylogin from '../../assets/images/loginImage.jpg'
import 'bootstrap/dist/css/bootstrap.css'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { loginSchema } from '../../schemas'
import { loginUser } from '../../redux/loginSlice'
import { useDispatch, useSelector } from 'react-redux'
import '../App.css'

function Login () {
  // const [user, setUser] = useState({ username: "", password: "" });
  // const [isErrors, setIsErrors] = useState(true);
  // initialize login schema using formik
  // const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loginData = useSelector((state) => state.login)
  const [passwordShown, setPasswordShown] = useState(false)
  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues: {
        username: '',
        password: ''
      },
      // validation schema using yup
      validationSchema: loginSchema,
      onSubmit: async (values, helpers) => {
        // dispatch(setLogin(values));
        const data = await dispatch(loginUser(values))
        if (!data.error) {
          navigate('/lobbygame')
          helpers.resetForm({ values })
          window.location.reload()
        }
      }
    })
  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  return (
    <div className="container-fluid loginContainer">
      <div className="container">
        <div className="content d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-row">
          <div className="col-md-6 mb-3 mb-xs-0">
            <img src={mylogin} alt="login " className="img-fluid loginImage" />
          </div>
          <div className="col-md-6 col-xs-3">
          <h1 className="card-title text-center">Sign In</h1>
            <form className="form" id="form1" onSubmit={handleSubmit}>
              <div className="form-group field-holder">
                <label
                  className={values.username && 'filled'}
                  htmlFor="loginUsername"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="loginUsername"
                  className="form-control input"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {/* <div
                className={
                  touched.username && errors.username ? "" : "errorsMessage"
                }
              >
                {errors.username}
              </div> */}
              {touched.username && errors.username && (
                <div className="errorsMessage mb-3" data-testid="errorUsername">{errors.username}</div>
              )}
              <div className="form-group field-holder">
                <label
                  className={values.password && 'filled'}
                  htmlFor="loginPassword"
                >
                  Password
                </label>
                <input
                  type={passwordShown ? 'text' : 'password'}
                  id="loginPassword"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className="form-control input"
                  onBlur={handleBlur}
                />
                <div onClick={togglePassword}>
                  {passwordShown
                    ? (
                    <i className="far fa-eye" id="togglePassword"></i>
                      )
                    : (
                    <i className="far fa-eye-slash" id="togglePassword"></i>
                      )}
                </div>
              </div>

              {touched.password && errors.password && (
                <div className="errorsMessage" data-testid="errorPassword">{errors.password}</div>
              )}
              {/* <div
                className={
                  touched.password && errors.password ? "" : "errorsMessage"
                }
              >
                {errors.password}
              </div> */}
              <div
                className={loginData.errMsg ? 'errMsg' : 'offscreen'}
                aria-live="assertive"
              >
                {loginData.errMsg}
              </div>
              <div className="text-center">
                <button className="btn button" type="submit">
                  Sign In
                </button>
                <p className="registerLink">
                  New member? <Link to="/register">Create Account</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
