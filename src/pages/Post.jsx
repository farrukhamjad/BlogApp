import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/configure";
import { Button, Container, RecommendedPostCard, Spinner } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [posts, setPosts] = useState([])
    const { slug } = useParams();
    const navigate = useNavigate();
    const [pageloading, setPageLoading] = useState(true)

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setPost(fetchedPost)
                } else {
                    navigate('/')
                }
            }).catch((error) => {
                console.error('Error Fetching posts:', error);
                navigate('/')
            }).finally(() => setPageLoading(false))
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    useEffect(() => {
        appwriteService.getPosts([]).then((response) => {
            if (response && response.documents) {
                const sortedPosts = response.documents.sort((a, b) => {
                    return new Date(b.$createdAt) - new Date(a.$createdAt);
                });
                setPosts(sortedPosts)
            }
        }).catch((error) => {
            console.error('Error Fetching posts:', error);
        }).finally(() => setPageLoading(false))
    }, [])

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    function generateAvatarUrl(name) {
        if (!name) return 'https://cloud.appwrite.io/v1/avatars/initials?name=Anonymous&width=80&height=80';
        const formattedName = name.trim().replace(/\s+/g, ' ');
        return `https://cloud.appwrite.io/v1/avatars/initials?name=${encodeURIComponent(formattedName)}&width=80&height=80`;
    }
    
    if (pageloading) {
        return (
            <Spinner />
        )
    }

    if (!post) {
        return null;
    }


    return (
        <>
            <div className="w-full py-25 min-h-[60vh]">
                <Container>
                    <div className="flex gap-6 sm:flex-row flex-col">
                        <div className="relative lg:w-9/12 sm:w-8/12 z-10">
                            <div className="w-full mb-7">
                                <h1 className="text-3xl font-bold">{post.title}</h1>
                            </div>
                            <div className="w-full flex justify-center mb-7 relative border border-border-clr bg-light-grey rounded-xl p-2">
                                <img
                                    src={appwriteService.getFilePreview(post.featuredImage)}
                                    alt={post.title}
                                    className="rounded-xl object-cover xl:h-[400px] md:h-full max-w-full"
                                />
                                {isAuthor && (
                                    <div className="absolute right-6 top-6">
                                        <Link to={`/edit-post/${post.$id}`}>
                                            <Button bgColor="bg-green-500" className="mr-3 p-1">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button bgColor="bg-red-500" onClick={deletePost}>
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <div className="w-full">
                                <div className="flex items-center mb-5">
                                    <h6 className="font-light text-sm mr-3">Category:</h6>
                                    {post.category ? (
                                        <Link
                                            to={`/all-posts/${post.category}`}
                                            className="text-font-clr hover:text-white transition-all underline">
                                            {post.category}
                                        </Link>
                                    ) : (
                                        <Link
                                            to={`/all-posts/Other`}
                                            className="text-font-clr hover:text-white transition-all underline">
                                            Other
                                        </Link>
                                    )}
                                </div>
                                {parse(post.content)}
                            </div>
                            <div className="flex items-center mt-5">
                                <h6 className="font-light text-sm mr-3">Post By:</h6>
                                <Link
                                    to={isAuthor ? `/dashboard` : `/user/${post.userId}` }
                                    className="group inline-flex items-center justify-between bg-dark-clr hover:bg-light-grey rounded-4xl p-2 transition-all">
                                    <img
                                        src={generateAvatarUrl(post.userName)}
                                        alt={post.userName}
                                        className="w-7 h-7 rounded-full mr-2"
                                    />
                                    <span className="text-font-clr group-hover:text-white transition-all text-md font-bold">{post.userName}</span>
                                </Link>
                            </div>
                        </div>
                        <div className="lg:w-3/12 sm:w-4/12">
                            <div className="w-full mb-7">
                                <h2 className="text-2xl font-semibold">Also Read</h2>
                            </div>
                            <div>
                                {posts.slice(0, 5).map((post) => (
                                    <div key={post.$id} className='my-2'>
                                        <RecommendedPostCard {...post} />
                                    </div>
                                ))}
                            </div>
                            <div className='flex justify-center mt-7 relative shadow-[0px_-20px_150px_100px_#000]'>
                                <Link to={'/all-posts'} className="capitalize rounded-md bg-primary-clr px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">View More</Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
