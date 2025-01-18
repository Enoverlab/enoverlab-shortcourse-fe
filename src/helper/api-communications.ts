import axios, { AxiosError } from 'axios'
import {  signUpProp } from '../declarations'
import { signInWithGooglePopup } from '../../firebase'
import { getAdditionalUserInfo } from 'firebase/auth'

export const loginUser = async( email: string, password : string)=>{
    try {
        const response = await axios.post('/auth/login', {email, password})
        const data = response.data
        return data
    } catch (error) {
        if (error instanceof AxiosError){
            if(Array.isArray(error?.response?.data.message)){
                throw new Error(error?.response?.data.message[0])
            }
            throw new Error(error?.response?.data.message)
        }
    }

    
}

export const signupUser = async({values}: signUpProp)=>{
    try{
        const response = await axios.post('/auth/signup', values)
        const data = response.data
        return data
    }catch(error){
        if (error instanceof AxiosError){
            if(Array.isArray(error?.response?.data.message)){
                throw new Error(error?.response?.data.message[0])
            }
            throw new Error(error?.response?.data.message)
        }
    }
}

export const whoami = async(urlPath : string)=>{
    const response = await axios.get(urlPath)
    if(response.status !== 200){
        throw new Error('User not logged in')
    }
    const data = response.data
    return data
}

export const initializePayment = async(amount : number, callback_url : string, courseId : string | undefined)=>{
    const response = await axios.post('payment/initialize', {amount, callback_url, courseId})

    if(response.status !== 200){
        throw new Error('An Error Occurred')
    }
    
    const data = response.data
    return data
    
}

export const getCoursesData = async (tab : string, searchParam ?: string)=>{
    let param 
    if(searchParam){
        param = `courseName=${searchParam}`
    }
    const response = await axios.get(`/courses/getAllcourse?courseLevel=${tab}&${param}`)

    if(response.status !== 200){
        throw new Error('An Error Occurred')
    }
    
    const data = response.data
    return data
}

export const getCourseDetail = async (courseId : string)=>{
    const response = await axios.get(`/courses/getcourseById?courseId=${courseId}`)

    if(response.status !== 200){
        throw new Error('An Error Occurred')
    }
    
    const data = response.data
    return data
}

export const confirmEmailReq = async(token: string)=>{
    const response = await axios.get(`/auth/verifyStatus?token=${token}`)
    if(response.status !== 200){
        throw new Error('An Error Occurred')
    }
    const data = response.data
    return data
}

export const logGoogleUser = async () => {
    try {
        // Authenticate user
        const response = await signInWithGooglePopup();
        // get concise information about logged in user
        const userInfo = getAdditionalUserInfo(response);
        console.log({response, userInfo})
        // COlate values and assign to their proper fields
        const values = {
            name: userInfo?.profile?.name,
            email: userInfo?.profile?.email,
            userimg: userInfo?.profile?.picture,
            confirmedEmail: userInfo?.profile?.verified_email,
        };
        
        const serverRes = await axios.post('/auth/googleauth', values)
        const data = serverRes.data
        return data
    } catch (error) {
        console.log(error)
        if (error instanceof AxiosError){
            throw new Error(error?.response?.data.message)
        }
    }
    
    
  };