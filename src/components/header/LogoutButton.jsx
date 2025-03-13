import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutButton({className, ...props}) {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const logoutHandler = () => {
        setLoading(true)
        authService.logout().then(() => {
            dispatch(logout());
            setLoading(false)
            navigate('/login')
        })
    }

  return (
    <button className={`inline-flex items-center justify-center ease-in-out bg-primary-clr cursor-pointer border border-primary-clr hover:border-transparent hover:bg-white hover:text-black hover:rounded-4xl px-3 py-2 transition-all font-bold ${className}`} {...props} onClick={logoutHandler}>
      {loading ? (
          <svg className={`mr-3 -ml-1 size-5 animate-spin text-black`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
      ) : null}
      Logout
    </button>
  )
}

export default LogoutButton
