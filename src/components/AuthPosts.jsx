import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/configure';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser'

function MyPosts({ user }) {

    const [posts, setPosts] = useState([]);
    const [postLoading, setPostLoading] = useState(true)

    const extractPara = (content) => {
        if (!content) return '';
        const paraContent = content.match(/<p[^>]*>(.*?)<\/p>/g);
        return paraContent ? paraContent.join('') : '';
    };

    const filteredContent = (content) => {
        return extractPara(content);
    };
    
    useEffect(() => {
        const fetchPosts = async () => {
            setPostLoading(true)
            try {
                const userPosts = await appwriteService.getUserPosts(user.$id);
                setPosts(userPosts);
                setPostLoading(false)
            } catch (error) {
                console.log('Error fetching posts:', error);
                setPostLoading(false)
            }
        };

        if (user) {
            fetchPosts();
        }
    }, [user]);

    const getFilePreview = (fileId) => {
        if (fileId) {
            return appwriteService.getFilePreview(fileId)
        }
    }

    return (
        <div className='lg:p-5 px-5 py-7 bg-dark-clr rounded-xl min-h-[45vh]'>
            <h2 className="text-center text-2xl font-bold leading-tight mb-5">My Posts</h2>
            {postLoading ? (
                <div className="flex items-center justify-center min-h-[30vh]">
                    <svg className="mr-3 -ml-1 size-10 animate-spin text-primary-clr" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            ) : (
                <div>
                {posts.length === 0 ? (
                    <div className="flex justify-center items-center min-h-[30vh]">
                        <div className='text-2xl font-bold uppercase text-center text-primary-clr'>No Posts!</div>
                    </div>
                ) : (
                    <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-3'>
                        {posts.map((post) => (
                            <div key={post.$id}>
                                <Link to={`/post/${post.$id}`}>
                                    <div className="group w-full border-1 border-light-grey hover:border-primary-clr rounded-lg hover:rounded-xl transition-all scale-[0.98] hover:scale-100">
                                        <div className="w-full justify-center">
                                            <img src={getFilePreview(post.featuredImage)} alt={post.title} className='group-hover:rounded-xl rounded-lg w-full h-40 object-cover transition-all bg-light-grey' />
                                        </div>
                                        <div className="px-5 py-4">
                                        <h2 className='group-hover:text-primary-clr text-xl transition-all mb-3 line-clamp-2'>{post.title}</h2>
                                        <div className="browser-css text-sm text-font-clr line-clamp-2">
                                            {parse(filteredContent(post.content))}
                                        </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            )}
        </div>
    );
}

export default MyPosts;
