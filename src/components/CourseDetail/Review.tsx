import { useState } from "react"
import { Star } from "../Card"
import reviewImg from '../../assets/coursedetails/reviewImg.png'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'


const Review = () => {
  return (
    <div className="px-[6.9vw] py-14 lg:py-[109px]" id="review">
        <Swiper
    breakpoints={{
        1024: {
            slidesPerView : 1.8,
            spaceBetween : 12,
        }
    }}
    
    >
        <SwiperSlide>
            <ReviewCard/>
        </SwiperSlide>
        <SwiperSlide>
            <ReviewCard/>
        </SwiperSlide>
        <SwiperSlide>
            <ReviewCard/>
        </SwiperSlide>
      
    </Swiper>
    </div>
  )
}

export default Review

const ReviewCard = ()=>{
    const [likeStatus, setLikeStatus] = useState({liked : false, disliked :  false})
    const handleLikedStatus = ()=>{
        if(likeStatus.liked){
            setLikeStatus({disliked : false, liked : false})
            return;
        }
        setLikeStatus({disliked : false, liked : true})
    }
    const handleDislikedStatus = ()=>{
        if(likeStatus.disliked){
           setLikeStatus({disliked : false, liked : false})
           return 
        }
        setLikeStatus({disliked : true, liked : false})
    }
    return(<div className="border border-[#D1D7DC] p-6">
        <p className="text-2xl text-black-100 font-bold my-4">
            Reviews
        </p>
        <div className="flex flex-col lg:flex-row items-start justify-between">
            <div className="flex gap-3 lg:my-9">
                <img src={reviewImg} alt="" />
                <div>
                    <p className="text-black-100 font-bold">James D.</p>
                    <p className="text-sm">3 Courses</p>
                    <p className="text-sm">2 Reviews</p>
                </div>
            </div>
            <div className="hidden lg:flex">
            <Star/>
            </div>
        </div>
        <p className="lg:mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus iste, dolor cupiditate, ratione ducimus corrupti,</p>
        <div>
            <p>
            Was this review helpful?
            </p>
            <div className="flex gap-2">
                <ThumbsUp clickHandler={handleLikedStatus} likeStatus={likeStatus}/>
                <ThumbsDown clickHandler={handleDislikedStatus} likeStatus={likeStatus}/>
            </div>
        </div>

    </div>)
}

interface handlerProps{
    clickHandler : ()=> void
    likeStatus : {liked : boolean, disliked :  boolean}
}

const ThumbsUp = ({clickHandler, likeStatus}: handlerProps)=>{

    return(<>
            <svg onClick={clickHandler} className="cursor-pointer transition-all duration-700" width="40" height="41" viewBox="0 0 40 41" fill={likeStatus?.liked ? 'black' : "none"} xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="1.43994" width="39" height="39" rx="19.5" stroke="#2D2F31"/>
                <path d="M17.5002 28.4399H25.0002C25.6918 28.4399 26.2835 28.0232 26.5335 27.4232L29.0502 21.5482C29.1252 21.3565 29.1668 21.1565 29.1668 20.9399V19.2732C29.1668 18.3565 28.4168 17.6065 27.5002 17.6065H22.2418L23.0335 13.7982L23.0585 13.5315C23.0585 13.1899 22.9168 12.8732 22.6918 12.6482L21.8085 11.7732L16.3168 17.2649C16.0168 17.5649 15.8335 17.9815 15.8335 18.4399V26.7732C15.8335 27.6899 16.5835 28.4399 17.5002 28.4399ZM17.5002 18.4399L21.1168 14.8232L20.0002 19.2732H27.5002V20.9399L25.0002 26.7732H17.5002V18.4399ZM10.8335 18.4399H14.1668V28.4399H10.8335V18.4399Z" fill="#2D2F31"/>
        </svg>

    </>)
}

const ThumbsDown = ({clickHandler, likeStatus}: handlerProps)=>{

    return(<>
    <svg onClick={clickHandler} className="cursor-pointer transition-all duration-700" width="40" height="41" viewBox="0 0 40 41" fill={likeStatus?.disliked ? 'black' : "none"}  xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="1.43994" width="39" height="39" rx="19.5" stroke="#2D2F31"/>
        <g clipPath="url(#clip0_106_1264)">
        <path d="M22.5002 13.4399H15.0002C14.3085 13.4399 13.7168 13.8566 13.4668 14.4566L10.9502 20.3316C10.8752 20.5233 10.8335 20.7233 10.8335 20.9399V22.6066C10.8335 23.5233 11.5835 24.2733 12.5002 24.2733H17.7585L16.9668 28.0816L16.9418 28.3483C16.9418 28.6899 17.0835 29.0066 17.3085 29.2316L18.1918 30.1066L23.6835 24.6149C23.9835 24.3149 24.1668 23.8983 24.1668 23.4399V15.1066C24.1668 14.1899 23.4168 13.4399 22.5002 13.4399ZM22.5002 23.4399L18.8835 27.0566L20.0002 22.6066H12.5002V20.9399L15.0002 15.1066H22.5002V23.4399ZM25.8335 13.4399H29.1668V23.4399H25.8335V13.4399Z" fill="#2D2F31"/>
        </g>
        <defs>
        <clipPath id="clip0_106_1264">
        <rect width="20" height="20" fill="white" transform="translate(10 10.9399)"/>
        </clipPath>
        </defs>
</svg>
    </>)
}
