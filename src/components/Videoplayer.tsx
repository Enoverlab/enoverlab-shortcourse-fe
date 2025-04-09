
import { SVGProps, useContext, useEffect, useRef, useState } from 'react'
import { updateCourseTrack } from '../helper/api-communications'
import ChapterContext from '../context/ChapterContext'

interface PlayerProps {
  tabOpen: boolean
  src: string
  poster: string
  moduleId : string
  courseId ?: string
}

export const VideoPlayerTest = ({ tabOpen, src, poster, moduleId,courseId }: PlayerProps) => {
  const {setActiveChapter,activeChapter} = useContext(ChapterContext)
  const playerRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (playerRef.current && !tabOpen) {
      playerRef.current.pause()
    }
  }, [tabOpen])

  useEffect(() => {
    const video = playerRef.current
    if (!video) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [])

  const handleTogglePlay = () => {
    if (!playerRef.current) return
    if (isPlaying) {
      playerRef.current.pause()
    } else {
      playerRef.current.play()
    }
  }
  const handleTimeUpdate = async() => {
    const video = playerRef.current
    if(!video) return
    if (!video.duration) return

    const percentage = (video.currentTime / video.duration) * 100

    if (percentage >= 70 && !sent) {
      const data = {
        moduleId,
        courseId,
        status : 'completed'
      }
      await updateCourseTrack(data)
      setSent(true)
    }
    if (activeChapter && percentage >= 99.5) {
      console.log('got here')
      setActiveChapter(activeChapter + 1)
    }
  }

  return (
    <div className="relative w-full h-[380px] rounded-xl lg:mx-10 overflow-hidden group">
      <video
        ref={playerRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover rounded-xl"
        width={`100%`}
        height={`100%`}
        onTimeUpdate={handleTimeUpdate}
        controls
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
      />

      {!isPlaying && (
        <button
          onClick={handleTogglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black-100/50 text-white z-10 hover:bg-black-100/60 w-full transition-colors duration-300"
        >
          <Play className="w-16 h-16" />
        </button>
      )}
    </div>
  )
}



export function Play(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}<path fill="currentColor" d="M10.385 15.23L15.23 12l-4.846-3.23zM12 21q-1.864 0-3.506-.701t-2.857-1.916t-1.926-2.849Q3 13.902 3 12.04q0-.902.167-1.776t.497-1.715l.78.78q-.219.65-.331 1.317T4 12q0 3.35 2.325 5.675T12 20t5.675-2.325T20 12t-2.325-5.675T12 4q-.675 0-1.332.112t-1.3.332l-.776-.775q.789-.315 1.606-.492T11.885 3q1.882 0 3.544.701t2.896 1.926t1.955 2.867T21 12t-.71 3.506q-.711 1.642-1.926 2.857q-1.216 1.216-2.858 1.926Q13.864 21 12 21M5.923 6.808q-.356 0-.62-.265q-.264-.264-.264-.62t.264-.62t.62-.264t.62.264t.265.62t-.265.62t-.62.265M12 12"></path></svg>
  )
}


export function Pause(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE */}<path fill="currentColor" d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12c0-1.19.22-2.32.6-3.38l1.88.68C4.17 10.14 4 11.05 4 12c0 4.41 3.59 8 8 8s8-3.59 8-8s-3.59-8-8-8c-.95 0-1.85.17-2.69.48l-.68-1.89C9.69 2.22 10.82 2 12 2c5.52 0 10 4.48 10 10M5.5 4C4.67 4 4 4.67 4 5.5S4.67 7 5.5 7S7 6.33 7 5.5S6.33 4 5.5 4M11 16V8H9v8zm4 0V8h-2v8z"></path></svg>
  )
}