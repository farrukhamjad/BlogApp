import React from 'react'

function Logo({width = '100px', className = '', ...props}) {
  return (
    <div>
      <h1 className={`group text-white text-2xl font-bold uppercase transition hover:ring-8 hover:ring-[#2e2e2e] hover:bg-[#2e2e2e] ${className}`} {...props}>Blog <span className={`text-primary-clr group-hover:text-white transition-all`} {...props} >App</span></h1>
    </div>
  )
}

export default Logo
