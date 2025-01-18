import { createContext, useEffect, useState } from "react";
import {dataProps,contextProps} from '../declarations'
import { getCoursesData } from "../helper/api-communications";
import { toast } from "react-toastify";

interface listContextProps{
    data : dataProps[]
    activeTab : string
    switchTab : (tabname:string)=> void
    loading : boolean
    setSearchParam : React.Dispatch<React.SetStateAction<string | undefined>>
    searchParam : string | undefined
}


const CourseDataListContext = createContext<listContextProps>({}as listContextProps)

export default CourseDataListContext

export const CourseDataListProvider = ({children}:contextProps)=>{
    const [data, setData] = useState<dataProps[]>([] as dataProps[])
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState<string>('basic')
    const [searchParam, setSearchParam] = useState<string | undefined>(undefined)
    const switchTab = (tabname: string)=>{
        setActiveTab(tabname)
    }

    const tab = activeTab
    const param = searchParam
    useEffect(()=>{

        const getData = async ()=>{
            try {
                setLoading(true)
                const data =  await getCoursesData(tab, param)
                if(data){
                    setData(data)
                    setTimeout(()=>{
                        setLoading(false)
                    }, 3500)
                }
            } catch (error) {
                setLoading(false)
                toast.error('A network error occured, Refresh again')
                console.log(error)
            }
        }
        getData()
    },[tab, param])



    return (<CourseDataListContext.Provider value={{data, activeTab, switchTab, loading, setSearchParam, searchParam}}>
        {children}
    </CourseDataListContext.Provider>)
}