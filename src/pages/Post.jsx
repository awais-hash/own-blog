import React from 'react'
import { Button,Container } from '../components'
import { useNavigate } from 'react-router-dom'
import configservice from '../appwrite/config_Service'
import { useParams,useEffect,useState } from 'react'
import { useSelector } from 'react-redux'

const Post = () => {
const userData = useSelector(state => state.auth.userData)
const navigate = useNavigate();
const {post,setPost} = useState (null)
const isAuthor = post?.userId === userData?.$id;
const {slug} = useParams();


useEffect(()=>{
  if(slug){
    configservice.getPost(slug).then((res)=>{
setPost(res)
    }).catch(()=>{
        navigate('/')
    })
  }
  else{
    navigate('/')
  }
})

const deletePost = ()=>{
    configservice.deletePost(post.$id).then((res)=>{
        if (res){
configservice.deleteFile(post.featuredImage);

            navigate('/');
        }
        else{
            alert("Error deleting post")
        }
    })
}




 return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}

export default Post