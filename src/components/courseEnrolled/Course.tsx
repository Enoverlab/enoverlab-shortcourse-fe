import { chapterProps } from "../../declarations"
import dropDown from '../../assets/drop-down.svg'
import dropUp from '../../assets/drop-up.svg'
import clsx from "clsx"
import { useContext } from "react"
import CourseDetailContext from "../../context/CourseDetailContext"
import ChapterContext from "../../context/ChapterContext"
import courseVid from '../../assets/courseVid.svg'
import VideoPlayer from "../VideoPlayer"


const Course = () => {
  const {detailData} = useContext(CourseDetailContext)
  const {setActiveChapter,activeChapter} = useContext(ChapterContext)
  return (
    <div className="bg-[#EEFCFC] font-inter  lg:px-[102px] py-12 lg:py-[75px]">
      <div className="mb-6 lg:mb-[51px] px-5 lg:px-0">
        <button className="bg-[#002890] text-[15px] border border-[#002890] font-bold lg:text-[26px] py-2 px-3 text-white rounded-md hover:text-[#002890] hover:bg-white duration-700 transition-all">
            Start Course
        </button>
      </div>
      <main>
        <header className="text-lg lg:text-[26px] mx-5 lg:mx-0 font-bold text-black-200 leading-[53px]">
            Course Guide
        </header>
        <div className="bg-white lg:px-[57px] px-5 lg:py-[98px] mt-3 lg:rounded-2xl lg:border border-[#CBCBCB]">
          {detailData.courseMtl?.map((item, idx)=> <ChapterItem key={idx} idx={idx} topic={item.topic} duration={item.duration} details={item.details} videoUrl={item.videoUrl} setActiveChapter={setActiveChapter} activeChapter={activeChapter}/>)}
        </div>
      </main>
    </div>
  )
}

export default Course

const ChapterItem = ({idx = 0, topic,duration, details,videoUrl,activeChapter,setActiveChapter}:chapterProps)=>{
  const handleToggle = ()=>{
    if(activeChapter == idx){
      if(setActiveChapter)
        setActiveChapter(undefined)
    }else{
      if(setActiveChapter)
        setActiveChapter(idx)
    }
  }
  return(<div className="font-inter border-b border-[#838383] py-4">
    <header className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between cursor-pointer" onClick={handleToggle}>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-[5.92vw]">
        <h3 className="text-[#838383] font-medium text-lg">
          {`Chapter${idx + 1}`}
        </h3>
        <h2 className="text-black-200 text-lg font-semibold">{topic}</h2>
      </div>
      <div className="flex items-center">
        <p className="text-[#838383] font-medium text-lg">
          {duration}
        </p>
        <div>
          <img src={activeChapter === idx ? dropUp : dropDown} alt="" className="transition-all duration-700"/>
        </div>
      </div>
    </header>
    <main className={clsx('max-h-0 overflow-hidden transition-all ease-in-out duration-700 text-black-200', activeChapter == idx && 'max-h-[750px] lg:max-h-[600px] mt-3 lg:mt-6')}>
      <p className="text-sm leading-7 mb-5 lg:mb-8">
        {details}
      </p>
      <div className="flex justify-center">
        <VideoPlayer tabOpen={activeChapter == idx} src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" poster="https://example.com/poster-image.jpg"/>
      </div>
    </main>
  </div>)
}