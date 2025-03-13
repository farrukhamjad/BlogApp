import React, { useState } from 'react'
import { Container, Logo, LogoutButton } from '../index'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Dashboard",
      slug: "/dashboard",
      active: authStatus,
    },
  ]

  return (
    <>
      <header className='relative py-4 shadow bg-[#121212] z-20'>
        <Container>
        <nav className='flex items-center justify-between'>
            {/* Logo */}
            <div className='mr-4'>
              <Link to='/'>
                <Logo width='70px' />
              </Link>
            </div>

            {/* Mobile Menu Button (hamburger icon) */}
            <div className='lg:hidden'>
              <button 
                onClick={() => setMenuOpen(!menuOpen)} 
                className='inline-flex items-center justify-center rounded-md p-2.5 text-white cursor-pointer'>
                <span className='sr-only'>Open main menu</span>
                <svg 
                  className='w-6 h-6' 
                  fill='none' 
                  viewBox='0 0 24 24' 
                  strokeWidth='1.5' 
                  stroke='currentColor' 
                  aria-hidden='true'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
                </svg>
              </button>
            </div>

            {/* Navigation Links (Desktop) */}
            <ul className='hidden lg:flex ml-auto items-center'>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name} className='ml-3'>
                    <button
                      onClick={() => navigate(item.slug)}
                      className={`cursor-pointer border border-border-clr hover:border-transparent hover:bg-light-grey px-3 py-2 transition-all rounded-md ${location.pathname === item.slug ? 'bg-light-grey border-transparent' : 'bg-transparent'}`}>
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className='ml-3'>
                  <LogoutButton />
                </li>
              )}
            </ul>
          </nav>

          {/* Mobile Menu (on mobile screen only) */}
          {menuOpen && (
            <div className='lg:hidden fixed inset-0 z-50 bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 animate-fadeInLeft'>
              <div className='flex justify-between items-center'>
                <Link to='/'>
                  <Logo width='70px' />
                </Link>
                <button onClick={() => setMenuOpen(false)} className='p-2.5 text-gray-400 cursor-pointer'>
                  <span className='sr-only'>Close menu</span>
                  <svg 
                    className='w-6 h-6' 
                    fill='none' 
                    viewBox='0 0 24 24' 
                    strokeWidth='1.5' 
                    stroke='currentColor' 
                    aria-hidden='true'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
              <div className='mt-6'>
                <div className='space-y-2'>
                  {navItems.map((item) =>
                    item.active ? (
                      <Link
                        key={item.name}
                        to={item.slug}
                        onClick={() => setMenuOpen(false)}
                        className={`block rounded-lg px-3 py-2 text-base font-normal hover:bg-white hover:text-black transition-all ${location.pathname === item.slug ? 'bg-white text-black' : ''}`}>
                        {item.name}
                      </Link>
                    ) : null
                  )}
                  {authStatus && (
                      <LogoutButton className='block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 bg-primary-clr hover:bg-primary-hover transition-all w-full ml-0' />
                  )}
                </div>
              </div>
            </div>
          )}
        </Container>
      </header>
    </>
  )
}

export default Header
