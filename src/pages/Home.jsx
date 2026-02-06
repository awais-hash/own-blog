import React, { useState, useEffect } from 'react'
import configservice from '../appwrite/config_Service'
import { Container, PostCard } from '../components/index'

const Home = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        configservice.getAllPosts().then((res) => {
            if (res && res.documents) {
                setPosts(res.documents)
            } else {
                console.log("No posts found or invalid response:", res)
                setPosts([])
            }
        }).catch(error => {
            console.error("Error fetching posts:", error)
            setPosts([])
        }).finally(() => {
            setLoading(false)
        })
    }, []) // ✅ FIXED: Added dependency array

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-xl">Loading posts...</div>
                    </div>
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home