import ReactModal from 'react-modal';
import success from '../../assets/landing/success.svg'
import failed from '../../assets/landing/unsuccessful.svg'

interface modalProps {
    state : string
    isOpen : boolean
    handleModalClose : ()=> void
}
const SignUpVerification = ({state, isOpen, handleModalClose} : modalProps) => {

    let mediaMatch
    if(typeof window !== 'undefined'){
      mediaMatch = window.matchMedia('(min-width: 1024px)');
    }
    ReactModal.setAppElement('#root');

  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={()=>{
          handleModalClose()
        }}
        style={{
          content: {
            width: mediaMatch?.matches ? '60%' : '80%',
            // maxWidth : '760px',
            padding: mediaMatch?.matches
              ? 'clamp(90px,7.803vw,102px) clamp(120px,10.7vw,153px)'
              : '25px 10px',
            marginTop: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 'auto',
            height: 'fit-content',
            borderRadius: '15px',
            backgroundColor: '#fff',
            zIndex: 300,
          },
          overlay: {
            zIndex: 300,
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        }}
      >{
        state == 'failed' ? (
            <div className='flex flex-col items-center justify-center font-inter'>
            <img src={failed} alt="" />
            <h4 className='text-[#A03939] text-xl font-semibold mt-7 mb-3'>
                Unsuccessful
            </h4>
            <p className='text-sm italic text-center'>
            The verification was not successful
            </p>
        </div>
        ) : (<div className='flex flex-col items-center justify-center font-inter'>
            <img src={success} alt="" />
            <h4 className='text-black-200 text-2xl font-semibold mt-7 mb-3'>
                Successful
            </h4>
            <p className='text-lg italic text-center w-[70%] md:w-[50%]'>
            A verification link has been sent to your email address
            </p>
        </div>)
      }
        
      </ReactModal>
    </div>
  )
}

export default SignUpVerification



