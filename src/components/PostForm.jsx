import React from 'react'
import { useEffect, useCallback } from 'react'
import { Button, Input, RTE, Select } from './index' 
import { useForm } from 'react-hook-form'
import{ useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import configservice from '../appwrite/config_Service'

const PostForm = ({ post }) => {
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    const { 
        register, 
        handleSubmit, 
        control, 
        watch, 
        setValue, 
        getValues 
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            slug: post?.slug || "",
            status: post?.status || "active",
        }
    })

    const OnPostSubmit = async (data) => {
        console.log("Post form data:", data)
        
        try {
            if (post) {
                // Handle update existing post
                let fileId = post.featuredImage
                
                // Upload new image if provided
                if (data.image && data.image[0]) {
                    const file = await configservice.uploadFile(data.image[0])
                    if (file) {
                    
                        if (post.featuredImage) {
                            await configservice.deleteFile(post.featuredImage)
                        }
                        fileId = file.$id
                    }
                }
                
                const updatedData = {
                    ...data,
                    featuredImage: fileId
                }
                
                const finalPost = await configservice.updatePost(post.$id, updatedData)
                if (finalPost) {
                    navigate(`/post/${finalPost.$id}`)
                }
            } else {
               
                if (!data.image) {
                    alert("Please upload a featured image")
                    return
                }
                
                const file = await configservice.uploadFile(data.image[0])
                if (file) {
                    const finalPost = await configservice.createPost({
                        ...data,
                        featuredImage: file.$id,
                        userId: userData.$id
                    })
                    
                    if (finalPost) {
                        navigate(`/post/${finalPost.$id}`)
                    }
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error)
            alert("Failed to submit post. Please try again.")
        }
    }

    const createSlug = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s+/g, "-")
        }
        return ""
    }, [])

   
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue("slug", createSlug(value.title), { shouldValidate: true })
            }
        })

        return () => subscription.unsubscribe()
    }, [watch, createSlug, setValue])

    return (
        <form onSubmit={handleSubmit(OnPostSubmit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", createSlug(e.currentTarget.value), { shouldValidate: true })
                    }}
                />
                <RTE 
                    label="Content :" 
                    name="content" 
                    control={control} 
                    defaultValue={getValues("content")} 
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && post.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={configservice.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg w-full h-auto"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button 
                    type="submit" 
                    bgColor={post ? "bg-green-500" : "bg-blue-500"} 
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm