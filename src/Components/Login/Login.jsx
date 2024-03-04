import axios from "axios";
import {useFormik} from "formik";
import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {userContext} from "../../Context/UserContext";

function Login() {
  /* ========== Context ========== */

  const {setUserToken} = useContext(userContext);

  /* ========== States ========== */
  const navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /* ========== Register ========== */
  async function login(values) {
    setIsLoading(true);

    try {
      let {data} = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signIn",
        values
      );
      setIsLoading(false);
      console.log(data);
      if (data.msg === "done") {
        setUserToken(data.token);
        setSuccess("Successfully Login");
        localStorage.setItem("userTokennote", `3b8ny__${data.token}`);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      seterror(
        `Try agin enter valid email and password   ${error.response.data.msg}`
      );
    }
  }
  function tryTestEmail() {
    formik.values.email = "markmaher383@gmail.com";
    formik.values.password = "Mark123";
  }

  /* ========== validationSchema ========== */
  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter Email vaild")
      .required("Email must be required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,15}$/,
        "Password Start With uppercase letter and Must be More then 3 characters"
      )
      .required("Enter Your Phone"),
  });

  /* ========== Formik ========== */

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validate: function () {
      seterror(null);
    },

    onSubmit: login,
  });

  /* ========== Display Icons In Input  ========== */

  function displayIcons(e) {
    // console.log(e.target);

    if (e.target.value.trim() !== "") {
      e.target.nextElementSibling.classList.add("d-none");
      e.target.nextElementSibling.classList.remove("d-block");
    } else {
      e.target.nextElementSibling.classList.remove("d-none");
      e.target.nextElementSibling.classList.add("d-block");
    }
  }

  return (
    <>
      <div className='login'>
        <div className='container'>
          <div className='row g-0'>
            <div className='col-7 image'></div>
            <div className='col-lg-5'>
              <div className='data shadow'>
                {/* Set Error */}
                {error ? (
                  <>
                    <span className='error-acu alert-danger alert'>
                      {" "}
                      <i className='fa-solid fa-bug'></i> {error}
                    </span>
                  </>
                ) : null}
                {/* Set success */}

                {success ? (
                  <>
                    <span className='done alert alert-success'>
                      {" "}
                      <i className='fa fa-circle-check'></i> {success}
                    </span>
                  </>
                ) : null}
                {/* Form */}
                <h1>Login</h1>
                <p>To keep connected with us please login to our website </p>
                <form onSubmit={formik.handleSubmit}>
                  {/* Email */}
                  <div className='item'>
                    <input
                      type='email'
                      className='form-control'
                      placeholder='Your Email'
                      name='email'
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      onKeyUp={displayIcons}
                    />
                    <i className='fa fa-at'></i>
                    {formik.errors.email && formik.touched.email ? (
                      <span className='error'> {formik.errors.email}</span>
                    ) : null}
                    {!formik.errors.email && formik.touched.email ? (
                      <span className='is-valid text-success d-block text-center fw-bold mt-2'>
                        <i className='fa-solid  fa-circle-check'></i>{" "}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* Password */}
                  <div className='item'>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='Your Password'
                      name='password'
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      onKeyUp={displayIcons}
                    />
                    <i className='fa fa-lock'></i>
                    {formik.errors.password && formik.touched.password ? (
                      <span className='error'> {formik.errors.password}</span>
                    ) : null}
                    {!formik.errors.password && formik.touched.password ? (
                      <span className='is-valid text-success d-block text-center fw-bold mt-2'>
                        <i className='fa-solid  fa-circle-check'></i>{" "}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  {/* Btn */}
                  <button
                    className='btn tryemail'
                    onClick={() => {
                      tryTestEmail();
                    }}
                  >
                    Try with test email
                  </button>
                  <button
                    disabled={!(formik.isValid && formik.dirty)}
                    type='submit'
                  >
                    {" "}
                    {isLoading ? (
                      <i className='fa-solid fa-spinner fa-spin'></i>
                    ) : (
                      "Login"
                    )}{" "}
                  </button>
                  <p className='member'>
                    Create a new account ?{" "}
                    <Link to={"/Register"}> Register </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
