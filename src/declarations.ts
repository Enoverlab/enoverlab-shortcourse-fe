import { ReactNode } from "react"


export interface chapterContextProps {
    activeChapter : number | undefined
    setActiveChapter : React.Dispatch<React.SetStateAction<number | undefined>>
}

export interface chapterProps extends Partial <chapterContextProps>{
    idx ?: number,
    topic : string,
    duration : string,
    details : string,
    videoUrl : string,
}

export interface dataProps{
    _id : string,
    topic : string,
    instructorName : string,
    rating : number,
    price : number,
    category : string,
    courseImg : string
    details : string,
    courseMtl ?: chapterProps[]
}

export interface loginprop{
    email : string
    password : string
}

export interface signUpProp {
    values : {
        name ?: string
        email : string
        password : string
    }  
}
export interface userprop{
    id : number,
    name : string,
    email : string,
    paidCourses : UserPaidCourse[]
}

export interface UserPaidCourse{
    courseId: string

    datePurchased: Date

    userId: string

    progress: [
        {
        moduleId: string,
        status: boolean,
        completedAt: Date,
        },
    ]
}




export interface contextProps{
    children : ReactNode
}

export interface detailHeroProps{
    enrolled ?: boolean
}