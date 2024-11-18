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
    id : number,
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
    urlPath : string
    email : string
    password : string
}

export interface signUpProp {
    values : {
        name ?: string
        email : string
        password : string
    }
    urlPath : string
    
}
export interface userprop{
    id : number,
    name : string,
    email : string
}




export interface contextProps{
    children : ReactNode
}

export interface detailHeroProps{
    enrolled : boolean
}