import { Loader2 } from 'lucide-react'
import React from 'react'

const LoadingSkeleton = () => {
  return (
   <div className="fixed w-screen h-screen top-0 flex justify-center items-center left-0 z-50">
      <Loader2 className="animate-spin  text-6xl w-24 h-24 text-primary " />
   </div>
  )
}

export default LoadingSkeleton