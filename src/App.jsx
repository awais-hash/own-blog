import React from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import authservice from './appwrite/auth_service' 
import { login, logout } from './features/authSlice'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'

const App = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()

    useEffect(() => {
        authservice.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login(userData)) // ✅ Direct payload
                } else {
                    dispatch(logout())
                }
            })
            .catch((error) => {
                console.error("Auth error:", error)
                dispatch(logout())
            })
            .finally(() => {
                setLoading(false)
            })
    }, [dispatch])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading app...</div>
            </div>
        )
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default App
