import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

function Register() {

    /* ========== States ========== */
    const navigate = useNavigate()
    const [error, seterror] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    /* ========== Register ========== */
    async function register(values) {
        setIsLoading(true)
        try {
            let { data } = await axios.post("https://note-sigma-black.vercel.app/api/v1/users/signUp", values)
            setIsLoading(false)
            console.log(data)

            if (data.msg === "done") {
                setSuccess('Successfully registered')
                console.log("success")
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }
        }
        catch (error) {
            setIsLoading(false)
            seterror(error.response.data.msg)
            // console.log(error)
        }
    }

    /* ========== validationSchema ========== */
    let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    let validationSchema = Yup.object({
        name: Yup.string().min(3, "Your Name Must be More then 3 characters").max(10, "Your Name Must be less then 10 characters").required("Name must be requird"),
        email: Yup.string().email("Enter Email vaild").required("Email must be required"),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "Password Start With uppercase letter and Must be More then 3 characters").required("Enter Your Phone"),
        phone: Yup.string().matches(phoneRegExp, " Enter Egyptian Number").required("phone is required"),
        age: Yup.string().required("age is required"),

    })

    /* ========== Formik ========== */

    let formik = useFormik({

        initialValues: {
            name: '',
            email: '',
            password: '',
            phone: '',
            age: ''
        }, validationSchema, validate: function () {
            seterror(null)
            setSuccess(null)
        },


        onSubmit: register
    })

    /* ========== Display Icons In Input  ========== */

    function displayIcons(e) {
        // console.log(e.target);

        if (e.target.value.trim() !== "") {
            e.target.nextElementSibling.classList.add('d-none');
            e.target.nextElementSibling.classList.remove('d-block');
        } else {
            e.target.nextElementSibling.classList.remove('d-none');
            e.target.nextElementSibling.classList.add('d-block');
        }
    }

    return <>

        <div className="register">
            <div className='container'>
                <div className="row g-0">

                    <div className="col-7"></div>
                    <div className='col-lg-5'>

                        <div className="data shadow">
                            {/* Set Error */}
                            {error ? <>
                                <span className='error-acu alert-danger alert'> <i className="fa-solid fa-bug"></i> {error}</span>

                            </> : null}
                            {/* Set success */}

                            {success ? <>
                                <span className='done alert alert-success' >  <i className='fa fa-circle-check'></i> {success}</span>
                            </> : null}
                            {/* Form */}
                            <h1>Register</h1>
                            <p>To keep connected with us please register to our website    </p>
                            <form onSubmit={formik.handleSubmit}>
                                {/* Name */}

                                <div className='item'>
                                    <input type="text" className='form-control' placeholder='Your Name' name='name' value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} onKeyUp={displayIcons} />
                                    <i className='fa fa-user'></i>

                                    {formik.errors.name && formik.touched.name ? <span className='error'> {formik.errors.name}</span> : ''}
                                    {!formik.errors.name && formik.touched.name ? <span className='is-valid text-success d-block text-center fw-bold mt-2'><i className="fa-solid  fa-circle-check"></i> </span> : ""}
                                </div>
                                {/* Email */}
                                <div className='item'>
                                    <input type="email" className='form-control' placeholder='Your Email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} onKeyUp={displayIcons} />
                                    <i className='fa fa-at'></i>
                                    {formik.errors.email && formik.touched.email ? <span className='error'> {formik.errors.email}</span> : null}
                                    {!formik.errors.email && formik.touched.email ? <span className='is-valid text-success d-block text-center fw-bold mt-2'><i className="fa-solid  fa-circle-check"></i>  </span> : ""}

                                </div>
                                {/* Password */}
                                <div className='item'>
                                    <input type="password" className='form-control' placeholder='Your Password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} onKeyUp={displayIcons} />
                                    <i className='fa fa-lock'></i>
                                    {formik.errors.password && formik.touched.password ? <span className='error'> {formik.errors.password}</span> : null}
                                    {!formik.errors.password && formik.touched.password ? <span className='is-valid text-success d-block text-center fw-bold mt-2'><i className="fa-solid  fa-circle-check"></i> </span> : ""}

                                </div>
                                {/* Phone */}
                                <div className='item'>
                                    <input type="number" className='form-control' placeholder='Your Phone' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} onKeyUp={displayIcons} />
                                    <i className="fa-solid fa-phone"></i>
                                    {formik.errors.phone && formik.touched.phone ? <span className='error'> {formik.errors.phone}</span> : null}
                                    {!formik.errors.phone && formik.touched.phone ? <span className='is-valid text-success d-block text-center fw-bold mt-2'><i className="fa-solid  fa-circle-check"></i> </span> : ""}

                                </div>
                                {/* Age */}
                                <div className='item'>
                                    <input type="number" className='form-control' placeholder='Your Age' name='age' value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur} onKeyUp={displayIcons} />
                                    <i className="fa-solid fa-hashtag"></i>
                                    {formik.errors.age && formik.touched.age ? <span className='error'> {formik.errors.age}</span> : null}
                                    {!formik.errors.age && formik.touched.age ? <span className='is-valid text-success d-block text-center fw-bold mt-2'><i className="fa-solid  fa-circle-check"></i>  </span> : ""}

                                </div>
                                {/* Btn */}
                                <button disabled={!(formik.isValid && formik.dirty)} type='submit'>   {isLoading ? <i className='fa-solid fa-spinner fa-spin'></i> : ' Create account'}   </button>
                                <p className='member'>Aleady a member ? <Link to={'/login'}> Login </Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    </>
}

export default Register
