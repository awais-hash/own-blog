import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

const AuthLayout = ({ children }) => {
    const navigate = useNavigate()
    const location = useLocation() // Add this hook
    const [loader, setloader] = useState(true)
    const authStatus = useSelector(state => state.auth?.status)
    
    useEffect(() => {
        console.log("AuthLayout - Current path:", location.pathname)
        console.log("AuthLayout - authStatus:", authStatus)
        
        // Check if user is on an auth page (login/signup)
        const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'
        
        if (authStatus) {
            // If user is logged in AND on auth page, redirect to home
            if (isAuthPage) {
                console.log("Logged in user on auth page, redirecting to home")
                navigate('/')
            }
            // If user is logged in but not on auth page, do nothing
        } else {
            // If user is NOT logged in AND NOT on auth page, redirect to login
            if (!isAuthPage) {
                console.log("Not logged in and not on auth page, redirecting to login")
                navigate('/login')
            }
            // If user is NOT logged in AND on auth page, do nothing (let them stay)
        }
        
        setloader(false)
    }, [authStatus, navigate, location.pathname])
    
    return loader ? (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
) : <>{children}</>
}

export default AuthLayout