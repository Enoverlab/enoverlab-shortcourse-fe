import { useContext } from "react"
import CourseDataListContext from "../../context/CourseDataListContext"
import Card from "../Card"



const Popular = () => {
    const {data} = useContext(CourseDataListContext)
  return (
    <div className="bg-[#E3FAFB] px-5 py-10 lg:px-[12vw] lg:py-20 font-inter ">
        <header className="mb-6 text-xl lg:text-3xl text-black-100">
            Popular Courses
        </header>
      <section className="grid md:grid-cols-2 lg:grid-cols-3 lg:gap-[2.19vw] lg:gap-y-20 gap-10">
      {
        data?.filter((item, idx)=> {
          if(item){
            return idx < 3
          }
        }
        ).map((course, idx)=> <Card key={idx} image={course?.courseImg} instructorName={course?.instructorName} topic={course?.topic} price={course?.price} id={course?._id}/> )
        }
      </section>
    </div>
  )
}

export default Popular
