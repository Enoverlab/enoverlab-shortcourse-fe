import clsx from "clsx"
import search from '../../assets/landing/search.svg'
import { useContext, useState } from "react"
import CourseDataListContext from "../../context/CourseDataListContext"
import Card from "../Card"
import spinner from '../../assets/landing/loadingspinner.svg'


const Explore = () => {
    const {activeTab, switchTab, data, loading, searchParam, setSearchParam} = useContext(CourseDataListContext)
    const [dataLength, setDataLength] = useState({length : 6, expanded :  false})
    const handleExpand = ()=>{
        setDataLength({length : data.length, expanded
            : true
        })
    }
    const handleContrast = ()=>{
        setDataLength({length : 6, expanded
            : false
        })
    }
  return (
    <div className="font-inter my-9">
        <header className="flex justify-center items-center">
            <h1 className="bg-blue-100 text-white px-10 py-4 lg:py-5 lg:px-8 font-bold text-lg md:text-xl lg:text-[34px] rounded-md ">
            EXPLORE OUR COURSES
            </h1>
        </header>
        <section className="flex justify-center items-center mt-9 lg:mt-12 px-5 gap-4 lg:gap-8">
            <div className={clsx(`w-[122px] md:w-[248px] border border-[#9D9D9D] rounded-md text-center font-normal text-lg md:text-xl cursor-pointer transition-all duration-700 px-2 py-2`, (activeTab == 'basic') && 'bg-blue-100 text-white font-bold')}
            onClick={()=>{
                switchTab('basic')
                if(data){
                    handleContrast()
                }
            }}
            >
            Beginner
            </div>
            <div
            className={clsx(`w-[248px] border border-[#9D9D9D] rounded-md text-center font-normal text-lg md:text-xl cursor-pointer transition-all duration-700 py-2 px-2`, (activeTab == 'intermediate') && 'bg-blue-100 text-white font-bold')}
            onClick={()=>{
                switchTab('intermediate')
                if(data){
                    handleContrast()
                }
                }}>
            Intermediate
            </div>
            <div
            className={clsx(`w-[248px] border border-[#9D9D9D] rounded-md text-center font-normal text-lg md:text-xl cursor-pointer transition-all duration-700 py-2 px-2`, (activeTab == 'advanced') && 'bg-blue-100 text-white font-bold')}
            onClick={()=>{
                switchTab('advanced')
                if(data){
                    handleContrast()
                }
            }}>
            Professional
            </div>
        </section>
        <form action="" method="get" className="flex justify-center mt-7">
            <div className='p-3 rounded-3xl flex justify-between items-center bg-white border border-[#2D2F31]'>
            <img src={search} alt="" />
            <input type="text" name="" id="" placeholder='' className='outline-none w-[220px] lg:w-[720px]' value={searchParam} onChange={(e)=>{setSearchParam(e.target.value)}} />
            <div>search</div>
            </div>
        </form>
        {
            loading ? (<div className="flex  justify-center py-28">
                <img src={spinner} alt="enoverlab spinner" className="w-20 md:w-32"/>
            </div>) : (<>
            <section className="grid md:grid-cols-2 lg:grid-cols-3 mx-5 lg:mx-[12vw] lg:gap-[2.19vw]  mt-10 lg:mt-20 lg:gap-y-20 gap-10">
            {
                data?.filter((item, idx)=> {
                    if(item){
                        return idx < dataLength.length
                    }
                    }
                ).map((course, idx)=> <Card key={idx} image={course.courseImg} instructorName={course.instructorName} topic={course.title} price={course.price} id={course._id}/> )
            }
        </section>
        <div className="flex justify-end mx-5 lg:mx-[12vw] mt-5">
            {
                !dataLength.expanded && <button disabled={(data.length < 1)} className="bg-blue-100 text-white border font-bold border-blue-100 hover:text-blue-100 hover:bg-white py-2 w-[100px] text-sm lg:text-[19px] lg:w-[140px] rounded-md disabled:bg-blue-400 disabled:cursor-not-allowed disabled:hover:text-white" onClick={handleExpand}>
                View all
            </button>
            }
        </div>
            </>)
        }
      
    </div>
  )
}

export default Explore
