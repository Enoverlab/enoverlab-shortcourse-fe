import { useContext } from "react"
import CourseDetailContext from "../../context/CourseDetailContext"
import { Star } from "../Card"
import clsx from "clsx"
import { detailHeroProps } from "../../declarations"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { toast } from "react-toastify"
import PaystackPop from '@paystack/inline-js'
import { initializePayment } from "../../helper/api-communications"


const DetailHero = ({enrolled}:detailHeroProps) => {
  const {detailData} = useContext(CourseDetailContext)
  const {pathname} = useLocation()
  const {id} = useParams<string>()
  const navigate = useNavigate()
  const auth = useAuth()
  const handleEnrollment = async()=>{
    const loggedIn = auth?.isLoggedin
    if(!loggedIn){
      localStorage.removeItem('ref')
      localStorage.setItem('ref', pathname)
      toast.warning("Looks like you aren't signed in, Redirecting to Login")
      setTimeout(()=>{
        navigate('/auth/login')
      },2000)
    }else{
      try {
        const response = await initializePayment(detailData?.price * 100, `https://enoverlab.com`,id)
        const popup = new PaystackPop()
        popup.resumeTransaction(response.access_code)
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div className="font-inter ">
      <section className=" lg:px-[102px] mt-10 lg:py-24 lg:text-white lg:bg-blue-300 relative ">
        <h2 className="text-[28px] md:text-[32px] font-bold lg:w-[50vw] lg:max-w-[720px] px-5 md:px-14 lg:px-0">
          {detailData?.title}
        </h2>
        <div className={clsx("lg:absolute lg:w-[31.9vw] lg:max-w-[460px] px-5 md:px-14 right-[102px] top-28 py-6 lg:px-6 bg-white", enrolled && 'top-28 lg:h-[35.7vw] p-2')}>
          <img src={detailData?.courseImg} alt="" className="w-full h-full object-cover"/>
          {
            !enrolled && (<>
            <p className="hidden lg:flex text-black-100 text-[42px] font-bold mt-6">₦{detailData?.price?.toLocaleString()}</p>
            <button onClick={handleEnrollment} className="hidden lg:flex justify-center bg-blue-100 text-white border font-bold border-blue-100 hover:text-blue-100 hover:bg-white py-4 mt-2 text-sm lg:text-[26px] w-full rounded-md text-center">
              Enroll Now
            </button>
            </>)
          }
        </div>
        <div className="lg:w-[50vw] lg:max-w-[720px]  text-white  py-6 space-y-8 md:space-y-9 bg-blue-300">
          <header className="text-[26px] italic font-medium md:font-bold px-5 md:px-14 lg:px-0">
            About Course
          </header>
          <p className="text-base lg:text-lg font-normal md:font-medium leading-7 lg:leading-10 px-5 md:px-14 lg:px-0 ">
            {detailData?.description}
          </p>
          <p className="text-xl font-bold px-5 md:px-14 lg:px-0 ">
            Tutor : {detailData?.instructorName}
          </p>
          
        </div>
        <div className="px-5 md:px-14 lg:px-0 bg-white lg:bg-blue-300 py-8">
            <Star value={5}/>
          </div>
      </section>
      {
        !enrolled && <section className="bg-[#D6E1FF] lg:px-[102px] lg:pt-20 lg:pb-24 px-8 py-6 md:px-14">
        <header className="text-lg font-bold mb-3">
          What you’ll learn:
        </header>
        <div className="text-base lg:text-lg list-disc space-y-2">
          <li>Lorem ipsum dolor sit amet, consectetur</li>
          <li>Lorem ipsum dolor sit amet, consectetur</li>
          <li>Lorem ipsum dolor sit amet, consectetur</li>
        </div>
      </section>
      }
      {!enrolled && <div className="lg:hidden px-5">
        <p className=" text-black-100 text-[36px] font-bold mt-6">₦{detailData?.price?.toLocaleString()}</p>
        <button onClick={handleEnrollment} className="justify-center bg-blue-100 text-white border font-bold border-blue-100 hover:text-blue-100 hover:bg-white py-4 mt-2 text-lg w-full rounded-md text-center">
          Enroll Now
        </button>
      </div>
      }
    </div>
  )
}

export default DetailHero
