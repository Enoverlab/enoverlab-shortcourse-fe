import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import like from '../assets/landing/like.svg'
import share from '../assets/landing/share.svg'
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';


interface CardProps {
    topic?: string
    instructorName ?: string
    image ?: string
    price ?: number
    id ?: string
}
interface StarProps {
  value?: number
}

const Card = ({topic, instructorName, image, price,id}: CardProps) => {
    
  return (
    <div  className='font-inter' data-aos='fade-right'>
      <Link to={`coursedetail/${id}`}>
      <img src={image} alt="course image" className='rounded-2xl w-full' />
      <h3 className='text-xl lg:text-[22px] font-bold text-black-200 my-1
      '>{topic}</h3>
      <p className='text-xl lg:text-[22px] text-black-200 my-2'>{instructorName}</p>
      <Star/>
      <div className='my-2 flex items-center justify-between'>
        <p className='text-sm lg:text-[19px] font-bold bg-[#F0F0F0] py-2 px-3'>₦{price?.toLocaleString('en-US')}</p>
        <div className='flex items-center gap-3'>
          <div>
            <img src={like} alt=""  className='cursor-pointer w-8'/>
          </div>
          <div>
            <img src={share} alt="" className='cursor-pointer w-8'/>
          </div>
        </div>
      </div>
      </Link>
      <HashLink to={`coursedetail/${id}/#review`} smooth className='underline'>
        View reviews
      </HashLink>
    </div>
  )
}

export default Card

export const Star = ({value}:StarProps)=>{
  const [hover, setHover] = useState<number | null>(null);
    const [rating, setRating] = useState<number | null>(null);
  return(<div className='flex items-center gap-4 font-inter'>
      <div className='flex items-center gap-1'>
      {[...Array(5)].map((undef='star', index) => {
        const ratingValue = index + 1;
        return (
          <label key={undef+index}>
            <input
              type="radio"
              name="rating"
              value={value || ratingValue}
              onClick={() => setRating(value || ratingValue)}
              className='hidden'
            />
            <FaStar size={28}
              className='cursor-pointer'
              color={ratingValue <= (value || hover || rating)! ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(value || ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      </div>
      <p className='text-sm lg:text-xl font-bold'>
        {value || rating}
      </p>
  </div>)
}
