import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { LogOutBtn, Container } from '../index'
import Logo from '../../assets/Logo'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation() // Track current route

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
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
  ]

  // Optional: Add active route styling
  const isActiveRoute = (slug) => location.pathname === slug

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-4'>
            <Link to='/' aria-label="Go to homepage">
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto space-x-2'>
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`
                      inline-block px-6 py-2 duration-200 
                      rounded-full
                      ${isActiveRoute(item.slug) 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 hover:bg-blue-100'
                      }
                    `}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li key="logout">
                <LogOutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header