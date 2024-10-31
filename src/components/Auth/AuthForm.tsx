import {  Link, useNavigate, useParams } from "react-router-dom"
import { Formik, Form, ErrorMessage, Field } from "formik"
import * as Yup from 'yup'
import { useEffect, useState } from "react"
import authImg from "../../assets/auth/auth.svg"
import googleIcon from "../../assets/auth/google.svg"

const AuthForm = () => {
    const [login, setLogin] = useState(false)
    const [signup, setSignup] = useState(false)
    const {authroute} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
    if((authroute === 'login') || (authroute === 'signup')){
        if (authroute === 'login')
          setLogin(true)
        else if (authroute === 'signup')
         setSignup(true)
    }else{
      navigate('404')
    }
    },[authroute])
    const loginInitValues = {email : "", password : ""}
    const signupInitiValues = {...loginInitValues, name :""}
    const loginValidationSchema = {
      email : Yup.string().email('Must be a valid email address').trim().lowercase().required('Email input required'),
      password : Yup.string().trim().required('Password input required'),
    }
    const signupValidationSchema = {
      ...loginValidationSchema,
      name : Yup.string().trim().required('Name input required')
    }
    function navigatee (){
      navigate("/auth/login")
    }
  return (
    <div className="px-5 lg:px-[6.94vw] lg:py-[10vw]">
      <Formik initialValues={login ? loginInitValues : signupInitiValues} 
      validationSchema={Yup.object(signup ? signupValidationSchema : loginValidationSchema)}
      onSubmit={
        (values)=>{
            console.log(values)
        }
      }>
        <Form className="lg:border border-[#A1A1A1] rounded lg:flex lg:flex-row-reverse justify-between lg:py-[49px] lg:px-[70px] font-inter">
          <div className="flex items-center">
            <img src={authImg} alt="" />
          </div>
          <div className="py-[51px]  lg:py-0 lg:w-[34.23vw] lg:max-w-[500px]">
            <header className="text-[28px] lg:text-4xl mb-[49px] text-black-200 font-bold">
              {signup ? 'Sign Up' : 'Login'}
            </header>
            {
              signup && 
              <label htmlFor="name" className="flex flex-col w-full">
                <p className="font-semibold text-base lg:text-lg text-black-200 mb-2">Name</p>
                <Field name='name' type='text' className="border border-[#626262] rounded-[5px] h-[60px] px-4 text-xl"/>
                <ErrorMessage name="name" >
                  {msg => <div className="text-red-500 italic text-lg">{msg}</div>}
                </ErrorMessage>
              </label>
            }
            <label htmlFor="email" className="flex flex-col w-full my-3">
              <p className="font-semibold text-base lg:text-lg text-black-200 mb-2">Email</p>
              <Field name='email' type='text' className="border border-[#626262] rounded-[5px] h-[60px] px-4 text-xl"/>
              <ErrorMessage name="email" >
                {msg => <div className="text-red-500 italic text-lg">{msg}</div>}
              </ErrorMessage>
            </label>
            <label htmlFor="password" className="flex flex-col w-full my-3">
              <p className="font-semibold text-base lg:text-lg text-black-200 mb-2">Password</p>
              <Field name='password' type='text' className="border border-[#626262] rounded-[5px] h-[60px] px-4 text-xl"/>
              <ErrorMessage name="password" >
                {msg => <div className="text-red-500 italic text-lg">{msg}</div>}
              </ErrorMessage>
            </label>
            <button className=" bg-[#08F] border border-[#08F] w-full text-center text-white text-lg lg:text-xl font-semibold py-3 rounded-[5px] hover:bg-white hover:text-[#08F] transition-all duration-700">
              {signup ? 'Sign Up' : 'Login'}
            </button>
            <p className="text-center my-7 text-lg text-black-200">
              OR
            </p>
            <button className="flex items-center w-full gap-3 justify-center font-semibold text-black-200 text-xl border border-[#626262] rounded-[5px] py-3 transition-all duration-500 hover:bg-slate-400 hover:text-white">
              <img src={googleIcon} alt="" />
              Continue with Google
            </button>
            <p className="text-center text-lg font-medium text-black-100 mt-7">
            Don't have an account? <Link to="/auth/signup"  className="font-bold text-[#002DA4]">{signup ? 'Log in' : 'Sign up'} </Link>
            </p>
            {
              signup &&
              <p className="text-center text-lg font-medium text-black-100 mt-7">
              Already have an account? <span onClick={navigatee} className="font-bold text-[#002DA4]">Log in</span>
              </p>
            }
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default AuthForm
