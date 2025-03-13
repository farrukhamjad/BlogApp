import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE, TinyMCE, categories } from '../index'
import appwriteService from '../../appwrite/configure'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PostForm({post}) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'Active',
            category: post?.category || 'Other'
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setLoading(true);
        setError('');
        try {
            let dbPost;
            const formattedSlug = slugTransform(data.title);
    
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }
                dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    slug: formattedSlug,
                    featuredImage: file ? file.$id : undefined,
                });
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);
                if (file) {
                    data.featuredImage = file.$id;
                }
                dbPost = await appwriteService.createPost({
                    ...data,
                    slug: formattedSlug,
                    userId: userData.$id,
                    userName: userData.name
                });
            }
    
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again later.');
            console.error("Error during submit:", error);
        } finally {
            setLoading(false);
        }
    };
    

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z0-9\s\-_.]/g, '')
            .replace(/\s+/g, '-')
            .slice(0, 36);
        }
        return ''
    }, [])

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), {shouldValidate: true})
            }
        })
        return () => subscription.unsubscribe()

    }, [watch, slugTransform, setValue])
    
  return (
        <div>
            {error && (
                <div className="error-notification">
                    {error}
                    <button onClick={() => setError(null)}>×</button>
                </div>
            )}
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap flex-col sm:flex-row">
                <div className="sm:w-2/3 w-full px-2">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", { required: true })}
                        required
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
                <div className="sm:w-1/3 w-full px-2 sm:mt-0 mt-5">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4 cursor-pointer"
                        accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full mb-4 bg-light-grey p-2 rounded-xl flex justify-center">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg xl:h-[130px] md:h-full max-w-full object-cover"
                            />
                        </div>
                    )}
                    <Select
                        options={["Active", "Inactive"]}
                        label="Status"
                        className="mb-4 cursor-pointer"
                        {...register("status", { required: true })}
                        required
                    />
                    <Select
                        options={categories}
                        label="Category"
                        className="mb-4 cursor-pointer"
                        {...register("category", { required: true })}
                        required
                    />
                    <Button type="submit" bgColor={post ? "bg-green-500" : "bg-primary-clr"} className="w-full hover:bg-primary-hover">
                        {loading ? (
                            <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        ) : null}
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        </div>
  )
}