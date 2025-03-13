import { React, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header, ScrollToTop, Spinner } from './components'
import { Outlet } from 'react-router-dom'

function App() {

  const [pageloading, setPageLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setPageLoading(false))
  }, [])

  if (pageloading) {
    return (
      <Spinner />
    )
  }

  return (
    <>
      <ScrollToTop />
      {pageloading ? (
        <Spinner />
      ) : (
        <div className='min-h-screen flex flex-wrap content-between'>
          <div className="w-full block">
            <Header />
            <main>
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      ) }
    </>
  )
}

export default App
