import React,{useEffect,useState} from 'react'
import { PostForm,Container } from '../components/index'
import configservice from '../appwrite/config_Service'
import { useParams,useNavigate } from 'react-router-dom'


const EditPost = () => {
const navigate = useNavigate();
    const {post,setPost} = useState (null)
    const {slug} = useParams()
    const {loading,setLoading} = useState (false)
    useEffect(()=>{
setLoading (true)
        if (slug){
            configservice.getPost(slug).then((res)=>{
if (res){
    setPost(res)
}
else{
    navigate('/')
}
            }).catch(()=>{
                navigate('/')
            }).finally(()=>{
                setLoading(false)
            })
        }
    },[slug,navigate])

    if (loading){
        return <div>Loading...</div>
    }
  return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost
