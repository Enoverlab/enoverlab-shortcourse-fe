import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import authImg from "../../assets/auth/auth.svg";
import googleIcon from "../../assets/auth/google.svg";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import SignUpVerification from "./SignUpVerification";

const AuthForm = () => {
  type loginvalues = {
    name?: string;
    email: string;
    password: string;
  };
  
  type signUpvalues = {
    name : string,
    email : string,
    password : string
  }
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verificationModal, setVerificationModal] = useState(false)
  const [mode , setMode] = useState('')
  const {authroute} = useParams()
  const auth = useAuth()
  const ref = localStorage.getItem('ref')
  const navigate = useNavigate()
  useEffect(()=>{
    window.scroll(0,0)
  if((authroute === 'login') || (authroute === 'signup')){
      if (authroute === 'login'){
        setLogin(true)
        setSignup(false)
      }
      else if (authroute === 'signup'){
        setSignup(true)
        setLogin(false)
      }
        
  }else{
    navigate('404')
  }
  },[authroute, navigate])

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

  const schemaChoice = signup ? signupValidationSchema : loginValidationSchema

  const handleSignInWithGoogle = async()=>{
    await auth?.signInWithGoogle()
    toast.update('auth', {render: "Signed In Successfully", type: "success", isLoading: false, autoClose : 3000});
    if(ref){
      navigate(ref)
      localStorage.removeItem('ref')
    }
    else{
      navigate('/')
      setLoading(false)
    }
  }
  return (
    <div className="px-5 lg:px-[6.94vw] lg:py-[7vw]">
      <Formik initialValues ={signupInitiValues } 
      validationSchema={Yup.object(schemaChoice)}
      onSubmit={
        signup ? async( values : signUpvalues )=>{
            setLoading(true)
            try {
              toast.loading('Signing Up', {toastId : 'auth'})
              await auth?.signup(values)
              setTimeout(async()=>{
                toast.update('auth', {render: "Signed Up Successfully", type: "success", isLoading: false, autoClose : 3000});
                setVerificationModal(true)
                setMode('success')
              }, 1500)

            } catch (error) {
              if(error instanceof AxiosError){
                toast.update('auth', {render: error?.response?.data.message, type: "error", isLoading: false, autoClose : 3000});
                setLoading(false)
              }
            }
        } : async(values : loginvalues)=>{
            setLoading(true)
            try {
              toast.loading('Logining In', {toastId : 'auth'})
              await auth?.login(values.email,values.password)
              setTimeout(async()=>{
                toast.update('auth', {render: "Signed In Successfully", type: "success", isLoading: false, autoClose : 3000});
                if(ref){
                  navigate(ref)
                  localStorage.removeItem('ref')
                }
                else{
                  navigate('/')
                  setLoading(false)
                }
              }, 2500)

            } catch (error ) {
              if(error instanceof AxiosError){
                toast.update('auth', {render: error?.response?.data.message, type: "error", isLoading: false, autoClose : 3000});
                setLoading(false)
              }
            }
        }
      }>
        <Form className="lg:border border-[#A1A1A1] rounded lg:flex lg:flex-row-reverse justify-between lg:py-[49px] lg:px-[70px] font-inter">
          <div className="flex items-center">
            <img src={authImg} alt="" />
          </div>
          <div className="py-[51px]  lg:py-0 lg:w-[34.23vw] lg:max-w-[500px]">
            <header className="text-[28px] lg:text-4xl mb-[49px] text-black-200 font-bold">
              {signup ? "Sign Up" : "Login"}
            </header>
            {authroute === "signup" && (
              <label htmlFor="name" className="flex flex-col w-full">
                <p className="font-semibold text-base lg:text-lg text-black-200 mb-2">Name</p>
                <Field
                  name="name"
                  type="text"
                  className="border border-[#626262] rounded-[5px] h-[60px] px-4 text-xl"
                />
                <ErrorMessage name="name">
                  {(msg) => <div className="text-red-500 italic text-lg">{msg}</div>}
                </ErrorMessage>
              </label>
            )}
            <label htmlFor="email" className="flex flex-col w-full my-3">
              <p className="font-semibold text-base lg:text-lg text-black-200 mb-2">Email</p>
              <Field
                name="email"
                type="text"
                className="border border-[#626262] rounded-[5px] h-[60px] px-4 text-xl"
              />
              <ErrorMessage name="email">
                {(msg) => <div className="text-red-500 italic text-lg">{msg}</div>}
              </ErrorMessage>
            </label>
            <label htmlFor="password" className="flex flex-col w-full my-3">
              <p className="font-semibold text-base lg:text-lg text-black-200 mb-2">Password</p>
              <Field
                name="password"
                type="password"
                className="border border-[#626262] rounded-[5px] h-[60px] px-4 text-xl"
              />
              <ErrorMessage name="password">
                {(msg) => <div className="text-red-500 italic text-lg">{msg}</div>}
              </ErrorMessage>
            </label>
            {signup && (
              <label htmlFor="confirmPassword" className="flex flex-col w-full my-3">
                <p className="font-semibold text-base lg:text-lg text-black-200 mb-2">Confirm Password</p>
                <Field
                  name="confirmPassword"
                  type="password"
                  className="border border-[#626262] rounded-[5px] h-[60px] px-4 text-xl"
                />
                <ErrorMessage name="confirmPassword">
                  {(msg) => <div className="text-red-500 italic text-lg">{msg}</div>}
                </ErrorMessage>
              </label>
            )}
            <button type="submit"
              className="bg-[#08F] border border-[#08F] w-full text-center text-white text-lg lg:text-xl font-semibold py-3 rounded-[5px] hover:bg-white hover:text-[#08F] transition-all duration-700 disabled:bg-[#4d9add] disabled:hover:bg-[#4d9add] disabled:cursor-not-allowed" 
              disabled={loading}
            >
              {signup ? "Sign Up" : "Login"}
            </button>
            <p className="text-center my-7 text-lg text-black-200">
              OR
            </p>
            <div onClick={handleSignInWithGoogle} className="flex items-center w-full gap-3 justify-center font-semibold text-black-200 text-xl border border-[#626262] rounded-[5px] py-3 transition-all duration-500 hover:bg-slate-400 hover:text-white cursor-pointer">
              <img src={googleIcon} alt="" />
              Continue with Google
            </div>
            {
              login && <p className="text-center text-lg font-medium text-black-100 mt-7">
              Don't have an account? <Link to="/auth/signup"  className="font-bold text-[#002DA4]"> Sign up </Link>
              </p>
            }
            {
              signup &&
              <p className="text-center text-lg font-medium text-black-100 mt-7">
                Already have an account?{" "}
                <Link to="/auth/login" className="font-bold text-[#002DA4]">
                  Log in
                </Link>
              </p>
            )}
          </div>
        </Form>
      </Formik>
      <SignUpVerification isOpen={verificationModal} handleModalClose={() => setVerificationModal(false)} state={mode} />
    </div>
  );
};

export default AuthForm;
