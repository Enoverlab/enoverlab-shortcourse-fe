import { useEffect } from 'react'
import loading from '../../assets/landing/loadingspinner.svg'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { useAuth } from '../../context/AuthContext'
const VerifyEmail = () => {
    const auth = useAuth()
    const [searchParam] = useSearchParams()
    const token = searchParam.get('token')!
    const navigate = useNavigate()
    useEffect(()=>{
        if(!token){
            navigate('404')
        }
        const confirmEmail = async()=>{
            try {
                await auth?.confirmEmail(token)
                toast.success('Email verified successfully')
                setTimeout(()=>{
                    navigate('/')
                },1500)
            } catch (error) {
                if(error instanceof AxiosError){
                    toast.error(error?.response?.data.message)
                    setTimeout(()=>{
                        navigate('/auth/login')
                    },1500)
                }
            }
        }
        confirmEmail()
    },[token, navigate,auth])
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <img src={loading} alt="enoverlab loading" className='w-24 md:w-32' />
    </div>
  )
}

export default VerifyEmail
