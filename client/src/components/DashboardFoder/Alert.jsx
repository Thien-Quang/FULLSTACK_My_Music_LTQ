import React from 'react'
import {BsEmojiWink , BsEmojiAngry} from 'react-icons/bs'
import {motion} from "framer-motion"

const alert = ({type}) => {
  return (
    <motion.div 
      initial = {{translateX : 200 , opacity:0}}
      animate = {{ translateX : 0 , opacity : 1}}
      exit    = {{translateX : 200 , opacity:0}}
      key={type}
    className={`fixed top-24 right-4 p-4 rounded-md backdrop-blur-md flex items-center justify-center shadow-md
     ${type === "success" && "bg-green-500" } 
     ${type === "danger" && "bg-red-500"}`}>
    {type ==="success" &&(
      <div className='flex items-center justify-center gap-4 w-60'>
      <BsEmojiWink className='text-3xl text-primary'/>
      <p className='text-xl font-semibold text-primary'>Data saved</p>
      </div>
    )}
    {type ==="danger" &&(
      <div className='flex items-center justify-center gap-4 w-60'>
      <BsEmojiAngry className='text-3xl text-primary'/>
      <p className='text-xl font-semibold text-primary'>Error </p>
      </div>
    )}
    </motion.div>
  )
}

export default alert