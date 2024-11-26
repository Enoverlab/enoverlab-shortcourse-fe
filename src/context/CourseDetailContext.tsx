import { createContext, useEffect, useState } from "react";
import {contextProps, dataProps} from '../declarations'
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { getCourseDetail } from "../helper/api-communications";

interface detailContextProps{
    detailData : dataProps
}

const CourseDetailContext = createContext<detailContextProps>({} as detailContextProps
)

export default CourseDetailContext



export const CourseDetailProvider  = ({children}:contextProps)=>{
    const {id} = useParams()
    const navigate = useNavigate()
    const [detailData, setDetailData] = useState<dataProps>({}as dataProps)
    const auth = useAuth()
    useEffect(()=>{
        try {
            const getData = async()=>{
                if(id){
                    const courseData = await getCourseDetail(id)
                    const userData = auth?.userData
                    setDetailData(courseData)
                    if(userData?.paidCourses.find((item)=> item.courseId == courseData._id)){
                        navigate(`/enrolledcourse/${courseData._id}`)
                    }
                    return
                }
                navigate('404')
            }
            getData()
        } catch (error) {
            console.log(error)
        }
    },[id, navigate])
    return(<CourseDetailContext.Provider value={{detailData}}>
        {children}
    </CourseDetailContext.Provider>)
}