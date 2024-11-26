import axios from 'axios'
import {  signUpProp } from '../declarations'

export const loginUser = async(urlPath: string, email: string, password : string)=>{
    const response = await axios.post(urlPath, {email, password})
    
    if(response.status !== 200){
        throw new Error('Unable to log in')
    }
    const data = response.data
    return data
}

export const signinUser = async({urlPath, values}: signUpProp)=>{
    const response = await axios.post(urlPath, values)
    console.log(response)
    if(response.status !== 201){
        throw new Error('Unable to Sign Up')
    }
    const data = response.data
    return data
}

export const whoami = async(urlPath : string)=>{
    const response = await axios.get(urlPath)
    if(response.status !== 200){
        throw new Error('User not logged in')
    }
    const data = response.data
    return data
}

export const initializePayment = async(amount : number, callback_url : string)=>{
    const response = await axios.post('payment/initialize', {amount, callback_url})

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